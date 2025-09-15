import Header from "../components/header";
import LeftSidebar from "../components/leftSidebar";

export default function Forums() {
  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Sticky Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className="w-full py-6">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6 h-[calc(100vh-120px)] min-h-[600px] px-6">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0" role="navigation" aria-label="Main navigation">
            <LeftSidebar />
          </aside>

          {/* Main Content */}
          <section className="flex-1 min-w-0 bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]" aria-label="Forums content">
            <div className="space-y-8">
              {/* Page Header */}
              <div className="border-b border-[#333333] pb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Forums</h1>
                <p className="text-[#a0a0a0]">Connect with the Pabs community</p>
              </div>

              {/* Forum Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#ff6b35] transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#ff6b35] to-[#ff5722] rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">💬</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">General Discussion</h3>
                      <p className="text-sm text-[#a0a0a0]">Open conversations</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#a0a0a0] mb-4">
                    <span>1,234 topics</span>
                    <span>5,678 posts</span>
                  </div>
                  <div className="text-xs text-[#a0a0a0]">
                    Latest: &quot;Market analysis for Q4&quot; by @trader123
                  </div>
                </div>

                <div className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#ff6b35] transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">📈</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Trading</h3>
                      <p className="text-sm text-[#a0a0a0]">Market discussions</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#a0a0a0] mb-4">
                    <span>892 topics</span>
                    <span>3,456 posts</span>
                  </div>
                  <div className="text-xs text-[#a0a0a0]">
                    Latest: &quot;PABS token analysis&quot; by @analyst99
                  </div>
                </div>

                <div className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#ff6b35] transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">🆘</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Support</h3>
                      <p className="text-sm text-[#a0a0a0]">Get help</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-[#a0a0a0] mb-4">
                    <span>456 topics</span>
                    <span>1,234 posts</span>
                  </div>
                  <div className="text-xs text-[#a0a0a0]">
                    Latest: &quot;Wallet connection issue&quot; by @user456
                  </div>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-[#222222] rounded-xl border border-[#333333] overflow-hidden">
                <div className="p-6 border-b border-[#333333]">
                  <h2 className="text-xl font-semibold text-white">Recent Posts</h2>
                  <p className="text-[#a0a0a0] text-sm mt-1">Latest community discussions</p>
                </div>
                <div className="divide-y divide-[#333333]">
                  <div className="p-6 hover:bg-[#333333] transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-2">PABS Token Price Prediction for 2024</h3>
                        <p className="text-[#a0a0a0] text-sm mb-3">What are your thoughts on the current market conditions and where you see PABS heading in the next quarter?</p>
                        <div className="flex items-center space-x-4 text-xs text-[#a0a0a0]">
                          <span>by @cryptotrader</span>
                          <span>2 hours ago</span>
                          <span>23 replies</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b35] to-[#ff5722] rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">C</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 hover:bg-[#333333] transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-2">New NFT Collection Launch - Alpha Access</h3>
                        <p className="text-[#a0a0a0] text-sm mb-3">The team just announced the new collection. Who's planning to mint?</p>
                        <div className="flex items-center space-x-4 text-xs text-[#a0a0a0]">
                          <span>by @nftcollector</span>
                          <span>5 hours ago</span>
                          <span>45 replies</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">N</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden px-4 space-y-6">
          <section className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">Forums</h1>
                <p className="text-[#a0a0a0]">Connect with the Pabs community</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                  <h3 className="font-medium text-white mb-2">General Discussion</h3>
                  <p className="text-sm text-[#a0a0a0] mb-2">1,234 topics • 5,678 posts</p>
                  <p className="text-xs text-[#a0a0a0]">Latest: &quot;Market analysis for Q4&quot;</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
