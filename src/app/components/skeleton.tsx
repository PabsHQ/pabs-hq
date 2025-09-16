import React from 'react';

export default function Skeleton({ className = "", ...props }: { className?: string; [key: string]: any }) {
  return (
    <div
      className={`animate-pulse bg-[#333333] rounded ${className}`}
      {...props}
    />
  );
}

// Card skeleton for portfolio cards, forum categories, etc.
export function CardSkeleton() {
  return (
    <div className="bg-[#222222] rounded-xl p-6 border border-[#333333]">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="w-8 h-8 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-20 mb-2" />
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

// Table skeleton for leaderboards
export function TableSkeleton() {
  return (
    <div className="bg-[#222222] rounded-xl border border-[#333333] overflow-hidden">
      <div className="p-6 border-b border-[#333333]">
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="w-8 h-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Post skeleton for forums
export function PostSkeleton() {
  return (
    <div className="p-6 border-b border-[#333333] last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center space-x-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
        </div>
        <Skeleton className="w-8 h-8 rounded-full ml-4" />
      </div>
    </div>
  );
}

// Tool skeleton for alpha toolkit
export function ToolSkeleton() {
  return (
    <div className="bg-[#222222] rounded-xl p-6 border border-[#333333]">
      <div className="flex items-center mb-4">
        <Skeleton className="w-12 h-12 rounded-lg mr-4" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}

// Page header skeleton
export function PageHeaderSkeleton() {
  return (
    <div className="border-b border-[#333333] pb-6">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-64" />
    </div>
  );
}

