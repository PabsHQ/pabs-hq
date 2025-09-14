"use client";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import Link from "next/link";
import Spinner from "./spinner";

export default function Header() {
  const { login } = useLoginWithAbstract();
  const { address, isConnected, isConnecting } = useAccount();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1a1a1a]/95 backdrop-blur-sm border-b border-[#404040] shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex-shrink-0 transition-opacity hover:opacity-80"
            aria-label="Pabs HQ Home"
          >
            <Image
              src="/images/pabsLogo.png"
              width={140}
              height={32}
              alt="Pabs HQ Logo"
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Search Bar - Center */}
          <div className="flex-1 flex justify-center px-8">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-2 pl-10 pr-4 bg-[#2a2a2a] border border-[#404040] rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* User Info / Wallet Connection */}
          <div className="flex items-center space-x-4">
            {isConnected ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg shadow-sm">
                  <Image
                    src="/images/abstract.png"
                    height={20}
                    width={20}
                    alt="Abstract Network"
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">
                    {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (!isConnecting) {
                    login();
                  }
                }}
                disabled={isConnecting}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label={isConnecting ? "Connecting wallet..." : "Connect wallet"}
              >
                {isConnecting ? (
                  <>
                    <Spinner />
                    <span className="ml-2">Connecting...</span>
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
