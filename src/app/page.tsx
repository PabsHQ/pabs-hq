import LeftSidebar from "./components/leftSidebar";
import MainContent from "./components/mainContent";
import RightSidebar from "./components/rightSidebar";
import { getHomepageBanner } from "./helper/getHomepageBanner";
import { getNews } from "./helper/getNews";
import { NewsItem } from "./interfaces/newsDto.model";

export const revalidate = 3600;
export default async function Home() {
  const news: NewsItem[] = ((await getNews()) as NewsItem[]) || [];
  const homepageBanner: string = (await getHomepageBanner()) as string;
  return (
    <div className="h-screen w-screen p-[20px]">
      {/* Desktop display */}
      <div className="lg:flex gap-[16px] flex-row w-full h-full hidden">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content (Middle) */}
        <div className="flex-1">
          <MainContent banner={homepageBanner} news={news} />
        </div>

        {/* Right Sidebar */}
        <RightSidebar news={news} />
      </div>

      {/* Mobile display */}
      <div className="lg:hidden gap-[16px] flex-row w-full h-full flex">
        {/* Main Content (Middle) */}
        <div className="flex-1">
          <MainContent news={news} banner={homepageBanner} />
        </div>
      </div>
    </div>
  );
}
