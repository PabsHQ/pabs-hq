import Image from "next/image";

export default function PresaleBanner() {
  return (
    <div className="relative aspect-[690/311] w-full rounded-2xl overflow-hidden flex items-center px-6 bg-black text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <Image
        src="/images/banner.jpeg"
        alt="Wizard Presale"
        fill
        className="object-cover z-0"
        priority
      />

      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20 max-w-[400px]">
        <span className="text-xs font-medium uppercase tracking-wide text-white/70">
          Wizard NFT
        </span>
        {/* <h2 className="text-2xl font-bold leading-tight mt-1">
          Wizard Presale is
          <br />
          Now Live!
        </h2> */}

        <button className="mt-4 px-4 py-2 cursor-pointer bg-neutral-900 rounded-full text-sm font-semibold text-white hover:bg-neutral-800 transition">
          Buy Presale
        </button>
      </div>
    </div>
  );
}
