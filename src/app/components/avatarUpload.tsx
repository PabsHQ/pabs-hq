import { useEffect, useState } from "react";

interface AvatarUploadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  avatarUrl: any | null;
  title: string;
  handleImageChange: (file: File) => void;
  isBanner: boolean;
  flexStyle: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  title,
  handleImageChange,
  avatarUrl,
  isBanner,
  flexStyle,
}) => {
  const [preview, setPreview] = useState<string | null>(avatarUrl);

  useEffect(() => {
    if (avatarUrl) {
      setPreview(avatarUrl);
    }
  }, [avatarUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageChange(file); // Pass the raw file to parent
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const setHomepageBanner = async () => {
    const file = avatarUrl;

    if (!file) return;

    const bannerFormData = new FormData();
    bannerFormData.append("file", file, file.name);
    const bannerRes = await fetch("/api/uploadHomepageBanner", {
      method: "POST",
      body: bannerFormData,
    });

    if (!bannerRes.ok) throw new Error("Error uploading banner");
  };

  return (
    <div
      className={`flex ${flexStyle} w-full gap-[24px] justify-start items-center`}
    >
      <h3>{title}</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Avatar Preview"
          width={!isBanner ? 48 : "auto"}
          height={!isBanner ? 48 : "auto"}
          style={{
            borderRadius: "9999px",
            objectFit: "cover",
            border: "1px solid black",
          }}
        />
      )}
      {isBanner && (
        <button
          className="border border-solid border-black p-[4px] cursor-pointer hover:bg-green-500"
          onClick={() => setHomepageBanner()}
        >
          Change homepage banner!
        </button>
      )}
    </div>
  );
};

export default AvatarUpload;
