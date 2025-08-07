import { notFound } from "next/navigation";
import { firestore } from "../../../../lib/firebaseAdmin";
import LeftSidebar from "@/app/components/leftSidebar";
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
    <div className="h-screen w-screen p-[20px]">
      <div className="lg:flex gap-[16px] flex-row w-full h-full hidden">
        <LeftSidebar />
        <div className="flex flex-col gap-[16px] w-full h-full min-h-0">
          <div className="rounded-[30px] bg-white p-[2%] flex flex-col w-full drop-shadow-[2px_2px_5px_rgba(11,15,52,0.18)] h-full min-h-0">
            <h1 className="font-bold text-black text-center">
              {newsItem?.title}
            </h1>

            <div className="flex-1 overflow-y-auto pr-4 text-[#000]">
              <div className="relative w-full aspect-[764/280] rounded-[40px] overflow-hidden my-[20px]">
                <Image
                  src={newsItem.banner}
                  fill
                  className="object-cover"
                  alt="banner"
                />
              </div>
              <div
                className=""
                dangerouslySetInnerHTML={{ __html: newsItem?.content }}
              ></div>
            </div>
          </div>
        </div>
        {/* <RightSidebar /> */}
      </div>

      {/* Mobile display */}
      <div className="lg:hidden gap-[16px] flex-row w-full h-full flex">Yo</div>
    </div>
  );
}
