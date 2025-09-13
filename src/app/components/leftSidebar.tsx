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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col py-6 px-4">
        {/* Navigation Menu */}
        <div className="flex-1 space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 mb-4">
            Navigation
          </h2>
          {MENU_ITEMS.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  item.disabled
                    ? "cursor-not-allowed opacity-50"
                    : "bg-gradient-to-r from-green-400 to-green-500 text-white cursor-pointer hover:from-green-500 hover:to-green-600 shadow-sm"
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
                  <span className="ml-auto text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                    Soon
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Logout Section */}
        {isConnected && (
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-3 rounded-xl w-full text-left hover:bg-gray-50 transition-colors duration-200"
              aria-label="Disconnect wallet"
            >
              <Image
                src="/images/leftSidebar/logout.png"
                height={20}
                width={20}
                alt="Logout icon"
                className="flex-shrink-0"
              />
              <span className="text-sm font-medium text-gray-600">
                Disconnect
              </span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
