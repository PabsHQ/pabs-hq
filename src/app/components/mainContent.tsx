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
}

export default function MainContent({ news }: NewsPageProps) {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [selectedNewsType, setSelectedNewsType] = useState<string>("");
  const [showLikeButton, setShowLikeButton] = useState<number>(-1);
  const [categories, setCategories] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div className="w-full">
      {/* Sticky Categories Section */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm mb-6">
        <div className="px-4 py-4">
          <FilterSwiper
            categories={categories}
            selectedNewsType={selectedNewsType}
            selectNewsType={(e: string) => selectNewsType(e)}
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="w-full">
        {newsItems.length < 1 && (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        )}

        {newsItems.length > 0 && (
          <div 
            className="grid w-full"
            style={{
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
            }}
            ref={containerRef}
          >
            {(selectedNewsType === "" ? newsItems : filteredNews).map(
              (item: NewsItem, id: number) => (
                <Link
                  href={`/news/${item.id}`}
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer flex flex-col fade-in hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                  onMouseEnter={() => handleLikesDisplay(id)}
                  onMouseLeave={() => setShowLikeButton(-1)}
                >
                  <div className="w-full relative mb-4" style={{ height: '200px' }}>
                    <Image
                      src={item.banner}
                      alt="Article preview"
                      fill
                      className="rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                    {showLikeButton === id && (
                      <div
                        className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-md hover-scale border border-gray-200"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleLikeClick(e);
                        }}
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
                  <div className="flex flex-col justify-start items-start">
                    <span
                      className={`category-badge ${
                        item.newsType === "lore"
                          ? "lore"
                          : item.newsType === "theBuzz"
                          ? "buzz"
                          : item.newsType === "chainNews"
                          ? "chain-news"
                          : item.newsType === "trenches"
                          ? "trenches"
                          : "playbook"
                      }`}
                    >
                      {item.newsType === "chainNews"
                        ? "chain news"
                        : item.newsType === "theBuzz"
                        ? "the buzz"
                        : item.newsType === "trenches"
                        ? "trenches"
                        : item.newsType === "lore"
                        ? "lore"
                        : "playbook"}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 mt-2 line-clamp-2 group-hover:text-green-600 transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-sm text-gray-600">
                      <Avatar
                        small
                        image={item.editor.avatarUrl}
                        headerText={item.editor.username}
                        banner={false}
                      />
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
