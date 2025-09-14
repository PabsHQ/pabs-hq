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

  // Rest of the component remains the same...
  // [Previous component code continues here]