import LeftSidebar from "./components/leftSidebar";
import MainContent from "./components/mainContent";
import RightSidebar from "./components/rightSidebar";

export default function Home() {
  return (
    <div className="h-screen w-screen p-[20px]">
      {/* Desktop display */}
      <div className="lg:flex gap-[16px] flex-row w-full h-full hidden">
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Main Content (Middle) */}
        <div className="flex-1">
          <MainContent />
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>

      {/* Mobile display */}
      <div className="lg:hidden gap-[16px] flex-row w-full h-full flex">
        {/* Main Content (Middle) */}
        <div className="flex-1">
          <MainContent />
        </div>
      </div>
    </div>
  );
}
