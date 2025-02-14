import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/src/components/MiniKitProvider";
import { ErudaDebug } from "@/src/components/ErudaDebug";
import AdminLayout from "@/src/components/RootLayout";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bungo",
  description: "Bungo game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AdminLayout>
          <MiniKitProvider>{children}</MiniKitProvider>
          <ErudaDebug />
        </AdminLayout>
      </body>
    </html>
  );
}
