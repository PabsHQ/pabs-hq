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
    <div className="min-h-screen bg-[#1a1a1a]">
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
            <MainContent news={news} />
          </section>

          {/* Right Sidebar */}
          <aside className="w-80 flex-shrink-0" role="complementary" aria-label="Additional content">
            <RightSidebar news={news} />
          </aside>
        </div>

        {/* Tablet Layout (768px - 1024px) */}
        <div className="hidden md:flex lg:hidden gap-4">
          <section className="flex-1" aria-label="News content">
            <MainContent news={news} />
          </section>
          <aside className="w-72" role="complementary" aria-label="Additional content">
            <RightSidebar news={news} />
          </aside>
        </div>

        {/* Mobile Layout (< 768px) */}
        <div className="md:hidden space-y-6">
          {/* Mobile Navigation Menu */}
          <div className="bg-[#2a2a2a] rounded-2xl shadow-sm border border-[#404040] p-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <h2 className="text-lg font-semibold text-white">Menu</h2>
                <svg 
                  className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4 space-y-2">
                {[
                  { title: "Pabs News", active: true },
                  { title: "Portfolio", active: false },
                  { title: "Alpha Toolkit", active: false },
                  { title: "Leaderboards", active: false },
                  { title: "Forums", active: false },
                  { title: "XP Systems", active: false },
                  { title: "Earn", active: false },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl ${
                      item.active 
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white" 
                        : "text-gray-400"
                    }`}
                  >
                    <span className="text-sm font-medium">{item.title}</span>
                    {!item.active && (
                      <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                        Soon
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </details>
          </div>

          {/* Main Content */}
          <section aria-label="News content">
            <MainContent news={news} />
          </section>

          {/* Mobile Quick Links */}
          <div className="bg-[#2a2a2a] rounded-2xl shadow-sm border border-[#404040] p-4 space-y-4">
            <h3 className="text-lg font-bold text-white">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-[#404040] rounded-xl text-left hover:bg-[#4a4a4a] transition-colors">
                <div className="text-sm font-medium text-white">Staff Picks</div>
                <div className="text-xs text-gray-400">Featured content</div>
              </button>
              <button className="p-3 bg-[#404040] rounded-xl text-left hover:bg-[#4a4a4a] transition-colors">
                <div className="text-sm font-medium text-white">Latest</div>
                <div className="text-xs text-gray-400">Recent articles</div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
