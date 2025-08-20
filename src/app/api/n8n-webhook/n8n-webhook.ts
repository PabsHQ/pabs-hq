
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const allowedDomain = "pabsonabs.app.n8n.cloud";

  const origin = req.headers.host || "";
  if (origin !== allowedDomain) {
    return res.status(403).json({ error: "Forbidden" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  console.log("📩 Payload from n8n:", req.body);

  return res.status(200).json({ success: true });
}
