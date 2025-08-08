import type { Metadata } from "next";
import "./globals.css";
import App from "./app";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Pabs HQ",
  description: "All of your Abstrax.xyz news in one place",
  openGraph: {
    images: ["/images/pabsLogo.png"],
  },
};

const inter = Inter({
  weight: "400",
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <NextTopLoader
          height={8}
          showSpinner={true}
          crawlSpeed={200}
          easing="ease"
          speed={500}
        />
        <App>{children}</App>
      </body>
    </html>
  );
}
