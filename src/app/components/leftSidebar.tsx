/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";

const MENU_ITEMS = [
  {
    title: "Pabs News",
    disabled: false,
    image: "/images/leftSidebar/newsSelected.png",
  },
  {
    title: "Portfolio",
    disabled: true,
    image: "/images/leftSidebar/portfolio.png",
  },
  {
    title: "Alpha Toolkit",
    disabled: true,
    image: "/images/leftSidebar/alpha.png",
  },
  {
    title: "Leaderboards",
    disabled: true,
    image: "/images/leftSidebar/leaderboards.png",
  },
  {
    title: "Forums",
    disabled: true,
    image: "/images/leftSidebar/forums.png",
  },
  {
    title: "Earn",
    disabled: true,
    image: "/images/leftSidebar/earn.png",
  },
  {
    title: "XP",
    disabled: true,
    image: "/images/leftSidebar/xp.png",
  },
];

export default function LeftSidebar() {
  const [homepageBanner, setHomepageBanner] = useState<string>("");
  const { login } = useLoginWithAbstract();
  const { address, isConnected, isConnecting } = useAccount();

  useEffect(() => {
    const fetchHomepageBanner = async () => {
      try {
        const res = await fetch("/api/uploadHomepageBanner");
        const data = await res.json();
        if (data.url) {
          setHomepageBanner(data.url);
        }
      } catch (err) {
        console.error("❌ Error fetching homepage banner:", err);
      }
    };

    fetchHomepageBanner();
  }, []);

  const logout = () => {
    // Add logout logic here if needed
    console.log("Logout clicked");
  };

  return (
    <div className="flex-[0.2] h-full min-w-[297px]">
      <div className="flex flex-col h-full w-full gap-3">
        <div className="flex-[0.9] flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            {MENU_ITEMS.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex gap-6 justify-start items-center cursor-pointer p-4 self-start hover-scale rounded-lg transition-all duration-300 ${
                    item.disabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Image
                    src={item.image}
                    height={24}
                    width={24}
                    alt={item.title}
                  />
                  <span className="text-xl text-gray-500 dark:text-gray-400 self-start font-medium">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Homepage Banner */}
          {homepageBanner && (
            <div className="mt-6 mb-4">
              <Image
                src={homepageBanner}
                alt="Homepage Banner"
                width={250}
                height={150}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}

          {isConnected ? (
            <div
              className="flex gap-6 justify-start items-center cursor-pointer p-4 self-start hover-scale rounded-lg transition-all duration-300"
              onClick={logout}
            >
              <Image
                src={"/images/leftSidebar/logout.png"}
                height={24}
                width={24}
                alt="logout"
              ></Image>
              <span className="text-xl text-gray-500 dark:text-gray-400 self-start font-medium">
                Disconnect
              </span>
            </div>
          ) : (
            <div className="flex w-full gap-6 justify-start items-center cursor-pointer p-4"></div>
          )}
        </div>
      </div>
    </div>
  );
}
