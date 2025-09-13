import Header from "./components/header";
import LeftSidebar from "./components/leftSidebar";
import MainContent from "./components/mainContent";
import RightSidebar from "./components/rightSidebar";
import { getNews } from "./helper/getNews";
import { NewsItem } from "./interfaces/newsDto.model";

export const revalidate = 3600;
export default async function Home() {
  const news: NewsItem[] = ((await getNews()) as NewsItem[]) || [];
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6 min-h-[calc(100vh-120px)]">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0" role="navigation" aria-label="Main navigation">
            <LeftSidebar />
          </aside>

          {/* Main Content */}
          <section className="flex-1 min-w-0" aria-label="News content">
            <MainContent news={news} />
          </section>

          {/* Right Sidebar */}
          <aside className="w-80 flex-shrink-0" role="complementary" aria-label="Additional content">
            <RightSidebar news={news} />
          </aside>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <MainContent news={news} />
        </div>
      </main>
    </div>
  );
}
