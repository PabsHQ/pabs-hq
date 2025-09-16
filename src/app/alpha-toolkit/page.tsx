import Header from "../components/header";
import LeftSidebar from "../components/leftSidebar";
import { ToolSkeleton, PageHeaderSkeleton } from "../components/skeleton";
import { useState, useEffect } from "react";

export default function AlphaToolkit() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <ToolSkeleton key={i} />
                  ))}
                </div>
                <div className="bg-[#222222] rounded-xl border border-[#333333] overflow-hidden">
                  <div className="p-6 border-b border-[#333333]">
                    <div className="h-6 w-32 bg-[#333333] rounded animate-pulse mb-2" />
                    <div className="h-4 w-48 bg-[#333333] rounded animate-pulse" />
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-[#333333] rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#444444] rounded-lg mr-4 animate-pulse" />
                            <div className="space-y-2">
                              <div className="h-4 w-32 bg-[#444444] rounded animate-pulse" />
                              <div className="h-3 w-48 bg-[#444444] rounded animate-pulse" />
                            </div>
                          </div>
                          <div className="h-6 w-12 bg-[#444444] rounded-full animate-pulse" />
                        </div>
                      ))}
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
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-[#333333] rounded-lg mr-3 animate-pulse" />
                        <div className="space-y-1">
                          <div className="h-4 w-20 bg-[#333333] rounded animate-pulse" />
                          <div className="h-3 w-16 bg-[#333333] rounded animate-pulse" />
                        </div>
                      </div>
                      <div className="h-3 w-full bg-[#333333] rounded mb-3 animate-pulse" />
                      <div className="h-8 w-full bg-[#333333] rounded animate-pulse" />
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
          <section className="flex-1 min-w-0 bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]" aria-label="Alpha Toolkit content">
            <div className="space-y-8">
              {/* Page Header */}
              <div className="border-b border-[#333333] pb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Alpha Toolkit</h1>
                <p className="text-[#a0a0a0]">Advanced tools and analytics for Pabs ecosystem</p>
              </div>

              {/* Tool Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#ff6b35] transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">📈</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Analytics</h3>
                      <p className="text-sm text-[#a0a0a0]">Market insights</p>
                    </div>
                  </div>
                  <p className="text-[#a0a0a0] text-sm mb-4">Advanced charting and market analysis tools</p>
                  <button className="w-full bg-[#333333] text-white py-2 px-4 rounded-lg hover:bg-[#444444] transition-colors min-h-[44px] touch-manipulation">
                    Coming Soon
                  </button>
                </div>

                <div className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#ff6b35] transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">⚡</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Trading Tools</h3>
                      <p className="text-sm text-[#a0a0a0]">Smart trading</p>
                    </div>
                  </div>
                  <p className="text-[#a0a0a0] text-sm mb-4">Automated trading strategies and signals</p>
                  <button className="w-full bg-[#333333] text-white py-2 px-4 rounded-lg hover:bg-[#444444] transition-colors min-h-[44px] touch-manipulation">
                    Coming Soon
                  </button>
                </div>

                <div className="bg-[#222222] rounded-xl p-6 border border-[#333333] hover:border-[#ff6b35] transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white text-xl">🔬</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Research</h3>
                      <p className="text-sm text-[#a0a0a0]">Deep analysis</p>
                    </div>
                  </div>
                  <p className="text-[#a0a0a0] text-sm mb-4">Comprehensive research and due diligence tools</p>
                  <button className="w-full bg-[#333333] text-white py-2 px-4 rounded-lg hover:bg-[#444444] transition-colors min-h-[44px] touch-manipulation">
                    Coming Soon
                  </button>
                </div>
              </div>

              {/* Featured Tools */}
              <div className="bg-[#222222] rounded-xl border border-[#333333] overflow-hidden">
                <div className="p-6 border-b border-[#333333]">
                  <h2 className="text-xl font-semibold text-white">Featured Tools</h2>
                  <p className="text-[#a0a0a0] text-sm mt-1">Most popular alpha-generating tools</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#333333] rounded-lg hover:bg-[#444444] transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#ff6b35] rounded-lg flex items-center justify-center mr-4">
                          <span className="text-white">🎯</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Portfolio Optimizer</h3>
                          <p className="text-sm text-[#a0a0a0]">AI-powered portfolio rebalancing</p>
                        </div>
                      </div>
                      <span className="text-xs bg-[#ff6b35] text-white px-2 py-1 rounded-full">Beta</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-[#333333] rounded-lg hover:bg-[#444444] transition-colors">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-white">📊</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-white">Market Scanner</h3>
                          <p className="text-sm text-[#a0a0a0]">Real-time opportunity detection</p>
                        </div>
                      </div>
                      <span className="text-xs bg-[#ff6b35] text-white px-2 py-1 rounded-full">Beta</span>
                    </div>
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
                <h1 className="text-2xl font-bold text-white mb-2">Alpha Toolkit</h1>
                <p className="text-[#a0a0a0]">Advanced tools and analytics</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                  <h3 className="font-medium text-white mb-2">Analytics</h3>
                  <p className="text-sm text-[#a0a0a0] mb-3">Market insights and analysis</p>
                  <button className="w-full bg-[#333333] text-white py-2 px-4 rounded-lg text-sm min-h-[44px] touch-manipulation">
                    Coming Soon
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
