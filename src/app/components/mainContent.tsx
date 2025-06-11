/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import PresaleBanner from "./banner";
import Avatar from "./avatar";
import { useEffect, useState } from "react";
import { NewsItem } from "../interfaces/newsDto.model";
import { useRouter } from 'next/navigation';
import Spinner from "./spinner";

export default function MainContent() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [showLikeButton, setShowLikeButton] = useState<number>(-1);
  const router = useRouter();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/getNews");
        const data = await res.json();
        console.log(data, "lol");
        if (res.ok) {
          setNewsItems(data.news);
        } else {
          console.error("❌ Error fetching news:", data.error);
        }
      } catch (err) {
        console.error("❌ Fetch failed:", err);
      }
    };
    fetchNews();
  }, []);

  const handleLikesDisplay = (id: number) => {
    // handle likes
    setShowLikeButton(id);
  };

  const handleTileClick = (id: string) => {
    router.push(`/news/${id}`);
  };

  const handleLikeClick = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.nativeEvent.preventDefault();
  };

  return (
    <div className="flex flex-col gap-[16px] w-full h-full min-h-0">
      <PresaleBanner />

      {/* White box layout */}
      <div className="rounded-[30px] bg-white p-[2%] flex flex-col w-full drop-shadow-[2px_2px_5px_rgba(11,15,52,0.18)] h-full min-h-0">
        {newsItems.length < 1 && <Spinner />}
        {/* Grid container with scrolling */}
        {newsItems.length > 0 && (
          <div className="grid p-[8px] gap-[18px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full overflow-y-auto min-h-0">
            {newsItems.map((item: NewsItem, id: number) => (
              <div
                onClick={() => handleTileClick(item.id)}
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-md p-[12px] min-h-[250px] cursor-pointer"
                onMouseEnter={() => handleLikesDisplay(id)}
                onMouseLeave={() => setShowLikeButton(-1)}
              >
                <div className="w-full h-[143px] xl:h-[160px] relative">
                  <Image
                    src={item.banner}
                    alt="Article preview"
                    fill
                    className="object-cover rounded-[8px] object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  {showLikeButton === id && (
                    <div
                      className="absolute top-[8px] right-[8px] bg-[#7e8180]/90 rounded-full p-[4px] shadow-md transition-all duration-300 hover:scale-115"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Like clicked");
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
                <div className="flex flex-col gap-[10px] justify-start items-start mt-[10px]">
                  <span
                    className={`inline-block shadow-lg text-[10px] px-[18px] py-[4px] font-semibold ${
                      item.newsType === "lore"
                        ? "bg-[#FF937A]"
                        : item.newsType === "theBuzz"
                        ? "bg-[#FFD46F]"
                        : item.newsType === "chainNews"
                        ? "bg-[#1BFE90]"
                        : "bg-[#FF937A]"
                    } text-white rounded-full uppercase`}
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
                  <span className="font-semibold text-black text-[18px] line-clamp-2">
                    {item.title}
                  </span>
                  <Avatar
                    small
                    image={item.editor.avatarUrl}
                    headerText={item.editor.username}
                    subText={item.editor.usernameSubtitle}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
