import { notFound } from "next/navigation";
import { firestore } from "../../../../lib/firebaseAdmin";
import LeftSidebar from "@/app/components/leftSidebar";
import Header from "@/app/components/header";
import LikeButton from "@/app/components/likeButton";
import CommentButton from "@/app/components/commentButton";
import { NewsItem } from "@/app/interfaces/newsDto.model";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, ""); // remove all HTML tags
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const doc = await firestore.collection("news").doc(id).get();

  if (!doc.exists) {
    return {
      title: "News Not Found",
      description: "The news article you are looking for does not exist.",
    };
  }

  const newsItem = doc.data() as NewsItem;
  const plainTextContent = stripHtml(newsItem?.content || "");
  const description =
    plainTextContent.length > 150
      ? plainTextContent.slice(0, 147) + "..."
      : plainTextContent;

  return {
    title: newsItem.title || "News",
    description,
    openGraph: {
      title: newsItem.title,
      description,
      images: newsItem.banner ? [newsItem.banner] : undefined,
    },
  };
}

export default async function NewsPage({ params }: Props) {
  const { id } = await params;
  const doc = await firestore.collection("news").doc(id).get();

  if (!doc.exists) {
    notFound(); // Automatically renders the 404 page
  }

  const data = doc.data();
  if (!data) {
    notFound();
  }

  // Ensure proper data structure with fallbacks
  const newsItem: NewsItem = {
    id: doc.id,
    title: data.title || "Untitled",
    banner: data.banner || "/images/placeholder1sidebar.png",
    newsType: data.newsType || "news",
    editor: {
      username: data.editor?.username || "Unknown Author",
      avatarUrl: data.editor?.avatarUrl || "/images/avatarPlaceholder.png",
      usernameSubtitle: data.editor?.usernameSubtitle || "Contributor"
    },
    content: data.content || "",
    likes: data.likes || { count: 0, userLiked: false, likedBy: [] },
    comments: data.comments || { count: 0, items: [] },
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now())
  };

  // Helper function to get category display name
  const getCategoryDisplayName = (newsType: string) => {
    const categoryMap: { [key: string]: string } = {
      chainNews: "Chain News",
      theBuzz: "The Buzz",
      trenches: "Trenches",
      lore: "Lore",
      playbook: "Playbook"
    };
    return categoryMap[newsType] || "News";
  };

  // Helper function to get category color
  const getCategoryColor = (newsType: string) => {
    const colorMap: { [key: string]: string } = {
      lore: "bg-gradient-to-r from-orange-500 to-orange-600",
      theBuzz: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      chainNews: "bg-gradient-to-r from-green-500 to-green-600",
      trenches: "bg-gradient-to-r from-red-500 to-red-600",
      playbook: "bg-gradient-to-r from-purple-500 to-purple-600"
    };
    return colorMap[newsType] || "bg-gradient-to-r from-gray-500 to-gray-600";
  };

  // Simple handlers for now
  const handleLike = (articleId: string) => {
    console.log("Like clicked for article:", articleId);
  };

  const handleToggleComments = (articleId: string) => {
    console.log("Comments clicked for article:", articleId);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Sticky Header */}
      <Header />
      
      {/* Main Content Area */}
      <main className="w-full py-6">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6 h-[calc(100vh-120px)] min-h-[600px] px-6">
          {/* Left Sidebar */}
          <aside className="w-64 flex-shrink-0" role="navigation" aria-label="Main navigation">
            <LeftSidebar />
          </aside>

          {/* Main Article Content */}
          <section className="flex-1 min-w-0 bg-[#1a1a1a] rounded-2xl p-8 border border-[#333333] overflow-y-auto" aria-label="Article content">
            <div className="max-w-4xl mx-auto">
              {/* Article Header */}
              <div className="mb-8">
                {/* Category Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1.5 text-xs font-semibold text-white rounded-lg shadow-lg ${getCategoryColor(newsItem.newsType)}`}
                  >
                    {getCategoryDisplayName(newsItem.newsType)}
                  </span>
                </div>

                {/* Article Title */}
                <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
                  {newsItem.title}
                </h1>

                {/* Author Information */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#333333]">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#ff6b35]">
                    <Image
                      src={newsItem.editor.avatarUrl}
                      alt={newsItem.editor.username}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-lg">
                      {newsItem.editor.username}
                    </div>
                    <div className="text-[#a0a0a0] text-sm">
                      {newsItem.editor.usernameSubtitle}
                    </div>
                  </div>
                  <div className="text-[#a0a0a0] text-sm">
                    {new Date(newsItem.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mb-8">
                  <LikeButton
                    articleId={newsItem.id}
                    likes={newsItem.likes}
                    onLike={handleLike}
                  />
                  <CommentButton
                    articleId={newsItem.id}
                    comments={newsItem.comments}
                    onToggleComments={handleToggleComments}
                  />
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#333333] text-white rounded-lg hover:bg-[#444444] transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16,6 12,2 8,6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                    Share
                  </button>
                </div>
              </div>

              {/* Article Banner */}
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8">
                <Image
                  src={newsItem.banner}
                  alt={newsItem.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-invert max-w-none">
                <div
                  className="text-[#e0e0e0] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: newsItem.content }}
                />
              </div>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-[#333333]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <LikeButton
                      articleId={newsItem.id}
                      likes={newsItem.likes}
                      onLike={handleLike}
                    />
                    <CommentButton
                      articleId={newsItem.id}
                      comments={newsItem.comments}
                      onToggleComments={handleToggleComments}
                    />
                  </div>
                  <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to News
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden px-4 space-y-6">
          {/* Mobile Article Header */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]">
            {/* Back Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#a0a0a0] hover:text-white transition-colors mb-4"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to News
            </Link>

            {/* Category Badge */}
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1.5 text-xs font-semibold text-white rounded-lg shadow-lg ${getCategoryColor(newsItem.newsType)}`}
              >
                {getCategoryDisplayName(newsItem.newsType)}
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-2xl font-bold text-white mb-4 leading-tight">
              {newsItem.title}
            </h1>

            {/* Author Information */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#ff6b35]">
                <Image
                  src={newsItem.editor.avatarUrl}
                  alt={newsItem.editor.username}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold">
                  {newsItem.editor.username}
                </div>
                <div className="text-[#a0a0a0] text-sm">
                  {new Date(newsItem.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <LikeButton
                articleId={newsItem.id}
                likes={newsItem.likes}
                onLike={handleLike}
              />
              <CommentButton
                articleId={newsItem.id}
                comments={newsItem.comments}
                onToggleComments={handleToggleComments}
              />
              <button className="flex items-center gap-2 px-3 py-2 bg-[#333333] text-white rounded-lg text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16,6 12,2 8,6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share
              </button>
            </div>
          </div>

          {/* Mobile Article Banner */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src={newsItem.banner}
              alt={newsItem.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Mobile Article Content */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]">
            <div
              className="text-[#e0e0e0] leading-relaxed prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: newsItem.content }}
            />
          </div>

          {/* Mobile Article Footer */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-[#333333]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LikeButton
                  articleId={newsItem.id}
                  likes={newsItem.likes}
                  onLike={handleLike}
                />
                <CommentButton
                  articleId={newsItem.id}
                  comments={newsItem.comments}
                  onToggleComments={handleToggleComments}
                />
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] transition-colors text-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to News
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
