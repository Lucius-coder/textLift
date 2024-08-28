import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import connectToDb from "@/database/connection";

import fileModel from "@/database/models/fileInfo";
;

// POST request handler for file uploads
export async function POST(req) {
  try {
    // Ensure the database connection is established
    await connectToDb();

    // Parse the form data from the request
    const data = await req.formData();
    const file = data.get("file"); // Retrieve the file from the form data
    const email =data.get("email");

    // Check if the file is provided
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Define the path to save the file
    const uploadDir = path.join(process.cwd(), "public", "upload");

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const tempPath = path.join(uploadDir, file.name);

    // Convert the file stream to a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Save the file to the upload directory
    fs.writeFileSync(tempPath, buffer);
    console.log("File saved:", file, tempPath,email);

    // Save the file information to the database
    const fileInfoToDB = await fileModel.create({
      email: email, 
      fileName: file.name,
      fileLink: tempPath,
    });

    // Optionally, process the file (e.g., text-to-audio or read PDF)
    // await readFile(tempPath);
    

    return NextResponse.json({
      message: "File uploaded successfully",
      fileName: file.name,
      email:email
    });
  } catch (error) {
    console.error("File upload error:", error.message);
    return NextResponse.json({ error: "File upload failed" }, { status: 500 });
  }
}
