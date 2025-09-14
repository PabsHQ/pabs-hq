"use client";

import { useState, useEffect, useRef } from "react";
import { NewsItem } from "../interfaces/newsDto.model";
import Header from "./header";
import LeftSidebar from "./leftSidebar";
import MainContent from "./mainContent";

interface PageWrapperProps {
  news: NewsItem[];
}

export default function PageWrapper({ news }: PageWrapperProps) {
  const [selectedNewsType, setSelectedNewsType] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  useEffect(() => {
    const uniqueCategories = [...new Set(news.map((element) => element.newsType))];
    setCategories(uniqueCategories);
  }, [news]);

  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        setContainerWidth(headerRef.current.offsetWidth);
      }
    };

    measure();
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("resize", measure);
    };
  }, []);

  const selectNewsType = (text: string) => {
    if (selectedNewsType === text) setSelectedNewsType("");
    else setSelectedNewsType(text);
  };

  return (
    <div className="min-h-screen w-screen">
      {/* Header */}
      <Header 
        categories={categories}
        selectedNewsType={selectedNewsType}
        selectNewsType={selectNewsType}
        containerWidth={containerWidth}
        ref={headerRef}
      />
      
      {/* Main Layout */}
      <div className="pt-20 min-h-[calc(100vh-5rem)]">
        {/* Desktop display */}
        <div className="lg:flex gap-4 flex-row w-full min-h-full hidden p-5">
          {/* Left Sidebar */}
          <LeftSidebar />

          {/* Main Content - Extended to right edge */}
          <div className="flex-1 pr-5">
            <MainContent news={news} selectedNewsType={selectedNewsType} />
          </div>
        </div>

        {/* Mobile display */}
        <div className="lg:hidden gap-4 flex-row w-full min-h-full flex p-5">
          {/* Main Content */}
          <div className="flex-1 pr-5">
            <MainContent news={news} selectedNewsType={selectedNewsType} />
          </div>
        </div>
      </div>
    </div>
  );
}
