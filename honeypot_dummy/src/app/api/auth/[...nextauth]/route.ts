import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Kirim ID token dari Google ke Spring Boot
        const res = await fetch('http://localhost:8080/auth/google/callback', {
          method: 'POST',
          body: JSON.stringify({ token: account.id_token }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        const data = await res.json();
  
        // Simpan JWT backend & role di token NextAuth
        token.accessToken = data.jwt;
        token.role = data.role;
      }
      return token;
    },
  
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  }
};

const handler = NextAuth(authOptions);
// This handler will handle both GET and POST requests

export { handler as GET, handler as POST };