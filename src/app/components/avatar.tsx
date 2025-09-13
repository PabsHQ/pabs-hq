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
      className={`flex gap-3 ${
        small ? "items-center" : "items-start"
      }`}
    >
      {banner ? (
        <div
          className={`relative rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100 ${
            small ? "h-8 w-8" : "h-12 w-12"
          }`}
        >
          <Image
            src={image}
            alt={`${headerText} avatar`}
            fill
            className="object-cover object-center"
          />
        </div>
      ) : (
        <div
          className={`rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100 ${
            small ? "w-8 h-8" : "w-12 h-12"
          }`}
        >
          <Image
            src={image}
            alt={`${headerText} avatar`}
            width={small ? 32 : 48}
            height={small ? 32 : 48}
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <span
          className={`text-gray-900 font-medium truncate ${
            small ? "text-sm" : "text-base"
          }`}
        >
          {headerText}
        </span>
        {subText && (
          <span
            className={`text-gray-500 truncate ${
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
