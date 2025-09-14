/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Tiptap from "../components/editor";
import AvatarUpload from "../components/avatarUpload";
import { useAccount } from "wagmi";
import NewsBanner from "../components/bannerUpload";

const ALLOWED_WALLET_LIST = [
  "0xDD0c431bf168eAC19ED23a338429F32261B787A0", // jorganite
  "0x7C3C6Fb006F630F400676bfd73998B9F69aa3b98", // ikleman
  "0x2B6F42915844d827563547da951cBaAA4e753939", // mirco
  "0x78D81911643c2D076Dfd1468Cd9a81b44c16F114", // 0xnecro
  "8MTX2JNhxSnCG7vFZoJxrVy13weUE1fvWtCCk3ovaWf5", // woboo (non-EVM?) 
];

const ALLOWLIST = ALLOWED_WALLET_LIST.map((a) => a.toLowerCase());

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
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const TEMPLATES = [
    {
      id: "case-file",
      name: "Case File",
      title: "Case File: {incident}",
      content: `<h2>Case File</h2>
<p style="font-style: italic; font-size: 0.9em; color: #666; margin-bottom: 1.5em;">What happened, who was involved, what the outcome was — written like an investigation.</p>

<h3>Incident</h3>
<p style="margin-bottom: 1.5em;">[Describe what went down]</p>

<h3>Players</h3>
<p style="margin-bottom: 1.5em;">[Who was involved]</p>

<h3>Evidence</h3>
<p style="margin-bottom: 1.5em;">[What proof do we have]</p>

<h3>Verdict</h3>
<p style="margin-bottom: 1.5em;">[Final judgment]</p>`
    },
    {
      id: "war-story",
      name: "War Story",
      title: "War Story: {battle}",
      content: `<h2>War Story</h2>
<p style="font-style: italic; font-size: 0.9em; color: #666; margin-bottom: 1.5em;">Frame events like a battle — wins/losses, surprise attacks, retreats.</p>

<h3>Opening move</h3>
<p style="margin-bottom: 1.5em;">[How it started]</p>

<h3>Counter</h3>
<p style="margin-bottom: 1.5em;">[The response]</p>

<h3>Turning point</h3>
<p style="margin-bottom: 1.5em;">[The decisive moment]</p>

<h3>Final score</h3>
<p style="margin-bottom: 1.5em;">[Who won and by how much]</p>`
    },
    {
      id: "autopsy",
      name: "Autopsy",
      title: "Autopsy: {failed-project}",
      content: `<h2>Autopsy</h2>
<p style="font-style: italic; font-size: 0.9em; color: #666; margin-bottom: 1.5em;">Break down a failed project/coin like a postmortem.</p>

<h3>What went wrong</h3>
<p style="margin-bottom: 1.5em;">[The failure points]</p>

<h3>Key mistakes</h3>
<p style="margin-bottom: 1.5em;">[Critical errors made]</p>

<h3>Root cause</h3>
<p style="margin-bottom: 1.5em;">[The fundamental issue]</p>

<h3>Lessons learned</h3>
<p style="margin-bottom: 1.5em;">[What we can take away]</p>`
    },
    {
      id: "echo-chamber",
      name: "Echo Chamber",
      title: "Echo Chamber: {topic}",
      content: `<h2>Echo Chamber</h2>
<p style="font-style: italic; font-size: 0.9em; color: #666; margin-bottom: 1.5em;">What CT or TG chats are buzzing about right now.</p>

<h3>Who's talking</h3>
<p style="margin-bottom: 1.5em;">[Key voices in the conversation]</p>

<h3>Main narratives</h3>
<p style="margin-bottom: 1.5em;">[The dominant storylines]</p>

<h3>Hottest takes</h3>
<p style="margin-bottom: 1.5em;">[The most controversial opinions]</p>

<h3>My filter</h3>
<p style="margin-bottom: 1.5em;">[Your take on the noise]</p>`
    },
    {
      id: "meme-watch",
      name: "Meme Watch",
      title: "Meme Watch: {meme-coin}",
      content: `<h2>Meme Watch</h2>
<p style="font-style: italic; font-size: 0.9em; color: #666; margin-bottom: 1.5em;">Track the life cycle of a meme-coin or joke narrative.</p>

<h3>Meme origin</h3>
<p style="margin-bottom: 1.5em;">[Where it started]</p>

<h3>How it spread</h3>
<p style="margin-bottom: 1.5em;">[The viral mechanism]</p>

<h3>Market reaction</h3>
<p style="margin-bottom: 1.5em;">[Price and volume response]</p>

<h3>Where it's headed</h3>
<p style="margin-bottom: 1.5em;">[Future trajectory]</p>`
    },
    {
      id: "thesis",
      name: "Thesis",
      title: "The thesis nobody asked for: {topic}",
      content: `<h2>Thesis</h2>
<p style="font-style: italic; font-size: 0.9em; color: #666; margin-bottom: 1.5em;">A deep dive into an unpopular opinion with evidence to back it up.</p>

<h3>Claim</h3>
<p style="margin-bottom: 1.5em;">[Your main argument]</p>

<h3>Why I believe it</h3>
<p style="margin-bottom: 1.5em;">[Supporting evidence]</p>

<h3>Counterpoints</h3>
<p style="margin-bottom: 1.5em;">[Addressing opposing views]</p>

<h3>Risks</h3>
<p style="margin-bottom: 1.5em;">[Potential downsides]</p>`
    },
    {
      id: "playbook",
      name: "Playbook",
      title: "Playbook: {doing} {item} without getting clapped",
      content: `<h2>Playbook</h2>
<p style="font-style: italic; font-size: 0.9em; color: #666; margin-bottom: 1.5em;">Step-by-step guide to navigating crypto without getting rekt.</p>

<h3>Goal</h3>
<p style="margin-bottom: 1.5em;">[What you're trying to achieve]</p>

<h3>Setup</h3>
<p style="margin-bottom: 1.5em;">[Prerequisites and preparation]</p>

<h3>Steps</h3>
<p style="margin-bottom: 1.5em;">[Step-by-step process]</p>

<h3>Safeguards</h3>
<p style="margin-bottom: 1.5em;">[Risk management]</p>

<h3>Outcome</h3>
<p style="margin-bottom: 1.5em;">[Expected results]</p>`
    },
    {
      id: "explainer",
      name: "Explainer",
      title: "{item} explained…",
      content: `<h2>Explainer</h2>
<p style="font-style: italic; font-size: 0.9em; color: #666; margin-bottom: 1.5em;">Break down complex concepts into digestible pieces.</p>

<h3>What it is</h3>
<p style="margin-bottom: 1.5em;">[Basic definition]</p>

<h3>How it works</h3>
<p style="margin-bottom: 1.5em;">[Mechanism and process]</p>

<h3>Why it matters</h3>
<p style="margin-bottom: 1.5em;">[Significance and impact]</p>

<h3>Examples</h3>
<p style="margin-bottom: 1.5em;">[Real-world applications]</p>`
    },
    {
      id: "weekly-wrap",
      name: "Weekly Wrap",
      title: "What the chain fed us this week {date}",
      content: `<h2>Weekly Wrap</h2>
<p style="font-style: italic; font-size: 0.9em; color: #666; margin-bottom: 1.5em;">A comprehensive look at the week's biggest moves and narratives.</p>

<h3>Winners</h3>
<p style="margin-bottom: 1.5em;">[What performed well]</p>

<h3>Losers</h3>
<p style="margin-bottom: 1.5em;">[What underperformed]</p>

<h3>Key narratives</h3>
<p style="margin-bottom: 1.5em;">[Main storylines]</p>

<h3>Takeaway</h3>
<p style="margin-bottom: 1.5em;">[Key lessons learned]</p>`
    }
  ];

  const handleChange = (e: any) => setSelectedNewsType(e.target.value);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (templateId) {
      const template = TEMPLATES.find(t => t.id === templateId);
      if (template) {
        setTitle(template.title);
        setPost(template.content);
      }
    }
  };

  // Load dark mode preference from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('admin-dark-mode');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'true');
      }
    }
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-dark-mode', isDarkMode.toString());
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Memoized functions to avoid dependency issues
  const fetchEditorData = useCallback(async () => {
    try {
      const res = await fetch(`/api/uploadAvatar?walletAddress=${address?.toLowerCase() ?? ""}`);
      const data = await res.json();
      if (res.ok) {
        setUsernameSubtitle(data.usernameSubtitle);
        setUsername(data.username);
        setAdminAvatar(data.avatarUrl);
      }
    } catch (err) {
      console.error("❌ Error fetching editor data:", err);
    }
  }, [address]);

  const fetchHomepageBanner = useCallback(async () => {
    try {
      const res = await fetch("/api/uploadHomepageBanner");
      const data = await res.json();
      setHomepageBanner(data.url);
    } catch (err) {
      console.error("❌ Error fetching homepage banner:", err);
    }
  }, []);

  // Check if form is ready
  useEffect(() => {
    const ready = 
      adminAvatar !== null && 
      newsBanner !== null && 
      title.trim() !== "" && 
      username.trim() !== "" && 
      usernameSubtitle.trim() !== "" && 
      selectedNewsType !== "";
    
    setDisabled(!ready);
  }, [adminAvatar, newsBanner, title, username, usernameSubtitle, selectedNewsType]);

  // Gate by wallet (case-insensitive)
  useEffect(() => {
    if (!address) return;
    if (ALLOWLIST.includes(address.toLowerCase())) {
      setCanView(true);
      fetchEditorData();
      fetchHomepageBanner();
    } else {
      setCanView(false);
    }
  }, [address, fetchEditorData, fetchHomepageBanner]);

  const onChange = (content: string) => setPost(content);

  // Calculate word count and reading time
  const getWordCount = (html: string) => {
    if (!html || html.trim() === '') return 0;
    // Remove HTML tags and count words
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = text.split(' ').filter(word => word.length > 0);
    return words.length;
  };

  const getReadingTime = (wordCount: number) => {
    if (wordCount === 0) return 0;
    // Average reading speed: 200 words per minute
    const minutes = Math.ceil(wordCount / 200);
    return Math.max(1, minutes); // Minimum 1 minute
  };

  const wordCount = getWordCount(post);
  const readingTime = getReadingTime(wordCount);

  const uploadAvatar = async () => {
    if (isUploading) return;
    setIsUploading(true);
    setUploadProgress(0);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!adminAvatar) {
        throw new Error("Please select an avatar.");
      }
      if (!newsBanner) {
        throw new Error("Please select a news banner.");
      }

      const skipAvatarUpload = typeof adminAvatar === "string";
      let editorAvatar = adminAvatar as string;

      // avatar upload (if a new File was chosen)
      if (!skipAvatarUpload) {
        if (!(adminAvatar instanceof File)) {
          throw new Error("Invalid avatar file.");
        }
        setUploadProgress(20);
        const formData = new FormData();
        formData.append("file", adminAvatar, adminAvatar.name);
        formData.append("username", username);
        formData.append("usernameSubtitle", usernameSubtitle);
        formData.append("walletAddress", (address ?? "").toLowerCase());

        const avatarRes = await fetch("/api/uploadAvatar", {
          method: "POST",
          body: formData,
        });
        const avatarData = await avatarRes.json();
        if (!avatarRes.ok) throw new Error(avatarData?.error || "Error uploading avatar");
        editorAvatar = avatarData.url;
      }

      setUploadProgress(40);
      // banner upload (must be a File)
      if (!(newsBanner instanceof File)) {
        throw new Error("Please select a banner image file.");
      }
      const bannerFormData = new FormData();
      bannerFormData.append("file", newsBanner, newsBanner.name);
      const bannerRes = await fetch("/api/uploadBanner", {
        method: "POST",
        body: bannerFormData,
      });
      const bannerData = await bannerRes.json();
      if (!bannerRes.ok) throw new Error(bannerData?.error || "Error uploading banner");
      const bannerUrl = bannerData.url;

      setUploadProgress(60);
      // create news
      const newsFormData = new FormData();
      newsFormData.append("title", title);
      newsFormData.append("content", post);
      newsFormData.append("banner", bannerUrl);
      newsFormData.append("newsType", selectedNewsType);
      newsFormData.append(
        "editor",
        JSON.stringify({
          username,
          usernameSubtitle,
          avatarUrl: editorAvatar,
        })
      );

      setUploadProgress(80);
      const newsRes = await fetch("/api/uploadNews", {
        method: "POST",
        body: newsFormData,
      });
      const newsData = await newsRes.json().catch(() => ({}));
      if (!newsRes.ok) throw new Error(newsData?.error || "Error uploading news");

      setUploadProgress(100);
      setSuccessMessage("News article uploaded successfully!");
      
      // Reset form after successful upload
      setTimeout(() => {
        setPost("");
        setTitle("");
        setNewsBanner(null);
        setUploadProgress(0);
        setSuccessMessage("");
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error("❌ Upload error:", err);
      setErrorMessage(err?.message ?? err?.errorMessage ?? String(err));
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (adminAvatar && typeof adminAvatar !== 'string') {
        URL.revokeObjectURL(URL.createObjectURL(adminAvatar));
      }
      if (newsBanner && typeof newsBanner !== 'string') {
        URL.revokeObjectURL(URL.createObjectURL(newsBanner));
      }
    };
  }, [adminAvatar, newsBanner]);

  if (!canView) return null;

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-50 to-gray-100'
    }`}>
      {/* Compact Header */}
      <header className="sticky top-0 w-full backdrop-blur-sm shadow-sm border-b border-gray-200 z-50" style={{ backgroundColor: '#15e382' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              {adminAvatar && (
                <Image
                  src={
                    typeof adminAvatar === "string"
                      ? adminAvatar
                      : URL.createObjectURL(adminAvatar)
                  }
                  alt={username ? `${username} avatar` : "Admin avatar"}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover border border-gray-200"
                />
              )}
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {username || "Admin"}
                </h3>
                <p className="text-xs text-white/80">News Editor</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full">
                <div className="h-2 w-2 bg-white rounded-full"></div>
                <span className="text-xs font-medium text-white">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Status Messages - Fixed positioning for better visibility */}
        <div className="fixed top-20 right-4 z-40 space-y-2 max-w-sm">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg shadow-lg">
              <div className="flex items-start gap-2">
                <svg className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-800">{errorMessage}</p>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg shadow-lg">
              <div className="flex items-start gap-2">
                <svg className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-green-800">{successMessage}</p>
              </div>
            </div>
          )}
        </div>

        {/* Upload Progress - Sticky for better visibility */}
        {isUploading && (
          <div className="sticky top-16 z-30 mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Uploading...</span>
              <span className="text-sm text-gray-500">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Page Title */}
          <div className="text-center py-4">
            <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Pabs HQ News</h2>
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Create and manage news articles for the platform</p>
          </div>

          {/* Top Row: Homepage Banner and Author Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Homepage Banner Section */}
            <div className="lg:col-span-1">
              <div className={`rounded-lg shadow-sm border p-5 h-full flex flex-col ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-1 rounded-full" style={{ backgroundColor: '#15e382' }}></div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Homepage Banner</h3>
                </div>
                
                {/* Banner Preview */}
                {homepageBanner && (
                  <div className="mb-4 flex justify-center">
                    <Image
                      src={homepageBanner}
                      alt="Homepage banner preview"
                      width={800}
                      height={128}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
                
                {/* File Upload Controls */}
                <div className="flex gap-3 mt-auto">
                  <AvatarUpload
                    title=""
                    avatarUrl={homepageBanner}
                    handleImageChange={(e: any) => setHomepageBanner(e)}
                    isBanner={true}
                    flexStyle="flex-row"
                    hidePreview={true}
                  />
                </div>
              </div>
            </div>

            {/* Author Profile Section */}
            <div className="lg:col-span-1">
              <div className={`rounded-lg shadow-sm border p-5 h-full ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-1 rounded-full" style={{ backgroundColor: '#15e382' }}></div>
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Author Profile</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Username
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300 text-gray-900'
                      }`}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      Username Subtitle
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300 text-gray-900'
                      }`}
                      value={usernameSubtitle}
                      onChange={(e) => setUsernameSubtitle(e.target.value)}
                      placeholder="e.g., Chief Waddler"
                    />
                  </div>

                  <AvatarUpload
                    title="Profile Avatar"
                    handleImageChange={(e: any) => setAdminAvatar(e)}
                    avatarUrl={adminAvatar}
                    isBanner={false}
                    flexStyle="flex-col"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Article Banner Preview */}
          {newsBanner && (
            <div className={`rounded-lg shadow-sm border p-5 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-1 rounded-full" style={{ backgroundColor: '#15e382' }}></div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Article Banner Preview</h3>
              </div>
              <div className="w-full">
                <Image
                  src={
                    typeof newsBanner === "string"
                      ? newsBanner
                      : URL.createObjectURL(newsBanner)
                  }
                  alt="Article banner preview"
                  width={800}
                  height={192}
                  className="w-full h-48 object-cover rounded-lg border border-gray-200"
                />
              </div>
            </div>
          )}

          {/* Article Details Section */}
          <div className={`rounded-lg shadow-sm border p-5 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-1 rounded-full" style={{ backgroundColor: '#15e382' }}></div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Article Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Article Title
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter article title"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  News Type
                </label>
                <select 
                  id="news-type" 
                  value={selectedNewsType} 
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">--Please choose an option--</option>
                  <option value="chainNews">Chain News</option>
                  <option value="theBuzz">The Buzz</option>
                  <option value="trenches">Trenches</option>
                  <option value="lore">Lore</option>
                  <option value="playbook">Playbook</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Article Style
                </label>
                <select 
                  id="article-template" 
                  value={selectedTemplate} 
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">--Choose article style (optional)--</option>
                  {TEMPLATES.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
                {selectedTemplate && (
                  <p className="mt-1 text-xs text-gray-500">
                    Style applied! Edit the placeholders below.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <NewsBanner handleImageChange={(e: any) => setNewsBanner(e)} />
            </div>
          </div>

          {/* Content Editor Section */}
          <div className={`rounded-lg shadow-sm border p-5 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-1 rounded-full" style={{ backgroundColor: '#15e382' }}></div>
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Article Content</h3>
            </div>
            <Tiptap content={post} onChange={onChange} />
            
            {/* Word Count Display */}
            <div className={`mt-3 flex items-center justify-between text-sm rounded-lg px-3 py-2 ${
              isDarkMode ? 'text-gray-300 bg-gray-700' : 'text-gray-600 bg-gray-50'
            }`}>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium">{wordCount} words</span>
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">{readingTime} min read</span>
                </span>
              </div>
              {wordCount > 0 && (
                <div className="text-xs">
                  {wordCount < 100 ? (
                    <span className="text-orange-600">Too short</span>
                  ) : wordCount > 1000 ? (
                    <span className="text-green-600">Long article</span>
                  ) : (
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Good length</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          {post && (
            <div className={`rounded-lg shadow-sm border p-5 ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-1 rounded-full" style={{ backgroundColor: '#15e382' }}></div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Preview</h3>
              </div>
              <div className="prose max-w-none">
                <div 
                  className={`border rounded-lg p-4 ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-700 text-gray-100' 
                      : 'border-gray-200 bg-gray-50 text-gray-900'
                  }`}
                  dangerouslySetInnerHTML={{ __html: post }} 
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={disabled || isUploading}
              onClick={uploadAvatar}
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Publish Article
                </>
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}