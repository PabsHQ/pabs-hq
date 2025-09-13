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

  const displayNews = selectedNewsType === "" ? newsItems : filteredNews;
  
  // Get staff picks - top 4 articles for the horizontal bar
  const staffPicks = displayNews.slice(0, 4);
  // Get regular news starting from index 4
  const regularNews = displayNews.slice(4);

  const getCategoryStyle = (newsType: string) => {
    switch (newsType) {
      case "lore":
        return "bg-orange-500";
      case "theBuzz":
        return "bg-yellow-500";
      case "chainNews":
        return "bg-green-500";
      case "trenches":
        return "bg-orange-500";
      case "playbook":
        return "bg-blue-500";
      default:
        return "bg-orange-500";
    }
  };

  const getCategoryLabel = (newsType: string) => {
    switch (newsType) {
      case "chainNews":
        return "Chain News";
      case "theBuzz":
        return "The Buzz";
      case "trenches":
        return "Trenches";
      case "lore":
        return "Lore";
      case "playbook":
        return "Playbook";
      default:
        return "News";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full min-h-0">
      <PresaleBanner banner={banner} />
      {/* White box layout */}
      <div
        className="sidebar-card p-[2%] flex flex-col w-full h-full min-h-0 gap-6"
        ref={containerRef}
      >
        <div className="flex w-full">
          <FilterSwiper
            categories={categories}
            selectedNewsType={selectedNewsType}
            selectNewsType={(e: string) => selectNewsType(e)}
            containerWidth={containerWidth}
          />
        </div>

        {newsItems.length < 1 && <Spinner />}
        
        {/* Main Articles Grid - More balanced layout */}
        {newsItems.length > 0 && displayNews.length > 0 && (
          <div className="w-full overflow-y-auto min-h-0">
            <div 
              className="grid w-full"
              style={{
                gap: 'var(--card-gap-y) var(--card-gap-x)',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
              }}
            >
              {displayNews.slice(0, 6).map((item: NewsItem, id: number) => (
                <Link
                  href={`/news/${item.id}`}
                  key={item.id}
                  className={`bg-white border border-gray-200 rounded-2xl overflow-hidden cursor-pointer flex flex-col fade-in hover:shadow-xl hover:border-gray-300 transition-all duration-300 group ${
                    id === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                  onMouseEnter={() => handleLikesDisplay(id)}
                  onMouseLeave={() => setShowLikeButton(-1)}
                >
                  <div className={`w-full relative ${id === 0 ? 'h-80' : 'h-48'}`}>
                    <Image
                      src={item.banner}
                      alt="Article preview"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes={id === 0 ? "100vw" : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
                      priority={id < 3}
                    />
                    {showLikeButton === id && (
                      <div
                        className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-lg hover-scale border border-gray-200 transition-all duration-300"
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
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full ${getCategoryStyle(item.newsType)}`}
                      >
                        {getCategoryLabel(item.newsType)}
                      </span>
                    </div>
                  </div>
                  <div className={`flex flex-col justify-start items-start ${id === 0 ? 'p-6' : 'p-4'}`}>
                    <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors ${
                      id === 0 ? 'text-2xl line-clamp-3' : 'text-lg line-clamp-2'
                    }`}>
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
                </Link>
              ))}
            </div>

            {/* Staff Picks Horizontal Bar - After first 6 articles */}
            {displayNews.length > 6 && (
              <div className="mt-8 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Staff Picks</h2>
                  <div className="h-px bg-gradient-to-r from-green-400 to-transparent flex-1 ml-4"></div>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {displayNews.slice(6, 10).map((item: NewsItem, id: number) => (
                    <Link
                      href={`/news/${item.id}`}
                      key={item.id}
                      className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                      onMouseEnter={() => handleLikesDisplay(id + 6)}
                      onMouseLeave={() => setShowLikeButton(-1)}
                    >
                      <div className="w-full relative h-32">
                        <Image
                          src={item.banner}
                          alt="Staff pick preview"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                        <div className="absolute bottom-2 left-2">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-bold text-white rounded-full ${getCategoryStyle(item.newsType)}`}
                          >
                            {getCategoryLabel(item.newsType)}
                          </span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="text-sm font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <Avatar
                          small
                          image={item.editor.avatarUrl}
                          headerText={item.editor.username}
                          banner={false}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Remaining Articles Grid */}
            {displayNews.length > 10 && (
              <div 
                className="grid w-full mt-6"
                style={{
                  gap: 'var(--card-gap-y) var(--card-gap-x)',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
                }}
              >
                {displayNews.slice(10).map((item: NewsItem, id: number) => (
                  <Link
                    href={`/news/${item.id}`}
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer flex flex-col fade-in hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                    onMouseEnter={() => handleLikesDisplay(id + 10)}
                    onMouseLeave={() => setShowLikeButton(-1)}
                  >
                    <div className="w-full relative h-48">
                      <Image
                        src={item.banner}
                        alt="Article preview"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {showLikeButton === id + 10 && (
                        <div
                          className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-md hover-scale border border-gray-200"
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
                      <div className="absolute bottom-2 left-2">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-bold text-white rounded-full ${getCategoryStyle(item.newsType)}`}
                        >
                          {getCategoryLabel(item.newsType)}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <Avatar
                        small
                        image={item.editor.avatarUrl}
                        headerText={item.editor.username}
                        banner={false}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
