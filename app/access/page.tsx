import { getSiteSettings } from "@/lib/microcms";
import { toText } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { getReserveUrl } from "@/lib/reserve";
import { PageHead } from "@/components/layout/PageHead";

export const revalidate = 60;

export const metadata = {
  title: "アクセス・営業時間",
  description: "アクセス方法と営業時間のご案内。",
};

export default async function AccessPage() {
  const settings = await getSiteSettings();

  const reserveMode = settings?.reserveMode ?? "link";
  const reserveUrl = getReserveUrl(reserveMode, settings?.reserveUrl);
  const reserveHref = reserveUrl ?? "/reserve";
  const reserveExternal = Boolean(reserveUrl);

  const pageIntro = toText(settings?.accessPageIntro);

  return (
    <>
      <PageHead title="アクセス・営業時間" />
      <div className="py-8 sm:py-12">
        <Section>
        {pageIntro && (
          <p className="whitespace-pre-line leading-relaxed text-neutral-600">
            {pageIntro}
          </p>
        )}
        <div className={`mt-12 space-y-10 border-t border-neutral-200 pt-12 ${pageIntro ? "mt-8" : ""}`}>
          {toText(settings?.address) && (
            <div>
              <h3 className="text-xs font-medium tracking-wider text-neutral-500">住所</h3>
              <p className="mt-2 whitespace-pre-line text-neutral-700">
                {toText(settings?.address)}
              </p>
            </div>
          )}
          {toText(settings?.businessHours) && (
            <div>
              <h3 className="text-xs font-medium tracking-wider text-neutral-500">営業時間</h3>
              <p className="mt-2 whitespace-pre-line text-neutral-700">{toText(settings?.businessHours)}</p>
            </div>
          )}
          {toText(settings?.holiday) && (
            <div>
              <h3 className="text-xs font-medium tracking-wider text-neutral-500">定休日</h3>
              <p className="mt-2 text-neutral-700">{toText(settings?.holiday)}</p>
            </div>
          )}
          {toText(settings?.phone) && (
            <div>
              <h3 className="text-xs font-medium tracking-wider text-neutral-500">電話</h3>
              <a
                href={`tel:${toText(settings?.phone).replace(/\D/g, "")}`}
                className="mt-2 block text-primary hover:underline"
              >
                {toText(settings?.phone)}
              </a>
            </div>
          )}
          {toText(settings?.googleMapUrl) && (
            <div>
              <h3 className="text-xs font-medium tracking-wider text-neutral-500">地図</h3>
              <div className="mt-2 aspect-video w-full overflow-hidden bg-neutral-200">
                <iframe
                  src={toText(settings?.googleMapUrl)}
                  title="地図"
                  className="h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-10">
          <CTAButton
            href={reserveHref}
            label="予約する"
            external={reserveExternal}
            variant="primary"
          />
        </div>
      </Section>
      </div>
    </>
  );
}
