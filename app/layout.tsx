import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://1906-wellness.vercel.app"),
  title: {
    default: "1906 | Information Resource on Cannabis, Cannabinoids, and Wellness",
    template: "%s | 1906",
  },
  description:
    "An information resource from 1906. Reporting on current events in cannabis, hemp, and cannabinoids, and on the science of health and wellness.",
  openGraph: {
    title: "1906 | Information Resource",
    description:
      "An information resource from 1906 on cannabis, cannabinoids, and health and wellness.",
    images: ["/1906-logo.png"],
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-brand-bg text-brand-text min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
