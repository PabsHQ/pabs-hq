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
<<<<<<< Current (Your changes)
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
=======
    <div className="flex flex-col space-y-6 h-full">
      {/* Banner */}
      <PresaleBanner banner={banner} />
      
      {/* News Content */}
      <div
        className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 min-h-0 overflow-hidden"
        ref={containerRef}
      >
        <div className="p-6 h-full flex flex-col space-y-6">
          {/* Filter Section */}
          <div className="flex-shrink-0">
            <FilterSwiper
              categories={categories}
              selectedNewsType={selectedNewsType}
              selectNewsType={(e: string) => selectNewsType(e)}
              containerWidth={containerWidth}
            />
          </div>

          {/* Loading State */}
          {newsItems.length < 1 && (
            <div className="flex-1 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          
          {/* News Grid */}
          {newsItems.length > 0 && (
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {(selectedNewsType === "" ? newsItems : filteredNews).map(
                  (item: NewsItem, id: number) => (
                    <article
                      key={item.id}
                      className="group"
                    >
                      <Link
                        href={`/news/${item.id}`}
                        className="block bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] h-full"
                        onMouseEnter={() => handleLikesDisplay(id)}
                        onMouseLeave={() => setShowLikeButton(-1)}
                      >
                        {/* Article Image */}
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={item.banner}
                            alt={`${item.title} preview image`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                          
                          {/* Like Button */}
                          {showLikeButton === id && (
                            <button
                              className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleLikeClick(e);
                              }}
                              aria-label={`Like ${item.title}`}
                            >
                              <Image
                                src="/images/heartIcon.png"
                                alt="Like icon"
                                width={16}
                                height={16}
                              />
                            </button>
                          )}
                          
                          {/* Category Badge */}
                          <div className="absolute bottom-3 left-3">
                            <span
                              className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full shadow-lg ${
                                item.newsType === "lore"
                                  ? "bg-orange-400"
                                  : item.newsType === "theBuzz"
                                  ? "bg-yellow-400"
                                  : item.newsType === "chainNews"
                                  ? "bg-green-400"
                                  : "bg-orange-400"
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
                        </div>
                        
                        {/* Article Content */}
                        <div className="p-4 space-y-3">
                          <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm leading-5">
                            {item.title}
                          </h3>
                          
                          {/* Author */}
                          <div className="pt-2">
                            <Avatar
                              small
                              image={item.editor.avatarUrl}
                              headerText={item.editor.username}
                              banner={false}
                            />
                          </div>
                        </div>
                      </Link>
                    </article>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>
>>>>>>> Incoming (Background Agent changes)
    </div>
  );
}
