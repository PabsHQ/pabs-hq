/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import Avatar from "./avatar";
import { useEffect, useState } from "react";
import { NewsItem } from "../interfaces/newsDto.model";
import Spinner from "./spinner";
import Link from "next/link";

export default function RightSidebar() {
  const { login } = useLoginWithAbstract();
  const { address, isConnected, isConnecting } = useAccount();

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const res = await fetch("/api/getNews?limit=4");
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        console.log(data, "lol");
        setNews(data.news || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="flex-[0.3] h-full min-w-[297px]">
      <div className="flex flex-col h-full w-full gap-[12px]">
        <div
          className={`flex-[0.1] max-h-[62px] w-full bg-[#2B3342] rounded-[8px] p-[12px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${
            isConnected ? "justify-start" : "justify-center"
          } items-center text-center cursor-pointer flex`}
          onClick={() => {
            if (!isConnected && !isConnecting) {
              login();
            }
          }}
        >
          {isConnecting && !isConnected && <Spinner />}
          {!isConnected && !isConnecting && (
            <span className="text-[#fff]">Connect Wallet</span>
          )}
          {isConnected && (
            <div className="flex flex-col w-full h-full gap-[6px] items-start justify-start">
              <span className="text-[#A9A9A9] font-bold text-[12px] text-start">
                Wallet Connected
              </span>
              <div className="flex w-full h-full gap-[10px] items-center text-[12px]">
                <Image
                  src="/images/abstract.png"
                  height={21}
                  width={22}
                  alt="abstract"
                />
                <span>
                  {" "}
                  {address?.substring(0, 4) +
                    "........" +
                    address?.substring(address.length - 4)}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex-[1] overflow-y-hidden w-full rounded-[30px] bg-white flex flex-col h-full w-full justify-evenly items-center px-[10%] py-[28px] drop-shadow-[2px_2px_5px_rgba(11,15,52,0.18)]">
          <div className="flex flex-col gap-[20px] overflow-y-auto w-full pr-[4px] h-full">
            <div className="flex w-full flex-col gap-[4px] justify-between items-center">
              <span className="text-[18px] font-semibold text-[#000] text-[16px]">
                YUP NFT IS LIVE!
              </span>
              <span className="flex justify-center items-center px-[16px] py-[4px] bg-black rounded-full text-[12px] cursor-pointer text-white transition-all duration-300 hover:scale-105">
                LEARN MORE
              </span>
            </div>
            <Image
              src="/images/placeholder1sidebar.png"
              layout="responsive"
              width={700}
              height={400}
              alt="Sidebar placeholder"
            />
            <div className="flex w-full h-full flex-col gap-[20px]">
              <span className="text-[19px] font-semibold text-[#000]">
                Staff Picks
              </span>
              <div className="flex flex-col w-full gap-[16px]">
                {Array(4)
                  .fill(0)
                  .map((_item: any, index: number) => {
                    return (
                      <>
                        <Avatar
                          small={true}
                          key={index}
                          image={"/images/avatarPlaceholder.png"}
                          headerText="Who TF is Retsba?"
                          subText="Software developer"
                        />
                        {index < 3 && <hr className="w-full h-[1px]" />}
                      </>
                    );
                  })}
              </div>
              {/* <span className="flex justify-center items-center mx-[8px] px-[16px] py-[8px] bg-[#6A8DFF] rounded-full font-semibold cursor-pointer text-white transition-all duration-300 hover:scale-105">
                See All
              </span> */}
            </div>
            <div className="flex w-full h-full flex-col gap-[20px]">
              <span className="text-[19px] font-semibold text-[#000]">
                Latst Articles
              </span>
              <div className="flex flex-col w-full gap-[16px]">
                {loading && <Spinner />}
                {!loading &&
                  news.map((item: NewsItem, index: number) => {
                    return (
                      <Link
                        key={index}
                        href={`/news/${item.id}`}
                        className="flex flex-col gap-[8px]"
                      >
                        <Avatar
                          small={true}
                          image={item.editor.avatarUrl}
                          headerText={item.title}
                          subText={item.editor.usernameSubtitle}
                        />
                        {index < 3 && <hr className="w-full h-[1px]" />}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
