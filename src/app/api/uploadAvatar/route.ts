import { NextResponse } from "next/server";
import { bucket, firestore } from "../../../../lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const walletAddress = formData.get("walletAddress") as string;
    const username = formData.get("username") as string;
    const usernameSubtitle = formData.get("usernameSubtitle") as string;

    // Check if the file is provided
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Create a unique file name using UUID
    const fileExtension = file.name.split(".").pop();
    const fileName = `avatars/${walletAddress}.${fileExtension}`;

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
    const publicUrl = `https://storage.googleapis.com/${
      bucket.name
    }/${fileName}?t=${Date.now()}`;

    const docRef = firestore.collection("editors").doc(walletAddress);
    await docRef.set({
      avatarUrl: publicUrl,
      username: username,
      usernameSubtitle: usernameSubtitle,
    });

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

export async function GET(req: Request) {
  const url = new URL(req.url);
  const walletAddress = url.searchParams.get("walletAddress");

  try {
    // Check if the walletAddress is provided in the query parameters
    if (!walletAddress) {
      return NextResponse.json(
        { error: "walletAddress is required" },
        { status: 400 }
      );
    }

    // Fetch the editor document from Firestore
    const docRef = firestore.collection("editors").doc(walletAddress);
    const doc = await docRef.get();

    // Check if the document exists
    if (!doc.exists) {
      return NextResponse.json({ error: "Editor not found" }, { status: 404 });
    }

    // Return the editor data
    const editorData = doc.data();
    return NextResponse.json({
      avatarUrl: editorData?.avatarUrl,
      usernameSubtitle: editorData?.usernameSubtitle,
      username: editorData?.username,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch the editor" },
      { status: 500 }
    );
  }
}
