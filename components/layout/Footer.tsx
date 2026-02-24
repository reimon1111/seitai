import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { toText, getImageUrl } from "@/lib/utils";
import type { SiteSettings } from "@/types/microcms";

type Props = {
  settings: SiteSettings | null;
};

export function Footer({ settings }: Props) {
  const clinicName = toText(settings?.clinicName) || "整体院";
  const logoUrl = getImageUrl(settings?.logo) || getImageUrl(settings?.logoImage);
  const showLogo = logoUrl.length > 0;

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-10 text-neutral-600 md:py-16">
      <Container wide>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            {showLogo ? (
              <Link href="/" className="inline-block">
                <Image
                  src={logoUrl}
                  alt={clinicName}
                  width={140}
                  height={44}
                  className="h-9 w-auto object-contain"
                />
              </Link>
            ) : (
              <p className="font-serif font-medium text-primary">{clinicName}</p>
            )}
            {toText(settings?.address) && (
              <p className="mt-2 text-[15px] leading-[1.7] whitespace-pre-line md:text-sm">
                {toText(settings?.address)}
              </p>
            )}
            {toText(settings?.businessHours) && (
              <p className="mt-2 text-[15px] leading-[1.7] whitespace-pre-line md:text-sm">営業時間: {toText(settings?.businessHours)}</p>
            )}
            {toText(settings?.holiday) && (
              <p className="mt-1 text-[15px] leading-[1.7] md:text-sm">定休日: {toText(settings?.holiday)}</p>
            )}
          </div>
          <div>
            <p className="font-serif text-sm font-medium text-primary">リンク</p>
            <ul className="mt-2 space-y-1 text-[15px] md:text-sm">
              <li>
                <Link href="/menu" className="hover:underline">メニュー・料金</Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:underline">お客様の声</Link>
              </li>
              <li>
                <Link href="/staff" className="hover:underline">施術者紹介</Link>
              </li>
              <li>
                <Link href="/access" className="hover:underline">アクセス</Link>
              </li>
              <li>
                <Link href="/reserve" className="hover:underline">予約</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>
          <div>
            {toText(settings?.instagramUrl) && (
              <a
                href={toText(settings?.instagramUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline"
              >
                Instagram
              </a>
            )}
            {toText(settings?.lineUrl) && (
              <a
                href={toText(settings?.lineUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 text-sm hover:underline"
              >
                LINE
              </a>
            )}
          </div>
        </div>
        <div className="mt-10 border-t border-neutral-200 pt-6 md:mt-12 md:pt-8">
          <p className="text-center text-xs text-neutral-500">
            当サイトの内容は予告なく変更することがあります。施術効果には個人差があります。
          </p>
          {toText(settings?.copyright) && (
            <p className="mt-2 text-center text-xs text-neutral-500">{toText(settings?.copyright)}</p>
          )}
        </div>
      </Container>
    </footer>
  );
}
