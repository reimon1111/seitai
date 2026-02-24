"use client";

import { Section } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { toText } from "@/lib/utils";
import { getReserveUrl } from "@/lib/reserve";
import type { Testimonial } from "@/types/microcms";
import type { SiteSettings } from "@/types/microcms";

type Props = {
  testimonials: Testimonial[];
  settings: SiteSettings | null;
};

export function TestimonialsSection({ testimonials, settings }: Props) {
  const reserveMode = settings?.reserveMode ?? "link";
  const reserveUrl = getReserveUrl(reserveMode, settings?.reserveUrl);
  const reserveHref = reserveUrl ?? "/reserve";
  const reserveExternal = Boolean(reserveUrl);

  if (testimonials.length === 0) return null;

  return (
    <Section title="お客様の声" id="testimonials" className="bg-neutral-50">
      <ul className="space-y-6">
        {testimonials.map((t) => (
          <li
            key={t.id}
            className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
          >
            {t.rating != null && (
              <p className="text-amber-500 text-sm" aria-hidden>
                {"★".repeat(Math.min(5, t.rating))}
              </p>
            )}
            <blockquote className="mt-2 text-neutral-700">
              {toText(t.comment)}
            </blockquote>
            <cite className="mt-3 block text-right text-sm not-italic text-neutral-500">
              — {toText(t.nameMask)}
            </cite>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center">
        <CTAButton
          href={reserveHref}
          label="予約する"
          external={reserveExternal}
          variant="primary"
        />
      </div>
    </Section>
  );
}
