import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { toText } from "@/lib/utils";
import type { SiteSettings } from "@/types/microcms";

type Props = {
  settings: SiteSettings | null;
  reserveHref: string;
  reserveExternal: boolean;
};

export function AccessSection({ settings, reserveHref, reserveExternal }: Props) {
  const address = toText(settings?.address);
  const businessHours = toText(settings?.businessHours);
  const holiday = toText(settings?.holiday);
  const phone = toText(settings?.phone);
  const mapUrl = toText(settings?.googleMapUrl);

  return (
    <section id="access" className="bg-neutral-50 py-[60px] md:py-[120px]">
      <Container wide>
        <p className="font-serif text-sm tracking-[0.2em] text-primary-light">Access</p>
        <h2 className="font-serif mt-2 text-[22px] font-medium text-neutral-900 md:text-3xl lg:text-4xl">
          アクセス
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-16 md:gap-16 lg:grid-cols-2 lg:gap-24">
          <div className="space-y-8">
            {address && (
              <div>
                <h3 className="text-xs font-medium tracking-wider text-neutral-500">住所</h3>
                <p className="mt-2 text-[15px] leading-[1.7] whitespace-pre-line text-neutral-700">{address}</p>
              </div>
            )}
            {businessHours && (
              <div>
                <h3 className="text-xs font-medium tracking-wider text-neutral-500">営業時間</h3>
                <p className="mt-2 text-[15px] leading-[1.7] whitespace-pre-line text-neutral-700">{businessHours}</p>
              </div>
            )}
            {holiday && (
              <div>
                <h3 className="text-xs font-medium tracking-wider text-neutral-500">定休日</h3>
                <p className="mt-2 text-[15px] leading-[1.7] text-neutral-700">{holiday}</p>
              </div>
            )}
            {phone && (
              <div>
                <h3 className="text-xs font-medium tracking-wider text-neutral-500">電話</h3>
                <a
                  href={`tel:${phone.replace(/\D/g, "")}`}
                  className="mt-2 block text-[15px] text-primary hover:underline"
                >
                  {phone}
                </a>
              </div>
            )}
          </div>
          {mapUrl && (
            <div className="aspect-video w-full overflow-hidden bg-neutral-200">
              <iframe
                src={mapUrl}
                title="地図"
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
        <div className="mt-10 md:mt-16">
          {reserveExternal ? (
            <a
              href={reserveHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 w-full items-center justify-center gap-3 border-2 border-primary bg-primary text-[15px] font-medium text-white transition hover:bg-primary-hover hover:border-primary-hover md:inline-flex md:h-auto md:w-auto md:px-8 md:py-4 md:text-sm"
            >
              予約する
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </a>
          ) : (
            <Link
              href={reserveHref}
              className="group flex h-12 w-full items-center justify-center gap-3 border-2 border-primary bg-primary text-[15px] font-medium text-white transition hover:bg-primary-hover hover:border-primary-hover md:inline-flex md:h-auto md:w-auto md:px-8 md:py-4 md:text-sm"
            >
              予約する
              <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
                →
              </span>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
