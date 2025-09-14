"use client";

import { useEffect, useState, forwardRef } from "react";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import Link from "next/link";
import Spinner from "./spinner";
import ThemeToggle from "./themeToggle";

interface HeaderProps {}

const Header = forwardRef<HTMLDivElement, HeaderProps>((props, ref) => {
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'h-16' : 'h-20'
    }`}>
      <div className="w-full h-full glass-effect border-b border-white/10" ref={ref}>
        <div className="max-w-7xl mx-auto h-full px-6">
          <div className="flex items-center justify-between h-full gap-4">
            {/* Logo - Centered above left sidebar */}
            <div className="flex-[0.2] flex justify-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/pabsLogo.png"
                  className="cursor-pointer"
                  width={isScrolled ? 100 : 125}
                  height={isScrolled ? 22 : 28}
                  alt="Pabs Logo"
                />
              </Link>
            </div>

            {/* Search Bar - Middle */}
            <div className="flex-1 flex justify-center px-8">
              <div className="w-full max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full px-4 py-2 pl-10 bg-white/10 dark:bg-gray-800/10 border border-white/20 dark:border-gray-600/20 rounded-full text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 backdrop-blur-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions - Right with padding */}
            <div className="flex-[0.2] flex justify-end items-center gap-3 pr-4">
              <ThemeToggle />
              
              <div
                className={`text-white hover:text-white ${isScrolled ? 'h-10' : 'h-12'} px-4 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ${
                  isConnected ? "justify-start" : "justify-center"
                } items-center text-center cursor-pointer flex min-w-[160px]`}
                onClick={() => {
                  if (!isConnected && !isConnecting) {
                    login();
                  }
                }}
              >
                {isConnecting && !isConnected && <Spinner />}
                {!isConnected && !isConnecting && <span className="font-semibold text-sm">Connect Wallet</span>}
                {isConnected && (
                  <div className="flex flex-col w-full h-full gap-1 items-start justify-start">
                    <span className="text-orange-100 font-bold text-xs text-start">
                      Wallet Connected
                    </span>
                    <div className="flex w-full h-full gap-2 items-center text-xs">
                      <span>
                        {address?.substring(0, 4) +
                          "........" +
                          address?.substring(address.length - 4)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
