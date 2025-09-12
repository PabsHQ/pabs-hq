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
    <div className="flex flex-col gap-4 w-full h-full min-h-0">
      <PresaleBanner banner={banner} />
      {/* White box layout */}
      <div
        className="sidebar-card p-[2%] flex flex-col w-full h-full min-h-0 gap-4"
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
        {/* Grid container with scrolling */}
        {newsItems.length > 0 && (
          <div className="grid p-2 gap-5 grid-cols-[repeat(auto-fit,minmax(230px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] w-full overflow-y-auto min-h-0">
            {(selectedNewsType === "" ? newsItems : filteredNews).map(
              (item: NewsItem, id: number) => (
                <Link
                  href={`/news/${item.id}`}
                  key={item.id}
                  className="news-card interactive-card xl:max-w-[450px] min-h-[310px] xl:min-h-[250px] cursor-pointer flex flex-col gap-2 fade-in"
                  onMouseEnter={() => handleLikesDisplay(id)}
                  onMouseLeave={() => setShowLikeButton(-1)}
                >
                  <div className="w-full relative flex-grow">
                    <Image
                      src={item.banner}
                      alt="Article preview"
                      layout="fill"
                      className="rounded-3xl p-2 block relative object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                    {showLikeButton === id && (
                      <div
                        className="absolute top-2 right-2 bg-gray-800/90 rounded-full p-1 shadow-md hover-scale"
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
                  <div className="flex flex-col gap-2 justify-start items-start p-2">
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
                    <span className="font-semibold text-black relative overflow-hidden text-ellipsis whitespace-nowrap w-full">
                      {item.title}
                    </span>
                    <Avatar
                      small
                      image={item.editor.avatarUrl}
                      headerText={item.editor.username}
                      banner={false}
                    />
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
