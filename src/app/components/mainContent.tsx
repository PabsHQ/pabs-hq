/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import PresaleBanner from "./banner";
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

  return (
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
    </div>
  );
}
