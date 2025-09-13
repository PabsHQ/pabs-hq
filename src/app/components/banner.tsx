import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PresaleBanner(banner: any) {
  return (
    <div className="w-full h-64 sm:h-72 lg:h-80 relative overflow-hidden bg-gray-900 rounded-2xl shadow-sm border border-gray-200">
      <Image
        src={banner.banner}
        alt="Featured banner content"
        fill
        className="object-cover transition-transform duration-700 hover:scale-105"
        priority
        sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 80vw, 70vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}
