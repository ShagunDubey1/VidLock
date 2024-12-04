import { Context, Hono } from 'hono'
import { handle } from 'hono/vercel'
import { AuthConfig, initAuthConfig} from "@hono/auth-js"
import authConfig from '@/auth.config'

// routes
import userRoutes from "@/app/api/[[...route]]/user"

export const runtime = 'nodejs'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAuthConfig(c: Context): AuthConfig{
  return {
    secret: c.env.AUTH_SECRET,
    ...authConfig
  }
}

const app = new Hono().basePath('/api')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/user", userRoutes);

app.use("*", initAuthConfig(getAuthConfig))

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