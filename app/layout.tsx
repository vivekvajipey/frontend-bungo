import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/src/components/MiniKitProvider";
import { ErudaDebug } from "@/src/components/ErudaDebug";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bungo",
  description: "A World ID mini app game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <MiniKitProvider>{children}</MiniKitProvider>
        <ErudaDebug />
      </body>
    </html>
  );
}
