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
    <div className="h-auto w-screen p-[20px] flex flex-col gap-[30px] text-black">
      <div className="flex flex-col">
        <AvatarUpload
          title="Homepage banner"
          avatarUrl={homepageBanner}
          handleImageChange={(e) => setHomepageBanner(e)}
          isBanner={true}
          flexStyle="flex-col"
        ></AvatarUpload>
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Create a news</h1>
      <h3>Username</h3>
      <input
        type="text"
        className="bg-white border border-solid border-[#000]"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="flex gap-[24px] w-full justify-start items-center">
        <h2>Username Subtitle (for example: chief waddler)</h2>
        <input
          type="text"
          className="bg-white border border-solid border-[#000] w-[60%]"
          value={usernameSubtitle}
          onChange={(e) => setUsernameSubtitle(e.target.value)}
        />
      </div>
      <AvatarUpload
        title="Your profile avatar"
        handleImageChange={(e: any) => setAdminAvatar(e)}
        avatarUrl={adminAvatar}
        isBanner={false}
        flexStyle=""
      />
      <NewsBanner handleImageChange={(e: any) => setNewsBanner(e)} />
      <div className="flex gap-[24px] w-full justify-start items-center">
        <h2>Article title</h2>
        <input
          type="text"
          className="bg-white border border-solid border-[#000] w-[60%]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex gap-[24px] w-full justify-start items-center">
        <label htmlFor="fruit-select">Choose a news type: </label>
        <select
          id="fruit-select"
          value={selectedNewsType}
          onChange={handleChange}
        >
          <option value="">--Please choose an option--</option>
          <option value="chainNews">chain news</option>
          <option value="theBuzz">the buzz</option>
          <option value="trenches">trenches</option>
          <option value="lore">lore</option>
          <option value="playbook">playbook</option>
        </select>
      </div>

      <Tiptap content={post} onChange={onChange} />
      {/* Preview the HTML content */}
      <div className="mt-4">
        <h2 className="text-xl font-bold">Preview:</h2>
        <div className="preview" dangerouslySetInnerHTML={{ __html: post }} />
      </div>
      <button
        type="submit"
        disabled={disabled || isUploading}
        onClick={uploadAvatar}
        className="cursor-pointer"
      >
        Upload
      </button>
    </div>
  );
}
