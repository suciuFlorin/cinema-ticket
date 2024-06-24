import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@base/env";
import { db } from "@base/server/db";
import { compareSync } from "bcrypt-ts";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      username: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface SignIn extends DefaultSession {
    user: {
      id: string;
      username: string;
      role: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, token }) {
      const userResult = await prisma.user.findFirst({
        where: {
          OR: [{ email: session.user?.email }, { id: session.user.id }],
        },
      });

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          username: userResult?.username,
          role: userResult?.role,
        },
      };
    },
    async signIn({ user }) {
      const userResult = await prisma.user.findFirst({
        where: {
          OR: [{ id: user?.id }, { email: user?.email }],
        },
      });

      return !!userResult?.email;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db) as Adapter,
  secret: env.NEXTAUTH_SECRET,
  jwt: {
    secret: env.NEXTAUTH_SECRET,
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email / Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string }) {
        const { email, password } = credentials;

        const user = await prisma.user.findFirst({
          where: {
            OR: [{ email: email }, { username: email }],
          },
        });

        if (user) {
          const passwordObject = await prisma.password.findUnique({
            where: {
              userId: user.id,
            },
          });

          if (passwordObject && compareSync(password, passwordObject.hash)) {
            // Any object returned will be saved in `user` property of the session
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
