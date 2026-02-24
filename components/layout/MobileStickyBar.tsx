"use client";

import { toText } from "@/lib/utils";
import type { SiteSettings } from "@/types/microcms";

type Props = {
  settings: SiteSettings | null;
};

export function MobileStickyBar({ settings }: Props) {
  const tel = toText(settings?.phone).replace(/\D/g, "");

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex gap-3 border-t border-neutral-200 bg-white/98 px-4 py-3 backdrop-blur-sm sm:hidden"
      role="navigation"
      aria-label="予約・電話"
    >
      <a
        href={tel ? `tel:${tel}` : "#"}
        className="flex flex-1 items-center justify-center gap-2 border border-neutral-300 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
      >
        <span aria-hidden>📞</span>
        電話
      </a>
      <a
        href="/reserve"
        className="flex flex-1 items-center justify-center border border-primary bg-primary py-3 text-sm font-medium text-white hover:bg-primary-hover hover:border-primary-hover"
      >
        予約する
      </a>
    </div>
  );
}
