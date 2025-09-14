/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { ALLOWED_WALLET_LIST } from "../constants/admin";
import BannerUpload from "../components/bannerUpload";
import AvatarUpload from "../components/avatarUpload";
import RichTextEditor from "../components/editor";
import { NewsItem } from "../interfaces/newsDto.model";

export default function Home() {
  const [canView, setCanView] = useState(false);
  const [homepageBanner, setHomepageBanner] = useState<string>("");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [editorData, setEditorData] = useState<any[]>([]);
  const { address } = useAccount();

  const fetchHomepageBanner = useCallback(async () => {
    try {
      const res = await fetch("/api/uploadHomepageBanner");
      const data = await res.json();
      console.log(data, "lol");
      setHomepageBanner(data.url);
    } catch (err) {
      console.error("❌ Error fetching homepage banner:", err);
    }
  }, []);

  const fetchEditorData = useCallback(async () => {
    try {
      const res = await fetch(
        "https://us-central1-pabs-hq.cloudfunctions.net/getEditors"
      );
      const data = await res.json();
      console.log(data, "editor data");
      setEditorData(data);
    } catch (err) {
      console.error("❌ Error fetching editor data:", err);
    }
  }, []);

  useEffect(() => {
    if (!address) return;

    if (ALLOWED_WALLET_LIST.includes(address)) {
      setCanView(true);
      fetchEditorData();
      fetchHomepageBanner();
    }
  }, [address, fetchEditorData, fetchHomepageBanner]);

  if (!canView) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-xl">
          Access Denied. Please connect with an authorized wallet.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Admin Panel</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BannerUpload />
          <AvatarUpload />
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Rich Text Editor</h2>
          <RichTextEditor />
        </div>
      </div>
    </div>
  );
}