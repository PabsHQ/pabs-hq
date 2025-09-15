/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { NewsItem } from "../interfaces/newsDto.model";
import Spinner from "./spinner";
import FilterSwiper from "./filterSwiper";
import Link from "next/link";
import LikeButton from "./likeButton";
import CommentButton from "./commentButton";
import { useAccount } from "wagmi";

interface NewsPageProps {
  news: NewsItem[];
}

export default function MainContent({ news }: NewsPageProps) {
  const { isConnected } = useAccount();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedNewsType, setSelectedNewsType] = useState<string>("");
  const [showLikeButton, setShowLikeButton] = useState<number>(-1);
  const [categories, setCategories] = useState<string[]>([]);
  const [openComments, setOpenComments] = useState<string | null>(null);

  useEffect(() => {
    if (!news) return;
    setNewsItems(news);
    const uniqueCategories = [
      ...new Set(news.map((element) => element.newsType)),
    ];
    setCategories(uniqueCategories);
  }, [news]);

  useEffect(() => {
    if (selectedNewsType === "") {
      setFilteredNews([]);
      return;
    }
    const filtered = newsItems.filter(
      (n) => n.newsType === selectedNewsType
    );
    setFilteredNews(filtered);
  }, [selectedNewsType, newsItems]);

  const handleLikesDisplay = (id: number) => {
    setShowLikeButton(id);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.preventDefault();
  };

  const selectNewsType = (text: string) => {
    if (selectedNewsType === text) setSelectedNewsType("");
    else setSelectedNewsType(text);
  };

  // Simple like handler - just logs for now
  const handleLike = (articleId: string) => {
    console.log("Like clicked for article:", articleId);
    // TODO: Add actual like functionality later
  };

  const handleToggleComments = (articleId: string) => {
    setOpenComments(openComments === articleId ? null : articleId);
  };

  const displayNews = selectedNewsType === "" ? newsItems : filteredNews;
  const featuredNews = displayNews[0];
  const regularNews = displayNews.slice(1);

  // Helper function to get category display name
  const getCategoryDisplayName = (newsType: string) => {
    const categoryMap: { [key: string]: string } = {
      chainNews: "Chain News",
      theBuzz: "The Buzz",
      trenches: "Trenches",
      lore: "Lore",
      playbook: "Playbook"
    };
    return categoryMap[newsType] || "News";
  };

  // Helper function to get category color
  const getCategoryColor = (newsType: string) => {
    const colorMap: { [key: string]: string } = {
      lore: "bg-gradient-to-r from-orange-500 to-orange-600",
      theBuzz: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      chainNews: "bg-gradient-to-r from-green-500 to-green-600",
      trenches: "bg-gradient-to-r from-red-500 to-red-600",
      playbook: "bg-gradient-to-r from-purple-500 to-purple-600"
    };
    return colorMap[newsType] || "bg-gradient-to-r from-gray-500 to-gray-600";
  };

  return (
    <div className="w-full">
      {/* Filter Swiper */}
      <div className="mb-8">
        <FilterSwiper
          categories={categories}
          selectedNewsType={selectedNewsType}
          selectNewsType={selectNewsType}
        />
      </div>

      {newsItems.length < 1 && (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      )}

      {/* News Grid with Mixed Hierarchy */}
      {newsItems.length > 0 && (
        <div className="space-y-8">
          {/* Featured Card - Full Width */}
          {featuredNews && (
            <div className="w-full">
              <Link
                href={`/news/${featuredNews.id}`}
                className="block group"
                onMouseEnter={() => handleLikesDisplay(0)}
                onMouseLeave={() => setShowLikeButton(-1)}
              >
                <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.01] border border-[#333333]">
                  <div className="relative h-72">
                    <Image
                      src={featuredNews.banner}
                      alt="Featured article"
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                    {/* Category Badge - Top Left */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`inline-block px-3 py-1.5 text-xs font-semibold text-white rounded-lg shadow-lg ${getCategoryColor(featuredNews.newsType)}`}
                      >
                        {getCategoryDisplayName(featuredNews.newsType)}
                      </span>
                    </div>
                    {/* Author Image - Top Right */}
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                        <Image
                          src={featuredNews.editor.avatarUrl}
                          alt={featuredNews.editor.username}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Action Buttons - Bottom Right */}
                    {(showLikeButton === 0 || isConnected) && (
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        <div
                          onClick={handleLikeClick}
                          className="bg-black/50 backdrop-blur-sm rounded-lg p-2"
                        >
                          <LikeButton
                            articleId={featuredNews.id}
                            likes={featuredNews.likes}
                            onLike={handleLike}
                          />
                        </div>
                        <div
                          onClick={handleLikeClick}
                          className="bg-black/50 backdrop-blur-sm rounded-lg p-2"
                        >
                          <CommentButton
                            articleId={featuredNews.id}
                            comments={featuredNews.comments}
                            onToggleComments={handleToggleComments}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {/* Date and Author Info */}
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-[#666666] text-xs">
                        {new Date(featuredNews.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-[#a0a0a0] text-xs font-medium">
                        {featuredNews.editor.username}
                      </span>
                    </div>
                    {/* Headline */}
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#ff6b35] transition-colors leading-tight">
                      {featuredNews.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Regular News Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((item: NewsItem, id: number) => (
              <Link
                href={`/news/${item.id}`}
                key={item.id}
                className="block group"
                onMouseEnter={() => handleLikesDisplay(id + 1)}
                onMouseLeave={() => setShowLikeButton(-1)}
              >
                <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] h-full border border-[#333333]">
                  <div className="relative h-48">
                    <Image
                      src={item.banner}
                      alt="Article preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Category Badge - Top Left */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-semibold text-white rounded-lg shadow-lg ${getCategoryColor(item.newsType)}`}
                      >
                        {getCategoryDisplayName(item.newsType)}
                      </span>
                    </div>
                    {/* Author Image - Top Right */}
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                        <Image
                          src={item.editor.avatarUrl}
                          alt={item.editor.username}
                          width={24}
                          height={24}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    {/* Action Buttons - Bottom Right */}
                    {(showLikeButton === id + 1 || isConnected) && (
                      <div className="absolute bottom-3 right-3 flex gap-2">
                        <div
                          onClick={handleLikeClick}
                          className="bg-black/50 backdrop-blur-sm rounded-lg p-1.5"
                        >
                          <LikeButton
                            articleId={item.id}
                            likes={item.likes}
                            onLike={handleLike}
                          />
                        </div>
                        <div
                          onClick={handleLikeClick}
                          className="bg-black/50 backdrop-blur-sm rounded-lg p-1.5"
                        >
                          <CommentButton
                            articleId={item.id}
                            comments={item.comments}
                            onToggleComments={handleToggleComments}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    {/* Date and Author Info */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-[#666666]">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-[#a0a0a0] font-medium">
                        {item.editor.username}
                      </span>
                    </div>
                    {/* Headline */}
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#ff6b35] transition-colors leading-tight line-clamp-3">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Simple Comment Modal Placeholder */}
      {openComments && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl border border-[#333333] w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-white">Comments</h3>
              <button
                onClick={() => setOpenComments(null)}
                className="text-[#a0a0a0] hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-[#a0a0a0] text-center py-8">
              Comment functionality coming soon!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}