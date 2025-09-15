
export interface NewsItem {
  id: string;
  title: string;
  banner: string;
  newsType: string;
  editor: {
    username: string;
    avatarUrl: string;
    usernameSubtitle: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
  // Keep existing structure but add optional new fields
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  likes: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: any;
  createdAt: Date;
}

// Add new interfaces for future use (won't break existing code)
export interface LikeData {
  count: number;
  userLiked: boolean;
  likedBy: string[];
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  createdAt: Date;
}

export interface CommentData {
  count: number;
  items: Comment[];
}