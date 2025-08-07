import type { Metadata } from "next";
import "./globals.css";
import App from "./app";
import { Alata } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Pabs HQ",
  description: "All of your Abstrax.xyz news in one place",
  openGraph: {
    images: ["/images/pabsLogo.png"],
  },
};

const alata = Alata({
  weight: "400",
  variable: "--font-alata",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alata.variable} antialiased`}>
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
