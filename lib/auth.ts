// app/lib/auth.ts
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import prisma from "@/utils/db";
import { nanoid } from "nanoid";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials) {
            return null;
          }
      
          const { email, password } = credentials;
      
          try {
            const user = await prisma.user.findFirst({
              where: { email },
            });
      
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(password, user.password!);
      
              if (isPasswordCorrect) {
                return user;
              }
            }
          } catch (err: any) {
            throw new Error(err);
          }
      
          return null;
        },
      }),
  
    // GithubProvider({
    // clientId: process.env.GITHUB_ID ?? "",
    // clientSecret: process.env.GITHUB_SECRET ?? "",
    // }),
    // GoogleProvider({
    // clientId: process.env.GOOGLE_ID ?? "",
    // clientSecret: process.env.GOOGLE_SECRET ?? "",
    // }),
    // ...add more providers here if you want. You can find them on nextauth website.
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account | null }) {
      if (account?.provider === "credentials") {
        return "credentials"; // or return true
      }
      return false; // or return "unauthorized"
    
 
  
      // if (account?.provider == "github") {
      // try {
      // const existingUser = await prisma.user.findFirst({ where: {email: user.email!} });
      // if (!existingUser) {
      // await prisma.user.create({
      // data: {
      // id: nanoid() + "",
      // email: user.email!
      // },
      // });
      // return true;
      // }
      // return true;
      // } catch (err) {
      // console.log("Error saving user", err);
      // return false;
      // }
      // }
      // if (account?.provider == "google") {
      // try {
      // const existingUser = await prisma.user.findFirst({where: { email: user.email! }});
      // if (!existingUser) {
      // await prisma.user.create({
      // data: {
      // id: nanoid() + "",
      // email: user.email!
      // },
      // });
      // return true;
      // }
      // return true;
      // } catch (err) {
      // console.log("Error saving user", err);
      // return false;
      // }
      // }
    },
  },
};