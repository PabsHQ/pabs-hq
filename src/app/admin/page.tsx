"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { isWalletAllowed } from "../constants/admin";
import BannerUpload from "../components/bannerUpload";
import AvatarUpload from "../components/avatarUpload";
import RichTextEditor from "../components/editor";

export default function Home() {
  const [canView, setCanView] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    if (!address) return;

    if (isWalletAllowed(address)) {
      setCanView(true);
    }
  }, [address]);

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