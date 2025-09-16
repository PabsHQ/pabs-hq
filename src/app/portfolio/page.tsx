import Header from "../components/header";
import LeftSidebar from "../components/leftSidebar";
import { CardSkeleton, PageHeaderSkeleton } from "../components/skeleton";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f]">
        <Header />
        <main className="w-full py-6">
          <div className="hidden lg:flex gap-6 h-[calc(100vh-120px)] min-h-[600px] px-6">
            <aside className="w-64 flex-shrink-0">
              <LeftSidebar />
            </aside>
            <section className="flex-1 min-w-0 bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]">
              <div className="space-y-8">
                <PageHeaderSkeleton />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <CardSkeleton key={i} />
                  ))}
                </div>
                <div className="bg-[#222222] rounded-xl border border-[#333333] overflow-hidden">
                  <div className="p-6 border-b border-[#333333]">
                    <div className="h-6 w-24 bg-[#333333] rounded animate-pulse mb-2" />
                    <div className="h-4 w-48 bg-[#333333] rounded animate-pulse" />
                  </div>
                  <div className="p-6">
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-[#333333] rounded-full mx-auto mb-4 animate-pulse" />
                      <div className="h-6 w-32 bg-[#333333] rounded mx-auto mb-2 animate-pulse" />
                      <div className="h-4 w-48 bg-[#333333] rounded mx-auto mb-6 animate-pulse" />
                      <div className="h-12 w-32 bg-[#333333] rounded mx-auto animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="lg:hidden px-4 space-y-6">
            <section className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]">
              <div className="space-y-6">
                <PageHeaderSkeleton />
                <div className="grid grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                      <div className="h-3 w-16 bg-[#333333] rounded mb-2 animate-pulse" />
                      <div className="h-6 w-20 bg-[#333333] rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

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
          <section className="flex-1 min-w-0 bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]" aria-label="Portfolio content">
            <div className="space-y-8">
              {/* Page Header */}
              <div className="border-b border-[#333333] pb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Portfolio</h1>
                <p className="text-[#a0a0a0]">Track your Pabs ecosystem investments and performance</p>
              </div>

              {/* Portfolio Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#ff6b35] transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-[#a0a0a0]">Total Value</h3>
                    <div className="w-8 h-8 bg-[#ff6b35] rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">💰</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">$0.00</p>
                  <p className="text-sm text-green-500 mt-1">+0.00% (24h)</p>
                </div>

                <div className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#ff6b35] transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-[#a0a0a0]">Pabs Tokens</h3>
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🪙</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">0 PABS</p>
                  <p className="text-sm text-[#a0a0a0] mt-1">$0.00 USD</p>
                </div>

                <div className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#ff6b35] transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-[#a0a0a0]">NFTs Owned</h3>
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">🎨</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">0</p>
                  <p className="text-sm text-[#a0a0a0] mt-1">Collections</p>
                </div>

                <div className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#ff6b35] transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-[#a0a0a0]">XP Earned</h3>
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm">⭐</span>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">0</p>
                  <p className="text-sm text-[#a0a0a0] mt-1">Total Points</p>
                </div>
              </div>

              {/* Holdings Table */}
              <div className="bg-[#222222] rounded-xl border border-[#333333] overflow-hidden">
                <div className="p-6 border-b border-[#333333]">
                  <h2 className="text-xl font-semibold text-white">Holdings</h2>
                  <p className="text-[#a0a0a0] text-sm mt-1">Your current asset portfolio</p>
                </div>
                <div className="p-6">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No Holdings Yet</h3>
                    <p className="text-[#a0a0a0] mb-6">Start building your portfolio by acquiring Pabs assets</p>
                    <button className="bg-gradient-to-r from-[#ff6b35] to-[#ff5722] text-white px-6 py-3 rounded-lg font-medium hover:from-[#ff5722] hover:to-[#e64a19] transition-all duration-300 min-h-[44px] touch-manipulation">
                      Explore Assets
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Mobile Layout - Enhanced */}
        <div className="lg:hidden px-4 space-y-6">
          <section className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">Portfolio</h1>
                <p className="text-[#a0a0a0] text-sm">Track your Pabs ecosystem investments</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                  <h3 className="text-xs font-medium text-[#a0a0a0] mb-2">Total Value</h3>
                  <p className="text-lg font-bold text-white">$0.00</p>
                  <p className="text-xs text-green-500 mt-1">+0.00% (24h)</p>
                </div>
                <div className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                  <h3 className="text-xs font-medium text-[#a0a0a0] mb-2">Pabs Tokens</h3>
                  <p className="text-lg font-bold text-white">0 PABS</p>
                  <p className="text-xs text-[#a0a0a0] mt-1">$0.00 USD</p>
                </div>
                <div className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                  <h3 className="text-xs font-medium text-[#a0a0a0] mb-2">NFTs Owned</h3>
                  <p className="text-lg font-bold text-white">0</p>
                  <p className="text-xs text-[#a0a0a0] mt-1">Collections</p>
                </div>
                <div className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                  <h3 className="text-xs font-medium text-[#a0a0a0] mb-2">XP Earned</h3>
                  <p className="text-lg font-bold text-white">0</p>
                  <p className="text-xs text-[#a0a0a0] mt-1">Total Points</p>
                </div>
              </div>
              
              {/* Mobile Holdings Section */}
              <div className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                <h3 className="text-sm font-semibold text-white mb-2">Holdings</h3>
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg">📊</span>
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1">No Holdings Yet</h4>
                  <p className="text-xs text-[#a0a0a0] mb-4">Start building your portfolio</p>
                  <button className="bg-gradient-to-r from-[#ff6b35] to-[#ff5722] text-white px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] touch-manipulation">
                    Explore Assets
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
