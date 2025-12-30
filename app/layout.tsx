import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "BaseJar | Save & Earn on Base",
  description: "The simplest savings jar on the Base Network.",
  // 👇 YOUR VERIFICATION TAG
  other: {
    "base:app_id": "69541200c63ad876c90819d1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/* 👇 Simplified body tag (Removed missing font variables) */}
      <body className="antialiased bg-zinc-950 text-white">
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}