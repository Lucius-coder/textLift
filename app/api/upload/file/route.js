// app/api/upload/route.js

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// POST request handler for file uploads
export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get('file'); // Retrieve the file from the form data

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const tempPath = path.join(process.cwd(), "public",'upload', file.name);

        // Convert the file stream to a buffer
        const buffer = Buffer.from(await file.arrayBuffer());

        // Save the file to the uploads directory
        fs.writeFileSync(tempPath, buffer);

        return NextResponse.json({ message: 'File uploaded successfully', fileName: file.name });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
    }
}

export const config = {
    api: {
        bodyParser: false, // Disable Next.js default body parsing to handle FormData
    },
};
