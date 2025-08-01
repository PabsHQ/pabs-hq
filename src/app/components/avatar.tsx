"use client";

import Image from "next/image";

interface IAvatarProps {
  headerText: string;
  subText?: string;
  image: string;
  small: boolean;
  banner: boolean;
}

export default function Avatar({
  image,
  headerText,
  subText,
  small = true,
  banner = false,
}: IAvatarProps) {
  return (
    <div
      className={`flex gap-[8px] ${
        small ? "justify-start items-center" : "justify-start  items-start"
      }`}
    >
      {banner ? (
        <div
          className={`relative rounded-full overflow-hidden ${
            small ? "h-[30px] w-[30px]" : "h-[48px] w-[48px]"
          }`}
        >
          <Image
            src={image}
            alt="avatar"
            fill
            className="object-cover object-center"
          />
        </div>
      ) : (
        <Image
          height={small ? 30 : 48}
          width={small ? 30 : 48}
          className="rounded-full object-cover"
          src={image}
          alt="avatar"
        />
      )}
      <div className="flex flex-col gap-[4px] justify-start items-start max-w-[80%]">
        <span
          className={`text-black ${
            small ? "text-[14px]" : ""
          }  overflow-hidden text-ellipsis whitespace-nowrap w-full`}
        >
          {headerText}
        </span>
        {subText && (
          <span
            className={`text-[#5F5F5F]  overflow-hidden text-ellipsis whitespace-nowrap w-full ${
              small ? "text-[10px]" : "text-[14px]"
            }`}
          >
            {subText}
          </span>
        )}
      </div>
    </div>
  );
}
