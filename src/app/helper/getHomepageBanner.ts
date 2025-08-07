import { bucket } from "../../../lib/firebaseAdmin";

export async function getHomepageBanner() {
  // List files under 'homepageBanner/' folder
  const [files] = await bucket.getFiles({ prefix: "homepageBanner/" });

  if (!files || files.length === 0) {
    return null; // or throw new Error("No files found");
  }

  // Filter out the folder placeholder file (usually with size 0)
  const realFile = files.find((file) => file.name !== "homepageBanner/");

  if (!realFile) {
    return null; // or throw new Error("No valid file found");
  }

  // Optionally make public, but consider doing this only once on upload
  await realFile.makePublic();

  // Build public URL with cache-busting query param
  const url = `https://storage.googleapis.com/${bucket.name}/${
    realFile.name
  }?t=${Date.now()}`;

  return url;
}
