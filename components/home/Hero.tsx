import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { toText } from "@/lib/utils";
import { getReserveUrl } from "@/lib/reserve";
import type { SiteSettings } from "@/types/microcms";

type Props = {
  settings: SiteSettings | null;
};

const DEFAULT_CATCH =
  "開業したばかりの整体院様へ 初期費用0円で予約が入るHP";

export function Hero({ settings }: Props) {
  const reserveMode = settings?.reserveMode ?? "link";
  const reserveUrl = getReserveUrl(reserveMode, settings?.reserveUrl);
  const reserveHref = reserveUrl ?? "/reserve";
  const reserveExternal = Boolean(reserveUrl);
  const catchCopy = toText(settings?.tagline) || DEFAULT_CATCH;
  const heroImage = settings?.heroImage;

  return (
    <section className="relative bg-neutral-50 pt-8 pb-16 sm:pt-12 sm:pb-20">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1">
            <h1 className="text-2xl font-bold leading-tight text-neutral-800 sm:text-3xl lg:text-4xl">
              {catchCopy}
            </h1>
            <p className="mt-4 text-neutral-600">
              {toText(settings?.clinicName) && (
                <span className="font-medium">{toText(settings?.clinicName)}</span>
              )}
              {toText(settings?.areaText) && (
                <span className="ml-1">（{toText(settings?.areaText)}）</span>
              )}
            </p>
            <div className="mt-8">
              <CTAButton
                href={reserveHref}
                label="予約はこちら"
                external={reserveExternal}
                variant="primary"
                className="text-base px-8 py-4"
              />
            </div>
          </div>
          {heroImage?.url && (
            <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-lg bg-neutral-200 sm:h-72 lg:h-80 lg:w-[420px]">
              <Image
                src={heroImage.url}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
