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
        try {
        console.log("Google account object:", account);
        console.log("id_token dari Google:", account.id_token);
        console.log("access_token dari Google:", account.access_token);


        console.log("Mengirim token ke backend:", account.id_token ?? account.access_token);
        
        // Kirim ID token dari Google ke Spring Boot
        const res = await fetch('http://localhost:8080/auth/verify', {
          method: 'POST',
          body: JSON.stringify({ token: account.id_token ?? account.access_token}),
          headers: { 'Content-Type': 'application/json' },
        });

        console.log("account:", account);
  
        const data = await res.json();
  
        // Simpan JWT backend & role di token NextAuth
        token.accessToken = data.jwt;
        token.role = data.role;
      
    } catch (error) {
      console.error("Error in JWT callback:", error);
  }
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

export { handler as GET, handler as POST };