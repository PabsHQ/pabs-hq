"use client";

interface CommentButtonProps {
  articleId: string;
  comments?: {
    count?: number;
    items?: unknown[];
  };
  onToggleComments?: (articleId: string) => void;
  className?: string;
}

export default function CommentButton({ 
  articleId, 
  comments, 
  onToggleComments, 
  className = "" 
}: CommentButtonProps) {
  const commentCount = comments?.count || 0;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onToggleComments) {
      onToggleComments(articleId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-200 hover:bg-white/20 cursor-pointer ${className}`}
      title="View comments"
    >
      <CommentIcon />
      <span className="text-xs text-white font-medium">
        {commentCount}
      </span>
    </button>
  );
}

function CommentIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
