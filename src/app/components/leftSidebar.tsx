/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import Image from "next/image";
import { useAccount } from "wagmi";

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
    title: "XP Systems",
    disabled: true,
    image: "/images/leftSidebar/xp.png",
  },
  {
    title: "Earn",
    disabled: true,
    image: "/images/leftSidebar/earn.png",
  },
];

export default function LeftSidebar() {
  const { logout } = useLoginWithAbstract();
  const { isConnected } = useAccount();
  
  return (
    <nav className="h-full" role="navigation" aria-label="Main navigation">
      <div className="bg-[#1a1a1a] rounded-2xl shadow-lg border border-[#333333] h-full flex flex-col py-6 px-4">
        {/* Navigation Menu */}
        <div className="flex-1 space-y-2">
          {MENU_ITEMS.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                  item.disabled
                    ? "cursor-not-allowed opacity-50 hover:bg-[#222222]"
                    : item.title === "Pabs News"
                    ? "bg-gradient-to-r from-[#ff6b35] to-[#ff5722] text-white cursor-pointer shadow-lg shadow-orange-500/30"
                    : "hover:bg-[#222222] cursor-pointer hover:border-[#444444]"
                }`}
                role={item.disabled ? "presentation" : "button"}
                tabIndex={item.disabled ? -1 : 0}
                aria-disabled={item.disabled}
              >
                <Image
                  src={item.image}
                  height={20}
                  width={20}
                  alt={`${item.title} icon`}
                  className="flex-shrink-0"
                />
                <span className={`text-sm font-medium ${
                  item.disabled ? "text-gray-400" : "text-white"
                }`}>
                  {item.title}
                </span>
                {item.disabled && (
                  <span className="ml-auto text-xs bg-[#333333] text-[#a0a0a0] px-2 py-1 rounded-md text-[10px] font-medium">
                    Soon
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Homepage Banner */}
        <div className="mt-6">
          <div className="text-center space-y-3">
            <h3 className="text-xs font-bold text-white">
              SKIP NFT&apos;S ARE LIVE!
            </h3>
            <div className="relative rounded-lg overflow-hidden">
              <Image
                src="/images/banner2.jpeg"
                width={200}
                height={120}
                className="object-cover w-full h-auto"
                alt="Skip NFTs promotional banner"
              />
            </div>
          </div>
        </div>

        {/* Logout Section */}
        {isConnected && (
          <div className="pt-4 border-t border-[#333333]">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-3 rounded-xl w-full text-left hover:bg-[#222222] transition-colors duration-300"
              aria-label="Disconnect wallet"
            >
              <Image
                src="/images/leftSidebar/logout.png"
                height={20}
                width={20}
                alt="Logout icon"
                className="flex-shrink-0"
              />
              <span className="text-sm font-medium text-gray-300">
                Disconnect
              </span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
