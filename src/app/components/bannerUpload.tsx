import { useState } from "react";

interface NewsBannerProps {
  handleImageChange: (file: File) => void;
}

const NewsBanner: React.FC<NewsBannerProps> = ({
  handleImageChange
}) => {
  const [preview, setPreview] = useState<string | null>(null);


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
      <h3>News banner photo</h3>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Avatar Preview"
          className="h-[113px] w-[309px]"
          style={{
            borderRadius: "40px",
            objectFit: "cover",
            border: "1px solid black",
          }}
        />
      )}
    </div>
  );
};

export default NewsBanner;
