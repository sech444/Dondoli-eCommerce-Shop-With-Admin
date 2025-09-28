// In types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

// Extend the built-in session and user types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string | null; // Or whatever type your role is
    } & DefaultSession["user"]; // Keep the default properties
  }

  interface User extends DefaultUser {
    role: string | null;
  }
}

// Extend the built-in JWT type
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string | null;
    id: string;
  }
}