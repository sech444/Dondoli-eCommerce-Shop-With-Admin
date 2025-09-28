// In app/lib/auth.ts

import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db"; // Assuming you have a prisma client instance exported from here

export const authOptions: AuthOptions = {
  // 1. Providers Configuration
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // If user not found or user doesn't have a password (e.g., social login)
        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid email or password");
        }

        // Return the user object if authentication is successful
        // This object is passed to the 'jwt' callback
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // <-- This is the crucial field
        };
      },
    }),
    // You can re-enable these later if you configure them
    // GithubProvider({...}),
    // GoogleProvider({...}),
  ],

  // 2. Callbacks for Session Management (THIS IS THE CRITICAL ADDITION)
  callbacks: {
    // This callback is invoked when a JWT is created.
    // `user` is only available on the first sign-in.
    async jwt({ token, user }) {
      if (user) {
        // On sign-in, persist the user's role and ID to the token
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    // This callback is invoked when a session is checked.
    // It makes the custom data from the token available to the session object.
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role; // Add role to session
        session.user.id = token.id;     // Add ID to session
      }
      return session;
    },
  },

  // 3. Other Essential Configurations
  pages: {
    signIn: "/login", // Tell NextAuth to use your custom login page
  },
  session: {
    strategy: "jwt", // Enforce JWT for session strategy
  },
  secret: process.env.NEXTAUTH_SECRET, // Your JWT signing secret
};