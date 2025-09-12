/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Tiptap from "../components/editor";
import AvatarUpload from "../components/avatarUpload";
import { useAccount } from "wagmi";
import NewsBanner from "../components/bannerUpload";

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
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">New Article</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V3h5v14z" />
              </svg>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 space-y-8">
            
            {/* User Profile Section */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                {adminAvatar ? (
                  <img 
                    src={typeof adminAvatar === 'string' ? adminAvatar : URL.createObjectURL(adminAvatar)} 
                    alt="Profile" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
                <button 
                  className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-blue-700"
                  onClick={() => document.getElementById('avatar-upload')?.click()}
                >
                  +
                </button>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && setAdminAvatar(e.target.files[0])}
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Author name"
                  className="text-base font-medium text-gray-900 bg-transparent border-none outline-none w-full"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Author title (e.g. Content Writer)"
                  className="text-sm text-gray-500 bg-transparent border-none outline-none w-full"
                  value={usernameSubtitle}
                  onChange={(e) => setUsernameSubtitle(e.target.value)}
                />
              </div>
            </div>

            {/* Featured Image Section */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Featured Image
              </label>
              <div className="relative">
                <div 
                  className="w-full h-48 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => document.getElementById('banner-upload')?.click()}
                  style={{
                    backgroundImage: newsBanner ? `url(${typeof newsBanner === 'string' ? newsBanner : URL.createObjectURL(newsBanner)})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="text-center">
                    <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Image
                    </button>
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

            {/* Article Title */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Article Title
              </label>
              <input
                type="text"
                placeholder="Enter article title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Category */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={selectedNewsType}
                onChange={handleChange}
              >
                <option value="">Select a category</option>
                <option value="chainNews">Chain News</option>
                <option value="theBuzz">The Buzz</option>
                <option value="trenches">Trenches</option>
                <option value="lore">Lore</option>
                <option value="playbook">Playbook</option>
              </select>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                placeholder="Add tags (comma separated)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Content Editor */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <div className="border border-gray-300 rounded-md">
                <Tiptap content={post} onChange={onChange} />
              </div>
            </div>

            {/* Homepage Banner Section (moved to less prominent position) */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Homepage Banner (Optional)
              </label>
              <div className="relative">
                <div 
                  className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  onClick={() => document.getElementById('homepage-banner-upload')?.click()}
                  style={{
                    backgroundImage: homepageBanner ? `url(${homepageBanner})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="text-center">
                    <button className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Banner
                    </button>
                  </div>
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
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                URL Slug
              </label>
              <input
                type="text"
                placeholder="url-slug-will-be-generated-automatically"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                disabled
              />
            </div>

            {/* Publish Options */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Publish Options
              </label>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="publish-option"
                    value="draft"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    defaultChecked
                  />
                  <span className="ml-3 text-sm text-gray-700">Save as Draft</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="publish-option"
                    value="publish"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Publish Now</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="publish-option"
                    value="schedule"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-3 text-sm text-gray-700">Schedule for Later</span>
                  <input
                    type="datetime-local"
                    className="ml-4 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="dd/mm/yyyy, --:-- --"
                  />
                </label>
              </div>
            </div>

            {/* Preview Section (Collapsible) */}
            <div className="border-t pt-8">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium text-gray-700 hover:text-gray-900">
                  <span>Preview</span>
                  <svg className="h-5 w-5 text-gray-400 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="preview prose max-w-none" dangerouslySetInnerHTML={{ __html: post }} />
                </div>
              </details>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
            <div className="flex items-center justify-between">
              <button 
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Discard
              </button>
              <div className="flex space-x-3">
                <button 
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  disabled={disabled || isUploading}
                  onClick={uploadAvatar}
                  className={`px-6 py-2 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    disabled || isUploading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isUploading ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
