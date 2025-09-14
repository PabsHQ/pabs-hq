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
      className={`flex gap-2 ${
        small ? "justify-start items-center" : "justify-start items-start"
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
        <div
          className={`rounded-full overflow-hidden ${
            small ? "w-8 h-8" : "w-12 h-12"
          }`}
        >
          <Image
            src={image}
            alt="avatar"
            width={small ? 32 : 48}
            height={small ? 32 : 48}
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-1 justify-start items-start max-w-[80%]">
        <span
          className={`text-white ${
            small ? "text-sm" : "text-base"
          } overflow-hidden text-ellipsis whitespace-nowrap w-full font-medium`}
        >
          {headerText}
        </span>
        {subText && (
          <span
            className={`text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap w-full ${
              small ? "text-xs" : "text-sm"
            }`}
          >
            {subText}
          </span>
        )}
      </div>
    </div>
  );
}
