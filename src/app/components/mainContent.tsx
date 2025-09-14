"use client";

import Image from "next/image";
import Avatar from "./avatar";
import { useEffect, useState } from "react";
import { NewsItem } from "../interfaces/newsDto.model";
import Spinner from "./spinner";
import Link from "next/link";

interface NewsPageProps {
  news: NewsItem[];
  selectedNewsType: string;
}

export default function MainContent({ news, selectedNewsType }: NewsPageProps) {
  const [showLikeButton, setShowLikeButton] = useState<number>(-1);

  // Filter news based on selected type
  const displayNews = selectedNewsType === "" 
    ? news 
    : news.filter(item => item.newsType === selectedNewsType);

  const handleLikesDisplay = (id: number) => {
    setShowLikeButton(id);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.preventDefault();
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
      {/* Main Content Container */}
      <div className="flex-1 overflow-y-auto">
        {news.length < 1 && <Spinner />}
        
        {/* Featured Article */}
        {displayNews.length > 0 && displayNews[0] && (
          <div className="w-full mb-8">
            <Link
              href={`/news/${displayNews[0].id}`}
              className="block group"
              onMouseEnter={() => handleLikesDisplay(0)}
              onMouseLeave={() => setShowLikeButton(-1)}
            >
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.01]">
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
                      className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-md transition-all duration-300 hover:scale-110"
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
                    <span className="inline-block px-4 py-2 text-sm font-bold text-white rounded-full bg-orange-500">
                      {getCategoryLabel(displayNews[0].newsType)}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-500 transition-colors">
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
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden cursor-pointer flex flex-col hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group"
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
                      className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 rounded-full p-2 shadow-lg hover:scale-110 border border-gray-200 dark:border-gray-600 transition-all duration-300"
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
                    <span className="inline-block px-3 py-1 text-xs font-bold text-white rounded-full bg-orange-500">
                      {getCategoryLabel(item.newsType)}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 
                    className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
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
