import Image from "next/image";
import { getSiteSettings, getMenus } from "@/lib/microcms";
import { toText, getImageUrl } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { getReserveUrl } from "@/lib/reserve";

export const revalidate = 60;

export const metadata = {
  title: "メニュー・料金",
  description: "施術メニューと料金のご案内。",
};

export default async function MenuPage() {
  const [settings, menus] = await Promise.all([
    getSiteSettings(),
    getMenus(),
  ]);

  const reserveMode = settings?.reserveMode ?? "link";
  const reserveUrl = getReserveUrl(reserveMode, settings?.reserveUrl);
  const reserveHref = reserveUrl ?? "/reserve";
  const reserveExternal = Boolean(reserveUrl);

  const orderNum = (m: { order?: unknown }) => {
    const o = m.order;
    if (o == null) return 0;
    const n = Number(o);
    return Number.isFinite(n) ? n : 0;
  };
  const sorted = [...menus].sort((a, b) => orderNum(a) - orderNum(b));
  const menuPageIntro = toText(settings?.menuPageIntro);

  return (
    <div className="py-8 sm:py-12">
      <Section subtitle="Menu" title="メニュー・料金">
        {menuPageIntro && (
          <p className="whitespace-pre-line text-neutral-600 leading-relaxed">
            {menuPageIntro}
          </p>
        )}
        <ul className={`space-y-12 border-t border-neutral-200 pt-12 ${menuPageIntro ? "mt-8" : ""}`}>
          {sorted.map((menu) => {
            const imageUrl = getImageUrl(menu.image);
            return (
              <li key={menu.id} className="border-b border-neutral-100 pb-12 last:border-b-0 last:pb-0">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,280px)_1fr]">
                  <div className="relative aspect-[4/3] w-full max-w-[280px] overflow-hidden bg-neutral-200 sm:aspect-[3/2]">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 639px) 100vw, 280px"
                      />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h2 className="font-serif text-lg font-medium text-primary">
                        {toText(menu.title)}
                      </h2>
                      <span className="font-medium text-neutral-700">
                        {toText(menu.priceText)}
                      </span>
                    </div>
                    {toText(menu.description) && (
                      <p className="mt-3 leading-relaxed text-neutral-600 whitespace-pre-line">{toText(menu.description)}</p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {sorted.length === 0 && (
          <p className="text-neutral-500">メニューはまだ登録されていません。</p>
        )}
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
  );
}
