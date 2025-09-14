"use client";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import Spinner from "./spinner";

export default function RightSidebar() {
  const { login } = useLoginWithAbstract();
  const { address, isConnected, isConnecting } = useAccount();

  return (
    <div className="flex-[0.2] h-full min-w-[297px]">
      <div className="flex flex-col h-full w-full gap-3">
        {/* Connect Wallet Button */}
        <div
          className={`flex-[0.1] text-black hover:text-white max-h-16 w-full bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 rounded-lg p-3 shadow-lg hover-lift transition-all duration-500 ${
            isConnected ? "justify-start" : "justify-center"
          } items-center text-center cursor-pointer flex`}
          onClick={() => {
            if (!isConnected && !isConnecting) {
              login();
            }
          }}
        >
          {isConnecting && !isConnected && <Spinner />}
          {!isConnected && !isConnecting && <span>Connect Wallet</span>}
          {isConnected && (
            <div className="flex flex-col w-full h-full gap-1 items-start justify-start">
              <span className="text-gray-600 font-bold text-xs text-start">
                Wallet Connected
              </span>
              <div className="flex w-full h-full gap-2 items-center text-xs">
                <Image
                  src="/images/abstract.png"
                  height={21}
                  width={22}
                  alt="abstract"
                />
                <span>
                  {" "}
                  {address?.substring(0, 4) +
                    "........" +
                    address?.substring(address.length - 4)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* SKIP NFT'S ARE LIVE Section */}
        <div className="sidebar-card flex-[1] w-full flex flex-col justify-center items-center px-[10%] py-7">
          <div className="flex flex-col gap-5 w-full items-center">
            <span className="text-lg font-semibold text-black text-center">
              SKIP NFT&apos;S ARE LIVE!
            </span>
            <Image
              src="/images/banner2.jpeg"
              width={250}
              height={150}
              className="rounded-[8px]"
              alt="Skip NFT banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
