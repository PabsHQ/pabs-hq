import { NextResponse } from "next/server";
import { bucket } from "../../../../lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get("file") as File;

    // Check if the file is provided
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Create a unique file name using UUID
    const fileExtension = file.name.split(".").pop();
    const fileName = `newsBanners/${uuidv4()}.${fileExtension}`;

    // Convert the file to a Buffer (ArrayBuffer to Buffer)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the file to Firebase Storage
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(buffer, {
      metadata: {
        contentType: file.type,
        cacheControl: "public, max-age=31536000", // Cache for 1 year
      },
      public: true, // Make the file publicly accessible (optional)
    });

    await fileUpload.makePublic();

    // Generate the public URL for the file
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    // Return the response with the file URL
    return NextResponse.json({
      message: "Upload success",
      url: publicUrl,
      filename: file.name,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload the file" },
      { status: 500 }
    );
  }
}
