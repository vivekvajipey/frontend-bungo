import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MiniKitProvider from "@/src/components/MiniKitProvider";
import { ErudaDebug } from "@/src/components/ErudaDebug";
import AdminLayout from "@/src/components/AdminLayout";
import ClientLayout from "@/src/components/ClientLayout";
import { Tomorrow } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

const tomorrow = Tomorrow({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

// Set to true to enable maintenance mode, false to disable
const MAINTENANCE_MODE = true;

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
              {MAINTENANCE_MODE ? (
                <div className={`flex items-center justify-center min-h-screen bg-black text-red-600 ${tomorrow.className}`}>
                  <div className="max-w-md p-8 bg-black/70 rounded-lg border border-red-800 backdrop-blur-sm text-center">
                    <h1 className="text-3xl font-bold mb-4">System Maintenance</h1>
                    <p className="mb-6">
                      Bungo is currently undergoing system maintenance to improve your gaming experience. 
                      We will be back shortly.
                    </p>
                    <div className="py-2 px-4 bg-red-950/30 border border-red-800/50 rounded-lg text-sm">
                      <p>Estimated completion time: Soon™</p>
                    </div>
                  </div>
                </div>
              ) : (
                children
              )}
            </ClientLayout>
          </MiniKitProvider>
          <ErudaDebug />
        </AdminLayout>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet" />
      </body>
    </html>
  );
}
