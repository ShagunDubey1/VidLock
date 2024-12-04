import { db } from "@/db/db";
import { users } from "@/db/schema";
import { signStreamUrl } from "@/lib/sign-stream-url";
import { verifyAuth } from "@hono/auth-js";
import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { z } from 'zod'


const getSignedURLSchema = z.object({
  iframeURL: z.string(),
})

const app = new Hono()
.get(
  "/get-signed-url", 
  verifyAuth(),
  zValidator("query", getSignedURLSchema),
  async (c) => {
    const session = c.get("authUser")
    const { iframeURL } = c.req.valid("query");

    if(!session.token?.email){
      return c.json({error: "UnAuthorized"}, 401)
    }

    // check if user is premium or not
    const user = await db.select().from(users).where(eq(users.email, session.token.email));

    if(user.length === 0){
      return c.json({error: "User not found"}, 404);
    }

    if(!user[0].isPremium){
      return c.json({error: "User is not premium"}, 403);
    }

    // get signed url
    const signedURL = signStreamUrl(iframeURL, process.env.BUNNY_API_KEY!);

    if(!signedURL){
      return c.json({error: "Error in signing the url"}, 400);
    }

    return c.json({data: signedURL}, 200);
  }
)

export default app;