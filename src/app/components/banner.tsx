import Image from "next/image";

export default function PresaleBanner() {
  return (
    <div className="w-full h-[300px] relative overflow-hidden bg-black rounded-2xl">
      <Image
        src="/images/hat.png"
        alt="Wizard Presale"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
