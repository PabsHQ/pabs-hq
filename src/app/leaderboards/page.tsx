import Header from "../components/header";
import LeftSidebar from "../components/leftSidebar";
import { CardSkeleton, TableSkeleton, PageHeaderSkeleton } from "../components/skeleton";
import { useState, useEffect } from "react";

export default function Leaderboards() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
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
                <div className="flex space-x-2">
                  <div className="h-10 w-20 bg-[#333333] rounded-lg animate-pulse" />
                  <div className="h-10 w-24 bg-[#333333] rounded-lg animate-pulse" />
                  <div className="h-10 w-20 bg-[#333333] rounded-lg animate-pulse" />
                </div>
                <TableSkeleton />
                <CardSkeleton />
              </div>
            </section>
          </div>
          <div className="lg:hidden px-4 space-y-6">
            <section className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]">
              <div className="space-y-6">
                <PageHeaderSkeleton />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-[#333333] rounded animate-pulse" />
                          <div className="space-y-1">
                            <div className="h-4 w-24 bg-[#333333] rounded animate-pulse" />
                            <div className="h-3 w-16 bg-[#333333] rounded animate-pulse" />
                          </div>
                        </div>
                        <div className="h-4 w-12 bg-[#333333] rounded animate-pulse" />
                      </div>
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
          <section className="flex-1 min-w-0 bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]" aria-label="Leaderboards content">
            <div className="space-y-8">
              {/* Page Header */}
              <div className="border-b border-[#333333] pb-6">
                <h1 className="text-3xl font-bold text-white mb-2">Leaderboards</h1>
                <p className="text-[#a0a0a0]">Top performers in the Pabs ecosystem</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                <button className="bg-[#ff6b35] text-white px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] min-w-[44px] touch-manipulation">
                  All Time
                </button>
                <button className="bg-[#333333] text-[#a0a0a0] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#444444] transition-colors min-h-[44px] min-w-[44px] touch-manipulation">
                  This Month
                </button>
                <button className="bg-[#333333] text-[#a0a0a0] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#444444] transition-colors min-h-[44px] min-w-[44px] touch-manipulation">
                  This Week
                </button>
              </div>

              {/* Leaderboard Table */}
              <div className="bg-[#222222] rounded-xl border border-[#333333] overflow-hidden">
                <div className="p-6 border-b border-[#333333]">
                  <h2 className="text-xl font-semibold text-white">Top Traders</h2>
                  <p className="text-[#a0a0a0] text-sm mt-1">Ranked by total P&L</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#333333]">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-[#a0a0a0] uppercase tracking-wider">Rank</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-[#a0a0a0] uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-[#a0a0a0] uppercase tracking-wider">P&L</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-[#a0a0a0] uppercase tracking-wider">Win Rate</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-[#a0a0a0] uppercase tracking-wider">Trades</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#333333]">
                      <tr className="hover:bg-[#333333] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-2xl">🥇</span>
                            <span className="ml-2 text-sm font-medium text-white">1</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#ff6b35] to-[#ff5722] rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">A</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">AlphaTrader</div>
                              <div className="text-sm text-[#a0a0a0]">@alphatrader</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-green-500">+$12,450</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-white">87.5%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-white">156</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#333333] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-2xl">🥈</span>
                            <span className="ml-2 text-sm font-medium text-white">2</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">B</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">BetaWhale</div>
                              <div className="text-sm text-[#a0a0a0]">@betawhale</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-green-500">+$8,920</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-white">82.1%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-white">203</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#333333] transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-2xl">🥉</span>
                            <span className="ml-2 text-sm font-medium text-white">3</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                              <span className="text-white text-sm font-bold">C</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-white">CryptoKing</div>
                              <div className="text-sm text-[#a0a0a0]">@cryptoking</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-green-500">+$6,780</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-white">78.9%</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-white">134</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Your Ranking */}
              <div className="bg-[#222222] rounded-xl p-6 border border-[#333333]">
                <h3 className="text-lg font-semibold text-white mb-4">Your Ranking</h3>
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[#333333] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📊</span>
                  </div>
                  <h4 className="text-lg font-medium text-white mb-2">Not Ranked Yet</h4>
                  <p className="text-[#a0a0a0] mb-4">Start trading to appear on the leaderboard</p>
                  <button className="bg-gradient-to-r from-[#ff6b35] to-[#ff5722] text-white px-6 py-3 rounded-lg font-medium hover:from-[#ff5722] hover:to-[#e64a19] transition-all duration-300 min-h-[44px] touch-manipulation">
                    Start Trading
                  </button>
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
                <h1 className="text-2xl font-bold text-white mb-2">Leaderboards</h1>
                <p className="text-[#a0a0a0] text-sm">Top performers in Pabs ecosystem</p>
              </div>
              
              {/* Mobile Filter Tabs */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                <button className="bg-[#ff6b35] text-white px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] min-w-[44px] touch-manipulation flex-shrink-0">
                  All Time
                </button>
                <button className="bg-[#333333] text-[#a0a0a0] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#444444] transition-colors min-h-[44px] min-w-[44px] touch-manipulation flex-shrink-0">
                  This Month
                </button>
                <button className="bg-[#333333] text-[#a0a0a0] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#444444] transition-colors min-h-[44px] min-w-[44px] touch-manipulation flex-shrink-0">
                  This Week
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">🥇</span>
                      <div>
                        <div className="font-medium text-white">AlphaTrader</div>
                        <div className="text-sm text-[#a0a0a0]">+$12,450</div>
                      </div>
                    </div>
                    <span className="text-sm text-green-500 font-medium">87.5%</span>
                  </div>
                </div>
                
                <div className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">🥈</span>
                      <div>
                        <div className="font-medium text-white">BetaWhale</div>
                        <div className="text-sm text-[#a0a0a0]">+$8,920</div>
                      </div>
                    </div>
                    <span className="text-sm text-green-500 font-medium">82.1%</span>
                  </div>
                </div>
                
                <div className="bg-[#222222] rounded-lg p-4 border border-[#333333]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-lg mr-3">🥉</span>
                      <div>
                        <div className="font-medium text-white">CryptoKing</div>
                        <div className="text-sm text-[#a0a0a0]">+$6,780</div>
                      </div>
                    </div>
                    <span className="text-sm text-green-500 font-medium">78.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
