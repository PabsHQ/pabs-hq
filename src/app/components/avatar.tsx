"use client";

import Image from "next/image";

interface IAvatarProps {
  headerText: string;
  subText: string;
  image: string;
  small: boolean;
}

export default function Avatar({
  image,
  headerText,
  subText,
  small = true,
}: IAvatarProps) {
  return (
    <div
      className={`flex gap-[8px] ${
        small ? "justify-start items-center" : "justify-start  items-start"
      }`}
    >
      <Image
        height={small ? 30 : 48}
        width={small ? 30 : 48}
        className="rounded-full object-cover"
        src={image}
        alt="avatar"
      />
      <div className="flex flex-col gap-[4px] justify-start items-start">
        <span className={`text-black ${small ? "text-[14px]" : ""}`}>
          {headerText}
        </span>
        <span
          className={`text-[#5F5F5F] ${small ? "text-[10px]" : "text-[14px]"}`}
        >
          {subText}
        </span>
      </div>
    </div>
  );
}
