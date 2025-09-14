/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Avatar from "./avatar";
import { useEffect, useRef, useState } from "react";
import { NewsItem } from "../interfaces/newsDto.model";
import Spinner from "./spinner";
import FilterSwiper from "./filterSwiper";
import Link from "next/link";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";

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
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  // Wallet connection for header
  const { login } = useLoginWithAbstract();
  const { address, isConnected, isConnecting } = useAccount();

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
      {/* Header with Categories and Wallet */}
      <div className="flex justify-between items-center w-full">
        {/* Categories Filter */}
        <div className="flex-1" ref={containerRef}>
          <FilterSwiper
            categories={categories}
            selectedNewsType={selectedNewsType}
            selectNewsType={(e: string) => selectNewsType(e)}
            containerWidth={containerWidth}
          />
        </div>
        
        {/* Wallet Connection */}
        <div
          className={`text-black hover:text-white h-12 px-4 bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ${
            isConnected ? "justify-start" : "justify-center"
          } items-center text-center cursor-pointer flex min-w-[200px]`}
          onClick={() => {
            if (!isConnected && !isConnecting) {
              login();
            }
          }}
        >
          {isConnecting && !isConnected && <Spinner />}
          {!isConnected && !isConnecting && <span className="font-semibold">Connect Wallet</span>}
          {isConnected && (
            <div className="flex flex-col w-full h-full gap-1 items-start justify-start">
              <span className="text-gray-600 font-bold text-xs text-start">
                Wallet Connected
              </span>
              <div className="flex w-full h-full gap-2 items-center text-xs">
                <span>
                  {address?.substring(0, 4) +
                    "........" +
                    address?.substring(address.length - 4)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 overflow-y-auto">
        {newsItems.length < 1 && <Spinner />}
        
        {/* Featured Article */}
        {displayNews.length > 0 && displayNews[0] && (
          <div className="w-full mb-8">
            <Link
              href={`/news/${displayNews[0].id}`}
              className="block group"
              onMouseEnter={() => handleLikesDisplay(0)}
              onMouseLeave={() => setShowLikeButton(-1)}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.01] border border-gray-200">
                <div className="relative h-96">
                  <Image
                    src={displayNews[0].banner}
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
                      className={`inline-block px-4 py-2 text-sm font-bold text-white rounded-full ${getCategoryStyle(displayNews[0].newsType)}`}
                    >
                      {getCategoryLabel(displayNews[0].newsType)}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                    {displayNews[0].title}
                  </h2>
                  <div className="flex items-center space-x-3">
                    <Avatar
                      small
                      image={displayNews[0].editor.avatarUrl}
                      headerText={displayNews[0].editor.username}
                      banner={false}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Articles Grid */}
        {displayNews.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayNews.slice(1).map((item: NewsItem, id: number) => (
              <Link
                href={`/news/${item.id}`}
                key={item.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                onMouseEnter={() => handleLikesDisplay(id + 1)}
                onMouseLeave={() => setShowLikeButton(-1)}
              >
                <div className="w-full relative h-48">
                  <Image
                    src={item.banner}
                    alt="Article preview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {showLikeButton === id + 1 && (
                    <div
                      className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-lg hover:scale-110 border border-gray-200 transition-all duration-300"
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
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="mt-auto">
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
        )}
      </div>
    </div>
  );
}
