import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/appComponents/Navigation";
import NextAuthSession from "./app";
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "TextLift",
  description: "convert pdf to text",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className} >
        <NextAuthSession>
        <Navigation/>
        {children}
        </NextAuthSession>
        </body>
    </html>
  );
}
