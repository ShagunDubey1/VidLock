import { verifyAuth } from '@hono/auth-js';
import { Context, Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { razorpay } from '@/lib/razorpay';
import crypto from "crypto";
import { db } from '@/db/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

const createOrderSchema = z.object({
  planId: z.string(),
});

const verifyPaymetSchema = z.object({
  orderId: z.string(),
  paymentId: z.string(),
  signature: z.string(),
});

const app = new Hono()
.post(
  "/verify-payment",
  verifyAuth(),
  zValidator('json', verifyPaymetSchema),
  async (c) => {
    const session = c.get("authUser")
    const { orderId, paymentId, signature } = c.req.valid('json');

    if(!session.token?.email){
      return c.json({error: "UnAuthorized"}, 401)
    }

    // verify payment
    const crypt = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!);
    crypt.update(`${orderId}|${paymentId}`);
    const digest = crypt.digest("hex");

    const isVerified = digest === signature;

    if(!isVerified){
      return c.json({error: "Payment Verification Failed"}, 400);
    }

    // update user
    await db.update(users).set({isPremium: true}).where(eq(users.email, session.token.email));

    return c.json({data: isVerified}, 200);

  }
)
.post(
  "/create-order", 
  verifyAuth(),
  zValidator('json', createOrderSchema),
  async (c: Context) => {
    const session = c.get("authUser")

    if(!session.token?.email){
      return c.json({error: "UnAuthorized"}, 401)
    }

    const options = {
      amount: 100,
      currency: "INR",
      receipt: "order_receipt_11"
    };

    const order = await razorpay.orders.create(options);

    if(!order){
      return c.json({error: "Order Creation Failed"}, 500);
    }

    return c.json({data: order}, 200);
  }
)

export default app;