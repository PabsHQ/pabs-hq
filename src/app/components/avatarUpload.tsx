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
    <div className={`flex ${flexStyle} w-full gap-4 items-start`}>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {title}
        </label>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="hidden"
              id={`file-input-${title.replace(/\s+/g, '-').toLowerCase()}`}
            />
            <label
              htmlFor={`file-input-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Choose File
            </label>
          </div>
          
          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className={`${
                  isBanner 
                    ? "h-24 w-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm" 
                    : "h-16 w-16 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                }`}
              />
              <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                ✓
              </div>
            </div>
          )}
        </div>
        
        {isBanner && preview && (
          <div className="mt-3">
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              style={{ backgroundColor: '#15e382' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#12c973'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#15e382'}
              onClick={() => setHomepageBanner()}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Update Homepage Banner
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;
