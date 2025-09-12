/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import Avatar from "./avatar";
import { NewsItem } from "../interfaces/newsDto.model";
import Spinner from "./spinner";
import Link from "next/link";
interface NewsPageProps {
  news: NewsItem[];
}

export default function RightSidebar({ news }: NewsPageProps) {
  const { login } = useLoginWithAbstract();
  const { address, isConnected, isConnecting } = useAccount();

  // const newsSpliced = news.splice(0,4);
  // console.log(newsSpliced, 'lol')

  return (
    <div className="flex-[0.2] h-full min-w-[297px]">
      <div className="flex flex-col h-full w-full gap-3">
        <div
          className={`flex-[0.1] text-black hover:text-white max-h-16 w-full bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 rounded-lg p-3 shadow-lg hover-lift transition-all duration-500 ${
            isConnected ? "justify-start" : "justify-center"
          } items-center text-center cursor-pointer flex`}
          onClick={() => {
            if (!isConnected && !isConnecting) {
              login();
            }
          }}
        >
          {isConnecting && !isConnected && <Spinner />}
          {!isConnected && !isConnecting && <span>Connect Wallet</span>}
          {isConnected && (
            <div className="flex flex-col w-full h-full gap-1 items-start justify-start">
              <span className="text-gray-600 font-bold text-xs text-start">
                Wallet Connected
              </span>
              <div className="flex w-full h-full gap-2 items-center text-xs">
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
        <div className="sidebar-card flex-[1] overflow-y-hidden w-full flex flex-col h-full w-full justify-evenly items-center px-[10%] py-7">
          <div className="flex flex-col gap-5 overflow-y-auto w-full pr-1 h-full">
            <div className="flex w-full flex-col gap-1 justify-between items-center">
              <span className="text-lg font-semibold text-black">
                SKIP NFT&apos;S ARE LIVE!
              </span>
              <span className="flex justify-center items-center px-4 py-1 bg-black rounded-full text-xs cursor-pointer text-white hover-scale font-medium">
                LEARN MORE
              </span>
            </div>
            <Image
              src="/images/banner2.jpeg"
              layout="responsive"
              width={700}
              height={400}
              className="rounded-[8px]"
              alt="Sidebar placeholder"
            />
            <div className="flex w-full h-full flex-col gap-5">
              <span className="text-lg font-semibold text-black">
                Staff Picks
              </span>
              <div className="flex flex-col w-full gap-4">
                {Array(4)
                  .fill(0)
                  .map((_item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col gap-1 w-full"
                      >
                        <Avatar
                          small={true}
                          image={"/images/avatarPlaceholder.png"}
                          headerText="Who TF is Retsba?"
                          subText="Software developer"
                          banner={false}
                        />
                        {index < 3 && <hr className="w-full h-[1px]" />}
                      </div>
                    );
                  })}
              </div>
              {/* <span className="flex justify-center items-center mx-[8px] px-[16px] py-[8px] bg-[#6A8DFF] rounded-full font-semibold cursor-pointer text-white transition-all duration-300 hover:scale-105">
                See All
              </span> */}
            </div>
            <div className="flex w-full h-full flex-col gap-5">
              <span className="text-lg font-semibold text-black">
                Latest Articles
              </span>
              <div className="flex flex-col w-full gap-4">
                {news.length < 1 && <Spinner />}
                {news.length > 0 &&
                  news.slice(0, 4).map((item: NewsItem, index: number) => {
                    return (
                      <Link
                        key={index}
                        href={`/news/${item.id}`}
                        className="flex flex-col gap-2 hover-lift rounded-lg p-2 -m-2 transition-all duration-300"
                      >
                        <Avatar
                          small={true}
                          image={item.banner}
                          headerText={item.title}
                          subText={item.editor.usernameSubtitle}
                          banner={true}
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
