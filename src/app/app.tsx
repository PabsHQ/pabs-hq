"use client";

import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import { Alata } from "next/font/google";
import { abstract } from "viem/chains";

const alata = Alata({
    weight: "400",
    variable: "--font-alata",
    subsets: ["latin"],
  });
  

export default function App({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AbstractWalletProvider chain={abstract}>
        <body className={`${alata.variable} antialiased`}>{children}</body>
    </AbstractWalletProvider>
  );
}
