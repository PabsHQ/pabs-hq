/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import Spinner from "./spinner";

export default function RightSidebar() {
  const { login } = useLoginWithAbstract();
  const { address, isConnected, isConnecting } = useAccount();

  return (
    <div className="h-full w-full">
      <div className="flex flex-col h-full w-full gap-4">
        {/* Connect Wallet Button */}
        <div
          className={`text-black hover:text-white h-16 w-full bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-500 rounded-lg p-3 shadow-lg hover:scale-105 transition-all duration-300 ${
            isConnected ? "justify-start" : "justify-center"
          } items-center text-center cursor-pointer flex`}
          onClick={() => {
            if (!isConnected && !isConnecting) {
              login();
            }
          }}
        >
          {isConnecting && !isConnected && <Spinner />}
          {!isConnected && !isConnecting && <span className="font-semibold">Connect Wallet</span>}
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
                  {address?.substring(0, 4) +
                    "........" +
                    address?.substring(address.length - 4)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* SKIP NFT'S ARE LIVE Section */}
        <div className="sidebar-card flex-1 w-full flex flex-col justify-center items-center px-6 py-8">
          <div className="flex flex-col gap-6 w-full items-center">
            <span className="text-xl font-bold text-black text-center">
              SKIP NFT&apos;S ARE LIVE!
            </span>
            <div className="w-full max-w-xs">
              <Image
                src="/images/banner2.jpeg"
                width={300}
                height={180}
                className="rounded-xl w-full h-auto object-cover"
                alt="Skip NFT banner"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
