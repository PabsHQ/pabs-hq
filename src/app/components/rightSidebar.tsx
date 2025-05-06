"use client";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import Image from "next/image";

export default function RightSidebar() {
  const { login } = useLoginWithAbstract();
  const { address, isConnected, isConnecting } = useAccount();
  return (
    <div className="flex-[0.3] h-full">
      <div className="flex flex-col h-full w-full gap-[12px]">
        <div
          className={`flex-[0.1] max-h-[62px] w-full bg-[#2B3342] rounded-[8px] p-[9px] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] ${
            isConnected ? "justify-start" : "justify-center"
          } items-center text-center cursor-pointer flex`}
          onClick={() => {
            if (!isConnected && !isConnecting) {
              login();
            }
          }}
        >
          {isConnecting && !isConnected && (
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {!isConnected && !isConnecting && <span>Connect Wallet</span>}
          {isConnected && (
            <div className="flex flex-col w-full h-full gap-[6px] items-start justify-start">
              <span className="text-[#A9A9A9] font-bold text-[14px] text-start">
                Wallet Connected
              </span>
              <div className="flex w-full h-full gap-[10px] items-center text-[12px]">
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
        <div className="flex-[1] w-full rounded-[30px] bg-white flex flex-col h-full w-full justify-evenly items-center px-[10%] py-[28px] drop-shadow-[2px_2px_5px_rgba(11,15,52,0.18)] gap-[20px]">
          <div className="flex w-full justify-between items-center">
            <span className="text-[18px] font-semibold text-[#000] text-[16px]">
              YUP NFT IS LIVE!
            </span>
            <span className="flex justify-center items-center px-[16px] py-[4px] bg-black rounded-full text-[10px] cursor-pointer">
              LEARN MORE
            </span>
          </div>
          <Image
            src="/images/placeholder1sidebar.png"
            layout="responsive"
            width={700}
            height={400}
            alt="Sidebar placeholder"
          />
          <div className="flex w-full h-full flex-col gap-[12px]">
            <span className="text-[19px] font-semibold text-[#000]">
              Staff Picks
            </span>
            <div className="flex flex-col w-full gap-[16px]">test</div>
          </div>
        </div>
      </div>
    </div>
  );
}
