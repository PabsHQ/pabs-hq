import Image from "next/image";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PresaleBanner(banner: any) {
  return (
    <div className="w-full h-[300px] relative overflow-hidden bg-black rounded-2xl">
      <Image
        src={banner.banner}
        alt="Wizard Presale"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
