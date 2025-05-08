"use client";

import Image from "next/image";
import PresaleBanner from "./banner";
import Avatar from "./avatar";

export default function MainContent() {
  return (
    <div className="flex flex-col gap-[16px] w-full h-full min-h-0">
      <PresaleBanner />

      {/* Outer container needs min-h-0 and overflow-hidden for layout control */}
      <div className="rounded-[30px] bg-white flex flex-col w-full drop-shadow-[2px_2px_5px_rgba(11,15,52,0.18)] gap-[20px] h-full min-h-0 overflow-hidden">
        
        {/* This container takes remaining space and shows scrollbar INSIDE the white box */}
        <div className="flex-1 overflow-y-auto p-[2%]">
          <div className="grid gap-[18px] grid-cols-[repeat(auto-fit,minmax(280px,1fr))] w-full">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                className="bg-white rounded-xl overflow-hidden shadow-md p-[12px] min-h-[250px]"
                key={idx}
              >
                <div className="w-full h-[113px] relative">
                  <Image
                    src="/images/newsPlaceholder.png"
                    alt="Article preview"
                    fill
                    className="object-cover rounded-[8px]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>
                <div className="flex flex-col gap-[10px] justify-start items-start mt-[10px]">
                  <span className="inline-block text-[10px] px-[8px] py-[4px] font-semibold bg-orange-100 text-orange-700 rounded-full">
                    LORE
                  </span>
                  <span className="font-semibold text-black text-[18px] line-clamp-2">
                    Absman 2.0: CTO
                  </span>
                  <Avatar
                    small={true}
                    image="/images/avatarPlaceholder.png"
                    headerText="Pabs Pengu"
                    subText="Chief Waddler"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
