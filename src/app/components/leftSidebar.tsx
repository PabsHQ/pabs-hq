/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="flex-[0.2] h-full min-w-[255px]">
      <div className="flex flex-col h-full w-full gap-3">
        <div className="sidebar-card flex-[1] overflow-y-auto w-full flex flex-col h-full w-full justify-between items-center pl-[8%] py-7 gap-5">
          <Link href="/" className="self-start">
            <Image
              src="/images/pabsLogo.png"
              className="cursor-pointer self-start"
              width={125}
              height={28}
              alt="Sidebar placeholder"
            />
          </Link>
          <div className="flex flex-col w-full gap-6 justify-start items-center">
            {MENU_ITEMS.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex gap-6 rounded-l-lg p-4 w-full transition-all duration-300 hover-lift ${
                    item.disabled
                      ? "cursor-not-allowed opacity-60"
                      : "bg-gradient-to-r from-green-400 to-emerald-400 cursor-pointer shadow-md"
                  }`}
                >
                  <Image
                    src={item.image}
                    height={24}
                    width={24}
                    alt="news"
                    style={{ objectFit: "contain" }}
                  />
                  <span
                    className={`text-xl font-semibold ${
                      item.disabled ? "text-gray-500" : "text-white"
                    }`}
                  >
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>

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
              <span className="text-xl text-gray-500 self-start font-medium">
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
