import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import insertIntoDatabase from "../../insertIntodb";
import { signIn } from "next-auth/react";


const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      params:{
        response_type:"code",
        timeout:10000,
        retry:3,
        
      }
    }),
  ],
  callbacks:{
    async signIn(user, account, profile) {
      
      await insertIntoDatabase(user.name, user.email);
      return true;
    }
  },
  pages: {
    signIn: "http://localhost:3000/api/upload",
    signOut: "http://localhost:3000",
  
  },
  
 debug:true
}

const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };
