import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { toText } from "@/lib/utils";
import { CTAButton } from "@/components/ui/CTAButton";
import { getReserveUrl } from "@/lib/reserve";
import type { Menu } from "@/types/microcms";
import type { SiteSettings } from "@/types/microcms";

type Props = {
  menus: Menu[];
  settings: SiteSettings | null;
};

export function MenuPreview({ menus, settings }: Props) {
  const reserveMode = settings?.reserveMode ?? "link";
  const reserveUrl = getReserveUrl(reserveMode, settings?.reserveUrl);
  const reserveHref = reserveUrl ?? "/reserve";
  const reserveExternal = Boolean(reserveUrl);

  const featured = menus.filter((m) => m.isFeatured);
  const display = featured.length >= 2 ? featured : menus.slice(0, 4);

  return (
    <Section title="メニュー・料金" id="menu">
      <ul className="space-y-6">
        {display.map((menu) => (
          <li
            key={menu.id}
            className="rounded-lg border border-neutral-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-neutral-800">{toText(menu.title)}</h3>
              <span className="text-emerald-700 font-medium">
                {toText(menu.priceText)}
              </span>
            </div>
            {toText(menu.description) && (
              <p className="mt-2 text-sm text-neutral-600">{toText(menu.description)}</p>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-4">
        <Link
          href="/menu"
          className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 font-medium text-neutral-700 hover:bg-neutral-50"
        >
          メニュー一覧を見る
        </Link>
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
