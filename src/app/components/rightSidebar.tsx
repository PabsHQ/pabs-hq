/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Avatar from "./avatar";
import { NewsItem } from "../interfaces/newsDto.model";
import Spinner from "./spinner";
import Link from "next/link";
interface NewsPageProps {
  news: NewsItem[];
}

export default function RightSidebar({ news }: NewsPageProps) {
  return (
    <aside className="h-full" role="complementary" aria-label="Additional content">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full overflow-hidden">
        <div className="p-6 h-full overflow-y-auto">
          <div className="space-y-8">
            {/* Promotional Section */}
            <div className="text-center space-y-4">
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-gray-900">
                  SKIP NFT&apos;S ARE LIVE!
                </h2>
                <button className="inline-flex items-center px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                  LEARN MORE
                </button>
              </div>
              <div className="relative rounded-xl overflow-hidden">
                <Image
                  src="/images/banner2.jpeg"
                  layout="responsive"
                  width={700}
                  height={400}
                  className="object-cover"
                  alt="Skip NFTs promotional banner"
                />
              </div>
            </div>
<<<<<<< Current (Your changes)
          )}
        </div>
        <div className="flex-[1] overflow-y-hidden w-full rounded-[30px] bg-white flex flex-col h-full w-full justify-evenly items-center px-[10%] py-[28px] drop-shadow-[2px_2px_5px_rgba(11,15,52,0.18)]">
          <div className="flex flex-col gap-[20px] overflow-y-auto w-full pr-[4px] h-full">
            <div className="flex w-full flex-col gap-[4px] justify-between items-center">
              <span className="text-[18px] font-semibold text-[#000] text-[16px]">
                SKIP NFT&apos;S ARE LIVE!
              </span>
              <span className="flex justify-center items-center px-[16px] py-[4px] bg-black rounded-full text-[12px] cursor-pointer text-white transition-all duration-300 hover:scale-105">
                LEARN MORE
              </span>
            </div>
            <Image
              src="/images/banner2.jpeg"
              width={700}
              height={400}
              className="rounded-[8px] w-full h-auto"
              alt="Sidebar placeholder"
            />
            <div className="flex w-full h-full flex-col gap-[20px]">
              <span className="text-[19px] font-semibold text-[#000]">
                Staff Picks
              </span>
              <div className="flex flex-col w-full gap-[16px]">
=======

            {/* Staff Picks Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Staff Picks</h3>
              <div className="space-y-4">
>>>>>>> Incoming (Background Agent changes)
                {Array(4)
                  .fill(0)
                  .map((_item: any, index: number) => {
                    return (
                      <div key={index} className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Avatar
                            small={true}
                            image="/images/avatarPlaceholder.png"
                            headerText="Who TF is Retsba?"
                            subText="Software developer"
                            banner={false}
                          />
                        </div>
                        {index < 3 && (
                          <hr className="border-t border-gray-100" />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Latest Articles Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Latest Articles</h3>
              <div className="space-y-4">
                {news.length < 1 && (
                  <div className="flex justify-center py-8">
                    <Spinner />
                  </div>
                )}
                {news.length > 0 &&
                  news.slice(0, 4).map((item: NewsItem, index: number) => {
                    return (
                      <div key={index} className="space-y-4">
                        <Link
                          href={`/news/${item.id}`}
                          className="block hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors duration-200"
                        >
                          <Avatar
                            small={true}
                            image={item.banner}
                            headerText={item.title}
                            subText={item.editor.usernameSubtitle}
                            banner={true}
                          />
                        </Link>
                        {index < 3 && (
                          <hr className="border-t border-gray-100" />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
