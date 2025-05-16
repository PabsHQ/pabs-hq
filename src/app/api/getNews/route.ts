import { NextResponse } from "next/server";
import { firestore } from "../../../../lib/firebaseAdmin";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limitParam = url.searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : null;

    let query = firestore.collection("news").orderBy("createdAt", "desc");

    if (limit && !isNaN(limit)) {
      query = query.limit(limit);
    }

    const snapshot = await query.get();
    const news = snapshot.docs.map((doc) => doc.data());

    return NextResponse.json({ news });
  } catch (err) {
    console.error("❌ Failed to fetch news:", err);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
