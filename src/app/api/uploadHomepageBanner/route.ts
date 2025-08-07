import { NextResponse } from "next/server";
import { bucket } from "../../../../lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get("file") as File;

    // Check if the file is provided
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const [existingFiles] = await bucket.getFiles({
      prefix: "homepageBanner/",
    });

    await Promise.all(
      existingFiles.map(async (f) => {
        try {
          await f.delete();
        } catch (err) {
          console.warn(`Failed to delete file ${f.name}`, err);
        }
      })
    );

    // Create a unique file name using UUID
    const fileExtension = file.name.split(".").pop();
    const fileName = `homepageBanner/1.${fileExtension}`;

    // Convert the file to a Buffer (ArrayBuffer to Buffer)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload the file to Firebase Storage
    const fileUpload = bucket.file(fileName);

    try {
      await fileUpload.delete();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Ignore error if file doesn't exist
      if (err.code !== 404) throw err;
    }

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

export async function GET() {
  try {
    // List files under 'homepageBanner/' folder
    const [files] = await bucket.getFiles({ prefix: "homepageBanner/" });
    if (files.length < 1) {
      return NextResponse.json(
        { error: "No file found in homepageBanner" },
        { status: 404 }
      );
    }

    const realFile = files.find(
      (file) => file.metadata.name !== "homepageBanner/"
    );

    if (!realFile) {
      return NextResponse.json(
        { error: "No file found in homepageBanner" },
        { status: 404 }
      );
    }

    // Make sure file is public (optional if you want public access)
    await realFile.makePublic();

    // Generate the public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${
      realFile?.metadata.name
    }?t=${Date.now()}`;

    // Return the URL
    return NextResponse.json({
      url: publicUrl,
      filename: realFile?.metadata.name,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch file" },
      { status: 500 }
    );
  }
}
