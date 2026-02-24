import type { Metadata } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { getSiteSettings } from "@/lib/microcms";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { FixedCTA } from "@/components/layout/FixedCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-serif-jp",
});

export const metadata: Metadata = {
  title: {
    default: "整体院スタートHP",
    template: "%s | 整体院スタートHP",
  },
  description:
    "開業したばかりの整体院様へ。初期費用0円で予約が入るHP。メニュー・施術者・アクセス・ご予約は当サイトから。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  let settings = null;
  try {
    settings = await getSiteSettings();
  } catch {
    settings = null;
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

  return (
    <html lang="ja" className={`${notoSansJP.variable} ${notoSerifJP.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans text-neutral-800 antialiased pb-24 sm:pb-0" suppressHydrationWarning>
        <JsonLd settings={settings} baseUrl={baseUrl} />
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
        <MobileStickyBar settings={settings} />
        <FixedCTA />
      </body>
    </html>
  );
}
