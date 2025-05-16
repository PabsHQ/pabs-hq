import { NextResponse } from "next/server";
import { firestore } from "../../../../lib/firebaseAdmin";

export async function GET() {
  try {
    const snapshot = await firestore.collection("news").orderBy("createdAt", "desc").get();
    const news = snapshot.docs.map((doc) => doc.data());
    return NextResponse.json({ news });
  } catch (err) {
    console.error("❌ Failed to fetch news:", err);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
