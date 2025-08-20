import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const key = "pabsxabs1541235)346436123";
  const apiKey = req.headers.get("api-key");

  if (apiKey !== key) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  console.log("📩 Payload from n8n:", body);

  return NextResponse.json({ success: true });
}
