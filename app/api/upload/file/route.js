import { NextResponse } from "next/server";
export const POST = async (req,res) => {

const form =await req.formData();

    return Response.json({message:"post request sucessful"})
}