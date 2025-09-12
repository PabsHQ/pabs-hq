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
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        News Banner Photo
      </label>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
            className="hidden"
            id="news-banner-input"
          />
          <label
            htmlFor="news-banner-input"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Choose Banner Image
          </label>
        </div>
        
        {preview && (
          <div className="relative">
            <img
              src={preview}
              alt="Banner Preview"
              className="h-24 w-48 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
            />
            <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              ✓
            </div>
          </div>
        )}
      </div>
      
      <p className="mt-2 text-xs text-gray-500">
        Recommended size: 1200x630px for optimal display
      </p>
    </div>
  );
};

export default NewsBanner;
