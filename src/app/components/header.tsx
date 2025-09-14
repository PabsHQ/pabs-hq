"use client";

import { useEffect, useState, forwardRef } from "react";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import Link from "next/link";
import Spinner from "./spinner";
import ThemeToggle from "./themeToggle";

const Header = forwardRef<HTMLDivElement>((props, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { login } = useLoginWithAbstract();
  const { address, isConnected, isConnecting } = useAccount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={ref}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "h-16 bg-black/20 backdrop-blur-md border-b border-white/10"
          : "h-20 bg-black/10 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        {/* Logo - Centered above left sidebar */}
        <div className="flex-[0.2] flex justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/pabsLogo.png"
              alt="Pabs Logo"
              width={isScrolled ? 32 : 40}
              height={isScrolled ? 32 : 40}
              className="transition-all duration-300"
            />
          </Link>
        </div>

        {/* Search Bar - Center */}
        <div className="flex-1 flex justify-center px-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-2 pl-10 pr-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
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

        {/* Actions - Right side */}
        <div className="flex-[0.2] flex justify-end items-center space-x-4">
          <ThemeToggle />
          
          {isConnecting ? (
            <div className="flex items-center space-x-2">
              <Spinner />
              <span className="text-sm text-gray-300">Connecting...</span>
            </div>
          ) : isConnected ? (
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-300">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
              <button
                onClick={() => {
                  // Add disconnect logic here
                  console.log("Disconnect clicked");
                }}
                className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors duration-200"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={login}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-200 font-medium"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
