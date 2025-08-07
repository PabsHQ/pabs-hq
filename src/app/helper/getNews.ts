import { firestore } from "../../../lib/firebaseAdmin";

export async function getNews() {
  const query = firestore.collection("news").orderBy("createdAt", "desc");

  const snapshot = await query.get();

  const news = snapshot.docs.map((doc) => {
    const data = doc.data();

    // Convert createdAt timestamp to ISO string or number
    let createdAt = data.createdAt;
    if (createdAt && typeof createdAt.toDate === "function") {
      createdAt = createdAt.toDate().toISOString();
    } else if (createdAt && "_seconds" in createdAt) {
      // fallback if toDate() isn't available
      createdAt = new Date(createdAt._seconds * 1000).toISOString();
    }

    return {
      ...data,
      createdAt,
    };
  });

  return news;
}
