"use client";

import { useEffect, useState } from "react";
import { useLoginWithAbstract } from "@abstract-foundation/agw-react";
import { useAccount } from "wagmi";
import Image from "next/image";
import Link from "next/link";
import Spinner from "./spinner";
import ThemeToggle from "./themeToggle";
import FilterSwiper from "./filterSwiper";

interface HeaderProps {
  categories: string[];
  selectedNewsType: string;
  selectNewsType: (type: string) => void;
  containerWidth: number | null;
}

export default function Header({ categories, selectedNewsType, selectNewsType, containerWidth }: HeaderProps) {
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
      <div className="w-full h-full glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto h-full px-6">
          <div className="grid grid-cols-3 items-center h-full gap-4">
            {/* Logo */}
            <div className="flex justify-start">
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

            {/* Categories - Centered */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <FilterSwiper
                  categories={categories}
                  selectedNewsType={selectedNewsType}
                  selectNewsType={selectNewsType}
                  containerWidth={containerWidth}
                />
              </div>
            </div>

            {/* Actions - Right */}
            <div className="flex justify-end items-center gap-3">
              <ThemeToggle />
              
              <div
                className={`text-white hover:text-white ${isScrolled ? 'h-10' : 'h-12'} px-4 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 rounded-lg shadow-lg hover:scale-105 transition-all duration-300 ${
                  isConnected ? "justify-start" : "justify-center"
                } items-center text-center cursor-pointer flex min-w-[180px]`}
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
}
