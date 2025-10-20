// src/lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// List of admin emails
const adminEmails = ["njatabriang48@gmail.com", "virginia.njata@gmail.com"];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("No account found with this email");
        if (!user.passwordHash) throw new Error("This account uses Google login");

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) throw new Error("Invalid email or password");

        return user;
      },
    }),
  ],

  session: { strategy: "jwt" },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    newUser: "/auth/register",
  },

  callbacks: {
    // Add isAdmin and role to session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as string) ?? "CLIENT";
        session.user.isAdmin = token.isAdmin ?? false;
      }
      return session;
    },

    // Add role and isAdmin to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role ?? "CLIENT";
        if ("email" in user && user.email) {
          token.isAdmin = adminEmails.includes(user.email);
        }
      }
      return token;
    },

    // Handle Google sign-in linking and new users
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          // Link googleId if missing
          if (!existingUser.googleId) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { googleId: account.providerAccountId },
            });
          }

          // Ensure Account record exists
          const accountExists = await prisma.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: account.providerAccountId,
              },
            },
          });

          if (!accountExists) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                provider: "google",
                providerAccountId: account.providerAccountId,
                type: account.type,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
              },
            });
          }
        } else {
          // New user + Account
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "",
              googleId: account.providerAccountId,
              role: "CLIENT",
              accounts: {
                create: {
                  provider: "google",
                  providerAccountId: account.providerAccountId,
                  type: account.type,
                  access_token: account.access_token,
                  refresh_token: account.refresh_token,
                  expires_at: account.expires_at,
                  token_type: account.token_type,
                  scope: account.scope,
                },
              },
            },
          });
        }
      }
      return true;
    },

    // Redirect after login
    async redirect({ url, baseUrl }) {
      // fetch session to determine admin
      try {
        const session = await fetch(`${baseUrl}/api/auth/session`).then((res) =>
          res.json().catch(() => null)
        );

        const isAdmin = session?.user?.isAdmin;
        if (isAdmin) return `${baseUrl}/dashboard/admin`;
      } catch {
        // fallback
      }

      return `${baseUrl}/dashboard`;
    },
  },
};
