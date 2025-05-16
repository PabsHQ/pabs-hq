
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  likes: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments: any;
  createdAt: Date;
}