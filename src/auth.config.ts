import Github from "next-auth/providers/github"
import { NextAuthConfig } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/db";

export default {
  adapter: DrizzleAdapter(db),
  providers: [Github],
  session: {
    strategy: "jwt",
  },
   callbacks: {
  async session({ session, token }) {
    console.log("first")
    if (token.sub) {
      session.user.id = token.sub as string; // Ensure the value is a string
    } else {
      session.user.id = ""; // Provide a default value if token.sub is undefined
    }
    return session;
  },
  async jwt({ token, user }) {
    if (user) {
      token.sub = user.id;
    }
    return token;
  },
},
} satisfies NextAuthConfig;