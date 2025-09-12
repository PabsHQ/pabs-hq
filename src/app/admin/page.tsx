/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Tiptap from "../components/editor";
import { useAccount } from "wagmi";

const ALLOWED_WALLET_LIST = [
  "0xDD0c431bf168eAC19ED23a338429F32261B787A0", // jorganite
  "0x7C3C6Fb006F630F400676bfd73998B9F69aa3b98", // ikleman
  "0x2B6F42915844d827563547da951cBaAA4e753939", // mirco
  "0x78D81911643c2D076Dfd1468Cd9a81b44c16F114", //0xnecro
  "8MTX2JNhxSnCG7vFZoJxrVy13weUE1fvWtCCk3ovaWf5" // woboo
];

export default function Home() {
  const { address } = useAccount();
  const [canView, setCanView] = useState<boolean>(false);
  const [post, setPost] = useState("");
  const [adminAvatar, setAdminAvatar] = useState<any>(null);
  const [newsBanner, setNewsBanner] = useState<any>(null);
  const [homepageBanner, setHomepageBanner] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [usernameSubtitle, setUsernameSubtitle] = useState("");
  const [selectedNewsType, setSelectedNewsType] = useState("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setSelectedNewsType(e.target.value);
  };

  useEffect(() => {
    if (
      !adminAvatar ||
      !newsBanner ||
      !title ||
      !username ||
      !selectedNewsType ||
      !usernameSubtitle
    )
      return;

    setDisabled(false);
  }, [
    adminAvatar,
    newsBanner,
    title,
    username,
    usernameSubtitle,
    selectedNewsType,
  ]);

  useEffect(() => {
    if (!address) return;

    if (ALLOWED_WALLET_LIST.includes(address)) {
      setCanView(true);
      fetchEditorData();
      fetchHomepageBanner();
    }
  }, [address, ALLOWED_WALLET_LIST]);

  const fetchHomepageBanner = async () => {
    try {
      const res = await fetch("/api/uploadHomepageBanner");
      const data = await res.json();
      console.log(data, "lol");
      setHomepageBanner(data.url);
    } catch (err) {
      console.error("❌ Error fetching homepage banner:", err);
    }
  };

  const fetchEditorData = async () => {
    try {
      const res = await fetch(
        `/api/uploadAvatar?walletAddress=${address!.toLowerCase()}`
      );
      const data = await res.json();

      if (res.ok) {
        setUsernameSubtitle(data.usernameSubtitle);
        setUsername(data.username);
        setAdminAvatar(data.avatarUrl);
      } else {
        console.error("❌ Failed to fetch editor data:", data.error);
      }
    } catch (err) {
      console.error("❌ Error fetching editor data:", err);
    }
  };

  const onChange = (content: string) => {
    setPost(content);
  };

  const uploadAvatar = async () => {
    if (isUploading) return;
    setIsUploading(true);
    const skipAvatarUpload = typeof adminAvatar === "string";

    let editorAvatar = adminAvatar;

    if (!adminAvatar) return;
    // admin avatar
    try {
      if (!skipAvatarUpload) {
        const formData = new FormData();
        formData.append("file", adminAvatar, adminAvatar.name);
        formData.append("username", username);
        formData.append("usernameSubtitle", usernameSubtitle);
        formData.append("walletAddress", address!.toLowerCase());
        const avatarRes = await fetch("/api/uploadAvatar", {
          method: "POST",
          body: formData,
        });

        const avatarData = await avatarRes.json();

        if (!avatarRes.ok) throw new Error("Error uploading avatar");

        editorAvatar = avatarData.url;
      }

      const bannerFormData = new FormData();
      bannerFormData.append("file", newsBanner, newsBanner.name);
      const bannerRes = await fetch("/api/uploadBanner", {
        method: "POST",
        body: bannerFormData,
      });

      const bannerData = await bannerRes.json();
      if (!bannerRes.ok) throw new Error("Error uploading banner");

      const bannerUrl = bannerData.url;

      const newsFormData = new FormData();
      newsFormData.append("title", title);
      newsFormData.append("content", post);
      newsFormData.append("banner", bannerUrl);
      newsFormData.append("newsType", selectedNewsType);
      const editor = {
        username: username,
        usernameSubtitle: usernameSubtitle,
        avatarUrl: editorAvatar,
      };
      newsFormData.append("editor", JSON.stringify(editor));

      const newsRes = await fetch("/api/uploadNews", {
        method: "POST",
        body: newsFormData,
      });

      if (!newsRes.ok) throw new Error("Error uploading news");

      alert("Upload successfull!");
      window.location.reload();
    } catch (err: any) {
      console.error("❌ Upload error:", err);
      alert(
        err?.message ? err.message : err.errorMessage ? err.errorMessage : err
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (!canView) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">New Article</h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Draft
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-10 space-y-10">
            
            {/* Author Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Author Information</h3>
                <span className="text-sm text-gray-500">Required fields</span>
              </div>
              
              <div className="flex items-center space-x-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="relative">
                  {adminAvatar ? (
                    <img 
                      src={typeof adminAvatar === 'string' ? adminAvatar : URL.createObjectURL(adminAvatar)} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-2 border-white shadow-md">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  <button 
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs hover:bg-blue-700 shadow-sm transition-all duration-200 hover:scale-105"
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && setAdminAvatar(e.target.files[0])}
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full text-base font-medium text-gray-900 bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title/Role *</label>
                    <input
                      type="text"
                      placeholder="e.g. Content Writer, Chief Waddler"
                      className="w-full text-sm text-gray-700 bg-white border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                      value={usernameSubtitle}
                      onChange={(e) => setUsernameSubtitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Featured Image</h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  Required
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">Choose a high-quality image that represents your article. Recommended size: 1200x630px.</p>
              
              <div className="relative group">
                <div 
                  className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-gradient-to-br hover:from-blue-50 hover:to-gray-100 transition-all duration-300 group-hover:scale-[1.02]"
                  onClick={() => document.getElementById('banner-upload')?.click()}
                  style={{
                    backgroundImage: newsBanner ? `url(${typeof newsBanner === 'string' ? newsBanner : URL.createObjectURL(newsBanner)})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="text-center p-8">
                    <button className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-xl shadow-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:shadow-xl transition-all duration-200 hover:scale-105">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Featured Image
                    </button>
                    {!newsBanner && (
                      <p className="mt-3 text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    )}
                  </div>
                </div>
                <input
                  id="banner-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && setNewsBanner(e.target.files[0])}
                />
              </div>
            </div>

            {/* Article Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Article Details</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a compelling title for your article"
                    className="w-full px-5 py-4 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium bg-white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Keep it under 60 characters for best SEO results</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <select
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900 font-medium"
                    value={selectedNewsType}
                    onChange={handleChange}
                  >
                    <option value="" className="text-gray-400">Select a category</option>
                    <option value="chainNews">Chain News</option>
                    <option value="theBuzz">The Buzz</option>
                    <option value="trenches">Trenches</option>
                    <option value="lore">Lore</option>
                    <option value="playbook">Playbook</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <input
                    type="text"
                    placeholder="crypto, defi, news (comma separated)"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  />
                  <p className="text-xs text-gray-500">Optional: Add relevant tags for better discoverability</p>
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Article Content</h3>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                  Required
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">Write your article content using the rich text editor. You can format text, add links, images, and more.</p>
              <div className="border border-gray-300 rounded-xl shadow-sm overflow-hidden bg-white">
                <Tiptap content={post} onChange={onChange} />
              </div>
            </div>

            {/* Additional Settings */}
            <div className="space-y-8 border-t border-gray-200 pt-8">
              <h3 className="text-lg font-semibold text-gray-900">Additional Settings</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Homepage Banner Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Homepage Banner
                    </label>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      Optional
                    </span>
                  </div>
                  <div className="relative">
                    <div 
                      className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-all duration-200"
                      onClick={() => document.getElementById('homepage-banner-upload')?.click()}
                      style={{
                        backgroundImage: homepageBanner ? `url(${homepageBanner})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200">
                        <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Upload Banner
                      </button>
                    </div>
                    <input
                      id="homepage-banner-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && setHomepageBanner(e.target.files[0])}
                    />
                  </div>
                </div>

                {/* URL Slug */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="Auto-generated from title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 bg-gray-50 text-gray-500 cursor-not-allowed"
                    disabled
                  />
                  <p className="text-xs text-gray-500">The URL slug will be automatically generated based on your article title</p>
                </div>
              </div>

              {/* Publish Options */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">
                  Publishing Options
                </label>
                <div className="bg-gray-50 rounded-xl p-6 space-y-4 border border-gray-200">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white transition-colors">
                    <input
                      type="radio"
                      name="publish-option"
                      value="draft"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      defaultChecked
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Save as Draft</span>
                      <p className="text-xs text-gray-500">Save your work without publishing</p>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white transition-colors">
                    <input
                      type="radio"
                      name="publish-option"
                      value="publish"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Publish Now</span>
                      <p className="text-xs text-gray-500">Make your article live immediately</p>
                    </div>
                  </label>
                  <label className="flex items-start space-x-3 cursor-pointer p-3 rounded-lg hover:bg-white transition-colors">
                    <input
                      type="radio"
                      name="publish-option"
                      value="schedule"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 mt-1"
                    />
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-900">Schedule for Later</span>
                      <p className="text-xs text-gray-500 mb-3">Choose when to publish your article</p>
                      <input
                        type="datetime-local"
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        placeholder="dd/mm/yyyy, --:-- --"
                      />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            {post && (
              <div className="border-t border-gray-200 pt-8">
                <details className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                  <summary className="flex cursor-pointer items-center justify-between p-6 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Article Preview</span>
                    </div>
                    <svg className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 border-t border-gray-200 bg-white">
                    <div className="mt-6 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: post }} />
                  </div>
                </details>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="px-10 py-8 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <span className="text-sm text-gray-600 font-medium">Auto-saving changes...</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  type="button"
                  className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 hover:scale-105"
                >
                  Discard Changes
                </button>
                <button 
                  type="button"
                  className="px-6 py-3 text-sm font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 hover:scale-105"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  disabled={disabled || isUploading}
                  onClick={uploadAvatar}
                  className={`inline-flex items-center space-x-3 px-8 py-3 text-sm font-bold rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                    disabled || isUploading 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-blue-500 hover:scale-105 hover:shadow-xl shadow-blue-500/25'
                  }`}
                >
                  {isUploading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Publishing Article...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Publish Article</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
