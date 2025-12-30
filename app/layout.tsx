import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google"; // 1. Import Fonts
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

// 2. Configure Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "BaseJar | Save & Earn on Base",
  description: "The simplest savings jar on the Base Network.",
  openGraph: {
    title: "BaseJar | Save & Earn on Base",
    description: "Start saving USDC with Aave yields today.",
    url: "https://base-jar.vercel.app",
    siteName: "BaseJar",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BaseJar",
    description: "The simplest savings jar on Base.",
    images: ["/opengraph-image.png"],
  },
  // 👇 THIS IS THE NEW PART FOR BASE VERIFICATION
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
    <html lang="en">
      {/* 3. Apply Fonts to Body */}
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}