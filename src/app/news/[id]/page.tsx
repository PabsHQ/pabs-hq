import { notFound } from "next/navigation";
import { firestore } from "../../../../lib/firebaseAdmin";
import LeftSidebar from "@/app/components/leftSidebar";
import RightSidebar from "@/app/components/rightSidebar";
import { NewsItem } from "@/app/interfaces/newsDto.model";
import { Metadata } from "next";
import Image from "next/image";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ""); // remove all HTML tags
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const doc = await firestore.collection("news").doc(id).get();

  if (!doc.exists) {
    return {
      title: "News Not Found",
      description: "The news article you are looking for does not exist.",
    };
  }

  const newsItem = doc.data() as NewsItem;
  const plainTextContent = stripHtml(newsItem?.content || "");
  const description =
    plainTextContent.length > 150
      ? plainTextContent.slice(0, 147) + "..."
      : plainTextContent;

  return {
    title: newsItem.title || "News",
    description,
    openGraph: {
      title: newsItem.title,
      description,
      images: newsItem.banner ? [newsItem.banner] : undefined,
    },
  };
}

export default async function NewsPage({ params }: Props) {
  const { id } = await params;
  const doc = await firestore.collection("news").doc(id).get();

  if (!doc.exists) {
    notFound(); // Automatically renders the 404 page
  }

  const newsItem = { id: doc.id, ...doc.data() } as NewsItem;
  
  return (
    <div className="min-h-screen w-screen">
      {/* Header spacing */}
      <div className="pt-20 min-h-[calc(100vh-5rem)]">
        {/* Desktop display */}
        <div className="lg:flex gap-6 flex-row w-full min-h-full hidden px-6">
          <LeftSidebar />
          <div className="flex flex-col gap-4 w-full h-full min-h-0 px-3">
            <div className="sidebar-card p-8 flex flex-col w-full h-full min-h-0">
              <h1 className="font-bold text-black dark:text-white text-center text-3xl mb-6">
                {newsItem?.title}
              </h1>

              <div className="flex-1 overflow-y-auto text-black dark:text-white">
                <div className="relative w-full aspect-[764/280] rounded-3xl overflow-hidden my-6 shadow-lg">
                  <Image
                    src={newsItem.banner}
                    fill
                    className="object-cover"
                    alt="banner"
                  />
                </div>
                <div
                  className="prose prose-lg max-w-none dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: newsItem?.content }}
                />
              </div>
            </div>
          </div>
          <RightSidebar />
        </div>

        {/* Mobile display */}
        <div className="lg:hidden w-full min-h-full flex px-4">
          <div className="w-full">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h1 className="font-bold text-black dark:text-white text-center text-2xl mb-4">
                {newsItem?.title}
              </h1>

              <div className="relative w-full aspect-[764/280] rounded-2xl overflow-hidden my-4 shadow-lg">
                <Image
                  src={newsItem.banner}
                  fill
                  className="object-cover"
                  alt="banner"
                />
              </div>
              
              <div
                className="prose prose-base max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: newsItem?.content }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
