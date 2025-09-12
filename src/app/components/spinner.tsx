export default function Spinner() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-green-400 rounded-full animate-spin shadow-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 border-2 border-gray-100 border-t-emerald-300 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
