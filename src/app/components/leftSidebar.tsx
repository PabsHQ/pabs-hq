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
      <div className="flex flex-col h-full w-full gap-[12px]">
        <div className="flex-[1] overflow-y-auto w-full rounded-[30px] bg-white flex flex-col h-full w-full justify-between items-center pl-[8%] py-[28px] drop-shadow-[2px_2px_5px_rgba(11,15,52,0.18)] gap-[20px]">
          <Link href="/" className="self-start">
            <Image
              src="/images/pabsLogo.png"
              className="cursor-pointer self-start"
              width={125}
              height={28}
              alt="Sidebar placeholder"
            />
          </Link>
          <div className="flex flex-col w-full gap-[24px] justify-start items-center">
            {MENU_ITEMS.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`flex gap-[24px] rounded-l-[8px] p-[16px] w-full ${
                    item.disabled
                      ? "cursor-not-allowed"
                      : "bg-[#3EEE99] cursor-pointer"
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
                    className={`text-[22px] ${
                      item.disabled ? "text-[#84828A]" : "text-white"
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
              className="flex gap-[24px] justify-start items-center cursor-pointer p-[16px] self-start"
              onClick={logout}
            >
              <Image
                src={"/images/leftSidebar/logout.png"}
                height={24}
                width={24}
                alt="logout"
              ></Image>
              <span className="text-[22px] text-[#84828A] self-start">
                Disconnect
              </span>
            </div>
          ) : (
            <div className="flex w-full gap-[24px] justify-start items-center cursor-pointer p-[16px]"></div>
          )}
        </div>
      </div>
    </div>
  );
}
