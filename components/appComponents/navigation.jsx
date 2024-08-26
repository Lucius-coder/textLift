"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

const Navigation = () => {
  const { status, data: session, } = useSession();
  const use=useSession()
  const image = session?.user?.image;
  console.log(use)
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated" && pathname !== "/api/upload") {
      router.push("/api/upload");
                                               

    }
   
  }, [status, pathname, router]);

  return (
    <nav className="flex align-center justify-between p-2 ">
      <div className="lg:flex-[0_0_90%] sm:flex-[0_0_80%]">
        <h1 className="text-2xl m-2 text-red-500 justify-center font-bold align-middle ">
          {/* <img src="./app/textlift.svg" width={40} height={40} /> */}
          TextLift
        </h1>
      </div>

      <div className="lg:flex-[0_0_10%] sm:flex-[0_0_20%] justify-center">
        {status === "authenticated" ? (

          <div className="flex ">
            <div className="flex-1">
              <Button
                variant="default"
                className="bg-red-600 text-white rounded-xl p-2 text-sm font-semibold hover:bg-red-500 active:bg-red-500 align-middle"
                onClick={() => {
                  signOut({ callbackUrl: "http://localhost:3000" });
                }}
              >
                sign out
              </Button>
            </div>

            <div className="flex-1">
              <Image
                src={image}
                className="rounded-full m-1 align-center justify-center"
                width={40}
                height={40}
              ></Image>
            </div>
          </div>
        ) : (
          <button
            variant="default"
            className="bg-red-600 text-white rounded-xl p-2 hover:bg-red-500 active:bg-red-500"
            onClick={() => {
              signIn("google", {
                callbackUrl: "http://localhost:3000/api/upload",
              });
            }}
          >
            sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
