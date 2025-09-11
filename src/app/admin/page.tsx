"use client";
import { useEffect, useState } from "react";
import Tiptap from "../components/editor";
import AvatarUpload from "../components/avatarUpload";
import { useAccount } from "wagmi";
import NewsBanner from "../components/bannerUpload";

const ALLOWED_WALLET_LIST = [
  "0xDD0c431bf168eAC19ED23a338429F32261B787A0",
  "0x7C3C6Fb006F630F400676bfd73998B9F69aa3b98",
  "0x2B6F42915844d827563547da951cBaAA4e753939",
  "0x78D81911643c2D076Dfd1468Cd9a81b44c16F114",
  "8MTX2JNhxSnCG7vFZoJxrVy13weUE1fvWtCCk3ovaWf5",
];

export default function Home() {
  const { address } = useAccount();
  const [canView, setCanView] = useState(false);
  const [post, setPost] = useState("");
  const [adminAvatar, setAdminAvatar] = useState<any>(null);
  const [newsBanner, setNewsBanner] = useState<any>(null);
  const [homepageBanner, setHomepageBanner] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [usernameSubtitle, setUsernameSubtitle] = useState("");
  const [selectedNewsType, setSelectedNewsType] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

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
  }, [address]);

  const fetchHomepageBanner = async () => {
    try {
      const res = await fetch("/api/uploadHomepageBanner");
      const data = await res.json();
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

  const onChange = (content: string) => setPost(content);

  const uploadAvatar = async () => {
    if (isUploading) return;
    setIsUploading(true);
    const skipAvatarUpload = typeof adminAvatar === "string";
    let editorAvatar = adminAvatar;
    if (!adminAvatar) return;

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

      const newsFormData = new FormData();
      newsFormData.append("title", title);
      newsFormData.append("content", post);
      newsFormData.append("banner", bannerData.url);
      newsFormData.append("newsType", selectedNewsType);
      newsFormData.append(
