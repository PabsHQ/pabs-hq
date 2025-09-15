/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

const MENU_ITEMS = [
  {
    title: "Pabs News",
    href: "/",
    disabled: false,
    image: "/images/leftSidebar/newsSelected.png",
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    disabled: false,
    image: "/images/leftSidebar/portfolio.png",
  },
  {
    title: "Alpha Toolkit",
    href: "/alpha-toolkit",
    disabled: false,
    image: "/images/leftSidebar/alpha.png",
  },
  {
    title: "Leaderboards",
    href: "/leaderboards",
    disabled: false,
    image: "/images/leftSidebar/leaderboards.png",
  },
  {
    title: "Forums",
    href: "/forums",
    disabled: false,
    image: "/images/leftSidebar/forums.png",
  },
  {
    title: "XP Systems",
    href: "/xp-systems",
    disabled: true,
    image: "/images/leftSidebar/xp.png",
  },
  {
    title: "Earn",
    href: "/earn",
    disabled: true,
    image: "/images/leftSidebar/earn.png",
  },
];

export default function LeftSidebar() {
  const { logout } = useLoginWithAbstract();
  const { isConnected } = useAccount();
  const pathname = usePathname();
  
  return (
    <nav className="h-full" role="navigation" aria-label="Main navigation">
      <div className="bg-[#1a1a1a] rounded-2xl shadow-lg border border-[#333333] h-full flex flex-col py-6 px-4">
        {/* Navigation Menu */}
        <div className="flex-1 space-y-2">
          {MENU_ITEMS.map((item: any, index: number) => {
            const isActive = pathname === item.href;
            
            if (item.disabled) {
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 cursor-not-allowed opacity-50 hover:bg-[#222222]"
                  role="presentation"
                  tabIndex={-1}
                  aria-disabled={true}
                >
                  <Image
                    src={item.image}
                    height={20}
                    width={20}
                    alt={`${item.title} icon`}
                    className="flex-shrink-0"
                  />
                  <span className="text-sm font-medium text-gray-400">
                    {item.title}
                  </span>
                  <span className="ml-auto text-xs bg-[#333333] text-[#a0a0a0] px-2 py-1 rounded-md text-[10px] font-medium">
                    Soon
                  </span>
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-[#ff6b35] to-[#ff5722] text-white cursor-pointer shadow-lg shadow-orange-500/30"
                    : "hover:bg-[#222222] cursor-pointer hover:border-[#444444]"
                }`}
                role="button"
                tabIndex={0}
                aria-current={isActive ? "page" : undefined}
              >
                <Image
                  src={item.image}
                  height={20}
                  width={20}
                  alt={`${item.title} icon`}
                  className="flex-shrink-0"
                />
                <span className="text-sm font-medium text-white">
                  {item.title}
                </span>
              </Link>
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
