/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import PresaleBanner from "./banner";
import Avatar from "./avatar";
import { useEffect, useState } from "react";
import { NewsItem } from "../interfaces/newsDto.model";
import Link from "next/link";
import Spinner from "./spinner";

export default function MainContent() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [showLikeButton, setShowLikeButton] = useState<number>(-1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/getNews");
        const data = await res.json();
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
              <Link key={id} href={`/news/${item.id}`}>
                <div
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
                      <div className="absolute top-[8px] right-[8px] bg-[#7e8180]/90 rounded-full p-[4px] shadow-md transition-all duration-300 hover:scale-115">
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
                    <span className="inline-block text-[10px] px-[8px] py-[4px] font-semibold bg-orange-100 text-orange-700 rounded-full uppercase">
                      {item.newsType}
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
