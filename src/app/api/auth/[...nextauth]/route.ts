import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

// 정적 내보내기에서 제외
export const dynamic = 'force-dynamic';

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Google OAuth에서 ID 토큰을 JWT에 저장
      if (account?.provider === 'google') {
        token.accessToken = account.access_token;
        token.providerToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }) {
      // JWT에서 토큰을 세션에 전달
      session.accessToken = token.accessToken;
      session.providerToken = token.providerToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
