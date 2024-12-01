import Github from "next-auth/providers/github"
import { NextAuthConfig } from "next-auth";

export default {
  providers: [Github],
  session: {
    strategy: "jwt",
  }
} satisfies NextAuthConfig;