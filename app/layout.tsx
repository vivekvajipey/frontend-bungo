import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/src/components/MiniKitProvider";
import { ErudaDebug } from "@/src/components/ErudaDebug";
import AdminLayout from "@/src/components/AdminLayout";
import ClientLayout from "@/src/components/ClientLayout";
import { SageSupport } from 'sage-support';

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
          <MiniKitProvider>
            <ClientLayout>
              {children}
              <SageSupport projectId={12} />
            </ClientLayout>
          </MiniKitProvider>
          <ErudaDebug />
        </AdminLayout>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </body>
    </html>
  );
}
