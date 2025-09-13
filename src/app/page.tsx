import Header from "./components/header";
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
    <div className="min-h-screen bg-[#F0F1F5]">
      {/* Sticky Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6 h-[calc(100vh-120px)] min-h-[600px]">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0" role="navigation" aria-label="Main navigation">
            <LeftSidebar />
          </aside>

          {/* Main Content */}
          <section className="flex-1 min-w-0" aria-label="News content">
            <MainContent banner={homepageBanner} news={news} />
          </section>

          {/* Right Sidebar */}
          <aside className="w-80 flex-shrink-0" role="complementary" aria-label="Additional content">
            <RightSidebar news={news} />
          </aside>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <section aria-label="News content">
            <MainContent news={news} banner={homepageBanner} />
          </section>
        </div>
      </main>
    </div>
  );
}
