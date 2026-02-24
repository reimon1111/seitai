import { getTestimonials } from "@/lib/microcms";
import { toText, getRating } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { getReserveUrl } from "@/lib/reserve";
import { getSiteSettings } from "@/lib/microcms";
import { PageHead } from "@/components/layout/PageHead";

export const revalidate = 60;

export const metadata = {
  title: "お客様の声",
  description: "当院をご利用いただいたお客様の声をご紹介します。",
};

export default async function TestimonialsPage() {
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = [];
  let settings = null;
  try {
    const [t, s] = await Promise.all([
      getTestimonials(50),
      getSiteSettings(),
    ]);
    testimonials = t ?? [];
    settings = s;
  } catch {
    // ignore
  }

  const reserveMode = settings?.reserveMode ?? "link";
  const reserveUrl = getReserveUrl(reserveMode, settings?.reserveUrl);
  const reserveHref = reserveUrl ?? "/reserve";
  const reserveExternal = Boolean(reserveUrl);

  const pageIntro = toText(settings?.testimonialsIntro);
  const sorted = [...testimonials].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <>
      <PageHead title="お客様の声" />
      <div className="py-8 sm:py-12">
        <Section>
        {pageIntro && (
          <p className="whitespace-pre-line leading-relaxed text-neutral-600">
            {pageIntro}
          </p>
        )}
        <ul className={`mt-12 grid grid-cols-1 gap-6 border-t border-neutral-200 pt-12 sm:gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-8 ${pageIntro ? "mt-8" : ""}`}>
          {sorted.map((t) => {
            const stars = getRating(t.rating ?? (t as Record<string, unknown>).rating);
            return (
            <li
              key={t.id}
              className="rounded-lg border border-neutral-200 bg-neutral-50/80 px-6 py-6 sm:px-8 sm:py-8"
            >
              {stars > 0 && (
                <p className="text-amber-600 text-sm" aria-hidden>
                  {"★".repeat(stars)}
                </p>
              )}
              <blockquote className="mt-2 font-serif text-lg leading-relaxed whitespace-pre-line text-neutral-800">
                {toText(t.comment)}
              </blockquote>
              <cite className="mt-6 block text-sm not-italic text-neutral-500">
                — {toText(t.nameMask)}
              </cite>
            </li>
            );
          })}
        </ul>
        {sorted.length === 0 && (
          <p className="text-neutral-500">お客様の声はまだ登録されていません。</p>
        )}
        <div className="mt-16">
          <CTAButton
            href={reserveHref}
            label="ご予約はこちら"
            external={reserveExternal}
            variant="primary"
          />
        </div>
      </Section>
      </div>
    </>
  );
}
