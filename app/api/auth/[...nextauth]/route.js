import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
pages: {
  signIn: 'http://localhost:3000/api/upload',
  signOut: 'http://localhost:3000',
},


      
 
};
const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };
