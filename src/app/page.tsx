import LeftSidebar from "./components/leftSidebar";
import MainContent from "./components/mainContent";
import RightSidebar from "./components/rightSidebar";
import { getHomepageBanner } from "./helper/getHomepageBanner";
import { getNews } from "./helper/getNews";
import { NewsItem } from "./interfaces/newsDto.model";
import Image from "next/image";

export const revalidate = 3600;
export default async function Home() {
  const news: NewsItem[] = ((await getNews()) as NewsItem[]) || [];
  const homepageBanner: string = (await getHomepageBanner()) as string;
  return (
    <div className="min-h-screen w-screen">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/images/pabsLogo.png"
              className="cursor-pointer h-8"
              alt="Pabs HQ Logo"
              width={140}
              height={32}
            />
          </div>

          {/* Navigation Center */}
          <nav className="hidden md:flex items-center space-x-8">
            <span className="text-gray-900 font-semibold">News</span>
            <span className="text-gray-400 cursor-not-allowed">Portfolio</span>
            <span className="text-gray-400 cursor-not-allowed">Alpha</span>
            <span className="text-gray-400 cursor-not-allowed">Leaderboards</span>
          </nav>

          {/* Profile/Wallet Right */}
          <div className="flex items-center space-x-4">
            <button className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105">
              Connect Wallet
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Desktop display */}
        <div className="lg:flex gap-8 flex-row w-full hidden">
          {/* Left Sidebar - Slim */}
          <div className="w-64 flex-shrink-0">
            <LeftSidebar />
          </div>

          {/* Main Content - 70% width */}
          <div className="flex-1 max-w-none">
            <MainContent banner={homepageBanner} news={news} />
          </div>

          {/* Right Sidebar - 30% width max */}
          <div className="w-80 flex-shrink-0">
            <RightSidebar news={news} />
          </div>
        </div>

        {/* Mobile display */}
        <div className="lg:hidden w-full">
          <MainContent news={news} banner={homepageBanner} />
        </div>
      </div>
    </div>
  );
}
