import NextAuth, { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { prisma } from '@/server/prisma';
import { env } from '@/env/server.mjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const authOptions: {
  adapter: any;
  callbacks: any;
  providers: any[];
  secret: string;
  pages: { signIn: string; session?: string };
  session: {
    maxAge: number;
    updateAge: number;
  };
} = {
  secret: String(process.env.NEXTAUTH_SECRET),
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/',
    // session: '/signin',
  },

  providers: [
    GithubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: env.TWITTER_CLIENT_ID,
      clientSecret: env.TWITTER_CLIENT_SECRET,
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60, // 24 hours
  },
  // Include user.id on session
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   console.log('user signed in', user, account, profile, email, credentials);
    //   return true
    // },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user }) {
      if (session.user) {
        // session.accessToken = token.accessToken
        session.user.id = user.id;
      }
      return await session;
    },
  },
};

export default NextAuth(authOptions);
