import type { Metadata } from "next";
import "./globals.css";
import App from "./app";


export const metadata: Metadata = {
  title: "Pabs HQ",
  description: "All of your Abstrax.xyz news in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <App>{children}</App>
    </html>
  );
}
