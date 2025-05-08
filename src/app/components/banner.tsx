import Image from "next/image";

export default function PresaleBanner() {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden flex items-center px-6 bg-black text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] min-h-[193px]">
      <Image
        src="/images/bannerPlaceholder.png"
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
        <h2 className="text-2xl font-bold leading-tight mt-1">
          Wizard Presale is
          <br />
          Now Live!
        </h2>

        <button className="mt-4 px-4 py-2 cursor-pointer bg-neutral-900 rounded-full text-sm font-semibold text-white hover:bg-neutral-800 transition">
          Buy Presale
        </button>
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 opacity-30">
        <Image src="/sparkles.svg" alt="sparkles" width={96} height={96} />
      </div>
    </div>
  );
}
