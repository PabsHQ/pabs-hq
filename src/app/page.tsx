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
    <div className="h-screen w-screen p-4 lg:p-5 xl:p-6">
      {/* Desktop display */}
      <div className="hidden lg:flex lg:gap-4 xl:gap-5 w-full h-full">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content (Middle) */}
        <div className="flex-1 min-w-0">
          <MainContent banner={homepageBanner} news={news} />
        </div>

        {/* Right Sidebar */}
        <RightSidebar news={news} />
      </div>

      {/* Mobile display */}
      <div className="lg:hidden w-full h-full">
        <MainContent news={news} banner={homepageBanner} />
      </div>
    </div>
  );
}
