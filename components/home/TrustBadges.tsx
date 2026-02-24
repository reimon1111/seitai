import { Container } from "@/components/ui/Container";
import { toText } from "@/lib/utils";
import type { TrustBadge } from "@/types/microcms";

type Props = {
  badges?: TrustBadge[] | null;
};

const FALLBACK_BADGES: { label: string; icon?: string }[] = [
  { label: "国家資格保有" },
  { label: "完全予約制" },
  { label: "駐車場あり" },
];

export function TrustBadges({ badges }: Props) {
  const list = badges?.length ? badges : FALLBACK_BADGES;

  return (
    <section className="border-y border-neutral-200 bg-white py-6">
      <Container>
        <ul className="flex flex-wrap justify-center gap-6 sm:gap-8" role="list">
          {list.map((item, i) => (
            <li
              key={`badge-${i}`}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700"
            >
              {toText(item.icon) && <span aria-hidden>{toText(item.icon)}</span>}
              <span>{toText(item.label)}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
