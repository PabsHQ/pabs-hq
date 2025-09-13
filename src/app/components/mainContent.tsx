/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Avatar from "./avatar";
import { useEffect, useRef, useState } from "react";
import { NewsItem } from "../interfaces/newsDto.model";
import Spinner from "./spinner";
import FilterSwiper from "./filterSwiper";
import Link from "next/link";

interface NewsPageProps {
  news: NewsItem[];
  banner: string;
}

export default function MainContent({ news, banner }: NewsPageProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedNewsType, setSelectedNewsType] = useState<string>("");
  const [showLikeButton, setShowLikeButton] = useState<number>(-1);
  const [categories, setCategories] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!news) return;
    setNewsItems(news);
    const uniqueCategories = [
      ...new Set(news.map((element) => element.newsType)),
    ];
    setCategories(uniqueCategories);
  }, [news]);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    measure();
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (selectedNewsType === "") {
      setFilteredNews([]);
      return;
    }
    const filteredNews = newsItems.filter(
      (n) => n.newsType === selectedNewsType
    );
    setFilteredNews(filteredNews);
  }, [selectedNewsType]);

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
          containerWidth={containerWidth}
        />
      </div>

      {newsItems.length < 1 && (
        <div className="flex justify-center py-12">
          <Spinner />
        </div>
      )}

      {/* News Grid with Mixed Hierarchy */}
      {newsItems.length > 0 && (
        <div className="space-y-8" ref={containerRef}>
          {/* Featured Card - Full Width */}
          {featuredNews && (
            <div className="w-full">
              <Link
                href={`/news/${featuredNews.id}`}
                className="block group"
                onMouseEnter={() => handleLikesDisplay(0)}
                onMouseLeave={() => setShowLikeButton(-1)}
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="relative h-80">
                    <Image
                      src={featuredNews.banner}
                      alt="Featured article"
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority
                    />
                    {showLikeButton === 0 && (
                      <div
                        className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110"
                        onClick={(e) => handleLikeClick(e)}
                      >
                        <Image
                          src="/images/heartIcon.png"
                          alt="Like"
                          width={20}
                          height={20}
                        />
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4">
                      <span
                        className={`inline-block px-4 py-2 text-sm font-bold text-white rounded-full ${
                          featuredNews.newsType === "lore"
                            ? "bg-orange-500"
                            : featuredNews.newsType === "theBuzz"
                            ? "bg-yellow-500"
                            : featuredNews.newsType === "chainNews"
                            ? "bg-green-500"
                            : "bg-orange-500"
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
                  </div>
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                      {featuredNews.title}
                    </h2>
                    <div className="flex items-center space-x-3">
                      <Avatar
                        small
                        image={featuredNews.editor.avatarUrl}
                        headerText={featuredNews.editor.username}
                        banner={false}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Regular News Grid - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {regularNews.map((item: NewsItem, id: number) => (
              <Link
                href={`/news/${item.id}`}
                key={item.id}
                className="block group"
                onMouseEnter={() => handleLikesDisplay(id + 1)}
                onMouseLeave={() => setShowLikeButton(-1)}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105 h-full">
                  <div className="relative h-48">
                    <Image
                      src={item.banner}
                      alt="Article preview"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {showLikeButton === id + 1 && (
                      <div
                        className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-md transition-all duration-300 hover:scale-110"
                        onClick={(e) => handleLikeClick(e)}
                      >
                        <Image
                          src="/images/heartIcon.png"
                          alt="Like"
                          width={16}
                          height={16}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full mb-3 ${
                        item.newsType === "lore"
                          ? "bg-orange-500"
                          : item.newsType === "theBuzz"
                          ? "bg-yellow-500"
                          : item.newsType === "chainNews"
                          ? "bg-green-500"
                          : "bg-orange-500"
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
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Avatar
                        small
                        image={item.editor.avatarUrl}
                        headerText={item.editor.username}
                        banner={false}
                      />
                    </div>
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