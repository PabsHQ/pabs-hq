/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { firestore } from "../../../../lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    // Get the form data from the request
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as any;
    const bannerImage = formData.get("banner") as string;
    const editor = JSON.parse(formData.get("editor") as any);
    const newsType = formData.get("newsType") as string;

    // Check if the file is provided
    if (!title || !content || !editor || !bannerImage) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const docRef = firestore.collection("news").doc(); // no ID passed
    const id = docRef.id; // this is your unique slug
    await docRef.set({
      id,
      title: title,
      banner: bannerImage,
      editor,
      content: content,
      createdAt: new Date(),
      newsType: newsType,
      likes: {},
      comments: {},
    });
    // Return the response with the file URL
    return NextResponse.json({
      message: "Upload success",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload the file" },
      { status: 500 }
    );
  }
}
