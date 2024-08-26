import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDb from "@/database/connection.mjs";
import userModel from "@/database/models/user.mjs";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      params:{
        response_type:"code",
        timeout:10000,
        retry:3,
        access_type:"offline"
      }
    }),
  ],
  pages: {
    signIn: "http://localhost:3000/api/upload",
    signOut: "http://localhost:3000",
  
  },
  callbacks: {
    async signIn({ user, account }) {
  
        console.log(user.email)
      
  },
 debug:true
}
}
const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };
