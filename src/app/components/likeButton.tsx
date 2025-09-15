"use client";
import { useState } from "react";

interface LikeButtonProps {
  articleId: string;
  likes?: {
    count?: number;
    userLiked?: boolean;
    likedBy?: string[];
  };
  onLike?: (articleId: string) => void;
  className?: string;
}

export default function LikeButton({ 
  articleId, 
  likes, 
  onLike, 
  className = "" 
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes?.count || 0);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newLiked = !isLiked;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    
    setIsLiked(newLiked);
    setLikeCount(newCount);
    
    if (onLike) {
      onLike(articleId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-200 hover:bg-white/20 cursor-pointer ${className}`}
      title={isLiked ? "Unlike" : "Like"}
    >
      <HeartIcon filled={isLiked} />
      <span className="text-xs text-white font-medium">
        {likeCount}
      </span>
    </button>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "#ff6b35" : "none"}
      stroke={filled ? "#ff6b35" : "white"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
