import { useEffect, useState } from "react";

interface AvatarUploadProps {
  avatarUrl: string | null;
  handleImageChange: (file: File) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({
  handleImageChange,
  avatarUrl,
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

  return (
    <div className="flex w-full gap-[24px] justify-start items-center">
      <h3>Profile photo</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Avatar Preview"
          width={48}
          height={48}
          style={{
            borderRadius: "9999px",
            objectFit: "cover",
            border: "1px solid black",
          }}
        />
      )}
    </div>
  );
};

export default AvatarUpload;
