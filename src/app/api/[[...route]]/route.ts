import { Context, Hono } from 'hono'
import { handle } from 'hono/vercel'
import { AuthConfig, initAuthConfig} from "@hono/auth-js"
import authConfig from '@/auth.config'
import dotenv from 'dotenv';

// routes
import userRoutes from "@/app/api/[[...route]]/user"
import paymentRoutes from "@/app/api/[[...route]]/payment"

export const runtime = 'nodejs'

dotenv.config(); 

function getAuthConfig(c: Context): AuthConfig{
  return {
    secret: c.env.AUTH_SECRET!,
    ...authConfig
  }
}

const app = new Hono().basePath('/api')

app.use("*", initAuthConfig(getAuthConfig))

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/user", userRoutes).route("/payment", paymentRoutes);

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello Next.js!',
  })
})

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes;