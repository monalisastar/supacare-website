import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

/**
 * 🔐 Supacare Auth Configuration
 * ------------------------------
 * - Supports Google & Credentials login
 * - Attaches `role` and `isAdmin` to JWT + Session
 * - Handles automatic linking for Google users
 * - Centralized helper `getSession()` for server components
 */

// ✅ Define admin emails (for quick elevation)
const adminEmails = ["njatabriang48@gmail.com", "virginia.njata@gmail.com"];

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    // 🌍 Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔐 Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password)
          throw new Error("Missing email or password");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("No account found with this email");
        if (!user.passwordHash)
          throw new Error("This account uses Google login");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );
        if (!isValid) throw new Error("Invalid email or password");

        return user;
      },
    }),
  ],

  // 🧠 Use JWT for stateless sessions
  session: { strategy: "jwt" },

  // 🧭 Custom auth pages
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    newUser: "/auth/register",
  },

  callbacks: {
    /**
     * 💾 Attach fields to JWT (called on login and every session update)
     */
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role ?? "CLIENT";

        // ✅ Mark admin users
        if ("email" in user && user.email) {
          token.isAdmin = adminEmails.includes(user.email);
        }
      }
      return token;
    },

    /**
     * 🧠 Propagate fields from JWT into session object
     */
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = (token.role as string) ?? "CLIENT";
        session.user.isAdmin = token.isAdmin ?? false;
      }
      return session;
    },

    /**
     * 🌐 Handle Google sign-ins (link existing users or create new)
     */
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          // Link Google ID if not already linked
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
          // Create new Google user
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "",
              googleId: account.providerAccountId,
              role: "CLIENT", // default for new users
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

    /**
     * 🧭 Simplified redirect (middleware handles actual routing)
     */
    async redirect({ baseUrl }) {
      // Always send users to /dashboard; middleware handles the role logic
      return `${baseUrl}/dashboard`;
    },
  },
};

// ✅ Export centralized getSession helper
export const getSession = () => getServerSession(authOptions);
