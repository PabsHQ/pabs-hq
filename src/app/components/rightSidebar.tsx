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
      <div className="bg-[#2a2a2a] rounded-2xl shadow-sm border border-[#404040] h-full overflow-hidden">
        <div className="p-6 h-full overflow-y-auto">
          <div className="space-y-8">
            {/* Promotional Section */}
            <div className="text-center space-y-4">
              <div className="space-y-3">
                <h2 className="text-lg font-bold text-white">
                  SKIP NFT&apos;S ARE LIVE!
                </h2>
                <button className="inline-flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-full hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
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

            {/* Staff Picks Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Staff Picks</h3>
              <div className="space-y-4">
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
                          <hr className="border-t border-[#404040]" />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Latest Articles Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Latest Articles</h3>
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
                          className="block hover:bg-[#404040] -mx-2 px-2 py-2 rounded-lg transition-colors duration-200"
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
                          <hr className="border-t border-[#404040]" />
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
