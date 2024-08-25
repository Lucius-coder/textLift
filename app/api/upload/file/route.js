import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDb from "@/database/connection.mjs";
import fileModel from "@/database/models/fileInfo.mjs";
import userModel from "@/database/models/user.mjs";
// POST request handler for file uploads
export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file"); // Retrieve the file from the form data

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const tempPath = path.join(process.cwd(), "public", "upload", file.name);

    // Convert the file stream to a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

const db=await connectToDb()
const fileInfo=new fileModel({
  fileName:file.name,
  fileLink:tempPath,
})
    // Save the file to the uploads directory
    fs.writeFileSync(tempPath, buffer);
    console.log(file,tempPath);
    return NextResponse.json({
      message: "File uploaded successfully",
      fileName: file.name,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
