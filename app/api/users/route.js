import { NextResponse } from "next/server";
import connectToDb from "@/database/connection.js";
import userModel from "@/database/models/user.js";
export async function POST(req) {
  let db = connectToDb();
  const { name, email } = await req.json();
  const createUser = await userModel.create({
    username: name,
    email: email,
  });
  return NextResponse.json(createUser);
}
