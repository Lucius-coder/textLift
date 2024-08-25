import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDb from "@/database/connection.mjs";
import userModel from "@/database/models/user.mjs";
import { signIn } from "next-auth/react";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "http://localhost:3000/api/upload",
    signOut: "http://localhost:3000",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider == "google") {
        const db = connectToDb();
        const userExists = userModel.findOne({
          username: user.name,
          email: user.email,
        });
        if (!userExists) {
          try {
            const newUser = {
              name: user.name,
              email: user.email,
            };
            let response = await fetch("http://localhost:3000/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
    },
  },
};
const handlers = NextAuth(authOptions);
export { handlers as GET, handlers as POST };
