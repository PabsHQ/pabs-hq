/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Avatar from "./avatar";
import { useEffect, useState } from "react";
import { NewsItem } from "../interfaces/newsDto.model";
import Spinner from "./spinner";
import FilterSwiper from "./filterSwiper";
import Link from "next/link";

interface NewsPageProps {
  news: NewsItem[];
}

export default function MainContent({ news }: NewsPageProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedNewsType, setSelectedNewsType] = useState<string>("");
  const [showLikeButton, setShowLikeButton] = useState<number>(-1);
  const [categories, setCategories] = useState<string[]>([]);

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
    const filteredNews = newsItems.filter(
      (n) => n.newsType === selectedNewsType
    );
    setFilteredNews(filteredNews);
  }, [selectedNewsType, newsItems]);

  const handleLikesDisplay = (id: number) => {
    setShowLikeButton(id);
  };

  const handleLikeClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.preventDefault();
  };

  const selectNewsType = (text: string) => {
    if (selectedNewsType === text) setSelectedNewsType("");
    else setSelectedNewsType(text);
  };

  const displayNews = selectedNewsType === "" ? newsItems : filteredNews;
  const featuredNews = displayNews[0];
  const regularNews = displayNews.slice(1);

  return (
    <div className="w-full">
      {/* Filter Swiper */}
      <div className="mb-8">
        <FilterSwiper
          categories={categories}
          selectedNewsType={selectedNewsType}
          selectNewsType={(e: string) => selectNewsType(e)}
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
                        className={`inline-block px-3 py-1.5 text-xs font-semibold text-white rounded-lg shadow-lg ${
                          featuredNews.newsType === "lore"
                            ? "bg-gradient-to-r from-orange-500 to-orange-600"
                            : featuredNews.newsType === "theBuzz"
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                            : featuredNews.newsType === "chainNews"
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : featuredNews.newsType === "trenches"
                            ? "bg-gradient-to-r from-red-500 to-red-600"
                            : "bg-gradient-to-r from-purple-500 to-purple-600"
                        }`}
                      >
                        {featuredNews.newsType === "chainNews"
                          ? "Chain News"
                          : featuredNews.newsType === "theBuzz"
                          ? "The Buzz"
                          : featuredNews.newsType === "trenches"
                          ? "Trenches"
                          : featuredNews.newsType === "lore"
                          ? "Lore"
                          : "Playbook"}
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
                    {/* Like Button - Bottom Right */}
                    {showLikeButton === 0 && (
                      <div
                        className="absolute bottom-4 right-4 bg-white/90 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                        onClick={(e) => handleLikeClick(e)}
                      >
                        <Image
                          src="/images/heartIcon.png"
                          alt="Like"
                          width={18}
                          height={18}
                        />
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
                        className={`inline-block px-2.5 py-1 text-xs font-semibold text-white rounded-lg shadow-lg ${
                          item.newsType === "lore"
                            ? "bg-gradient-to-r from-orange-500 to-orange-600"
                            : item.newsType === "theBuzz"
                            ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                            : item.newsType === "chainNews"
                            ? "bg-gradient-to-r from-green-500 to-green-600"
                            : item.newsType === "trenches"
                            ? "bg-gradient-to-r from-red-500 to-red-600"
                            : "bg-gradient-to-r from-purple-500 to-purple-600"
                        }`}
                      >
                        {item.newsType === "chainNews"
                          ? "Chain News"
                          : item.newsType === "theBuzz"
                          ? "The Buzz"
                          : item.newsType === "trenches"
                          ? "Trenches"
                          : item.newsType === "lore"
                          ? "Lore"
                          : "Playbook"}
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
                    {/* Like Button - Bottom Right */}
                    {showLikeButton === id + 1 && (
                      <div
                        className="absolute bottom-3 right-3 bg-white/90 rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110"
                        onClick={(e) => handleLikeClick(e)}
                      >
                        <Image
                          src="/images/heartIcon.png"
                          alt="Like"
                          width={14}
                          height={14}
                        />
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
    </div>
  );
}