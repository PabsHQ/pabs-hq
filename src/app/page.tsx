import LeftSidebar from "./components/leftSidebar";
import MainContent from "./components/mainContent";
import { getNews } from "./helper/getNews";
import { NewsItem } from "./interfaces/newsDto.model";

export const revalidate = 3600;
export default async function Home() {
  const news: NewsItem[] = ((await getNews()) as NewsItem[]) || [];
  return (
    <div className="h-screen w-screen p-5">
      {/* Desktop display */}
      <div className="lg:flex gap-4 flex-row w-full h-full hidden">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content - Extended to right edge */}
        <div className="flex-1 pr-5">
          <MainContent news={news} />
        </div>
      </div>

      {/* Mobile display */}
      <div className="lg:hidden gap-4 flex-row w-full h-full flex">
        {/* Main Content */}
        <div className="flex-1 pr-5">
          <MainContent news={news} />
        </div>
      </div>
    </div>
  );
}
