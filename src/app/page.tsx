import RightSidebar from "./components/rightSidebar";

export default function Home() {

  return (
    <div className="h-screen w-screen p-[20px]">
      <div className="flex gap-[16px] flex-row w-full h-full">
        {/* Left Sidebar */}
        <div className="flex-[0.3] bg-gray-200 p-4">
          <h2 className="text-lg font-bold">Left Sidebar</h2>
          <p>Sidebar content here...</p>
        </div>

        {/* Main Content (Middle) */}
        <div className="flex-1 bg-gray-100 p-4 overflow-auto">
          <h1 className="text-2xl font-bold">Main Content</h1>
          <p>This is the largest section for your main content...</p>
        </div>

        {/* Right Sidebar */}
        <RightSidebar />
      </div>
    </div>
  );
}
