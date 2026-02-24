import { Container } from "@/components/ui/Container";
import { SectionLink } from "@/components/ui/SectionLink";
import { toText, getRating } from "@/lib/utils";
import type { Testimonial } from "@/types/microcms";

type Props = {
  testimonials: Testimonial[];
};

/** list の要素（API 由来 or デフォルト） */
type ListItem = Testimonial | { id: string; nameMask: string; comment: string; rating: number; order: number };

export function TestimonialsSection({ testimonials }: Props) {
  const featured = testimonials
    .filter((t) => t.isFeatured === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const list: ListItem[] = featured.length > 0
    ? featured
    : [
        { id: "1", nameMask: "40代女性", comment: "肩こりがひどくて通い始めました。丁寧にみていただき、だいぶ楽になりました。", rating: 5, order: 0 },
        { id: "2", nameMask: "30代男性", comment: "デスクワークで腰を痛めていましたが、根本から整えてもらえて助かっています。", rating: 5, order: 1 },
        { id: "3", nameMask: "50代女性", comment: "産後の不調で通院。体が軽くなり、気持ちも前向きになりました。", rating: 5, order: 2 },
      ];

  return (
    <section id="testimonials" className="bg-neutral-50 py-[60px] md:py-[120px]">
      <Container wide>
        <p className="font-serif text-sm tracking-[0.2em] text-primary-light">Voice</p>
        <h2 className="font-serif mt-2 text-[22px] font-medium text-neutral-900 md:text-3xl lg:text-4xl">
          お客様の声
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-12">
          {list.map((t) => {
            const stars = getRating(t.rating ?? (t as Record<string, unknown>).rating);
            return (
            <li key={t.id} className="border-l-2 border-neutral-200 pl-6 md:pl-8">
              {stars > 0 && (
                <p className="text-amber-600 text-sm" aria-hidden>
                  {"★".repeat(stars)}
                </p>
              )}
              <blockquote className="mt-2 text-[15px] leading-[1.7] whitespace-pre-line text-neutral-700 md:leading-relaxed">
                {toText(t.comment)}
              </blockquote>
              <cite className="mt-6 block text-[15px] not-italic text-neutral-500 md:text-sm">
                — {toText(t.nameMask)}
              </cite>
            </li>
            );
          })}
        </ul>
        <SectionLink href="/testimonials">お客様の声一覧を見る</SectionLink>
      </Container>
    </section>
  );
}
