import Image from "next/image";
import { getSiteSettings, getStaff } from "@/lib/microcms";
import { toText, getOrderFromItem } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { getReserveUrl } from "@/lib/reserve";
import { ScrollToHash } from "@/components/ui/ScrollToHash";

export const revalidate = 60;

export const metadata = {
  title: "施術者紹介",
  description: "施術者のご紹介。",
};

export default async function StaffPage() {
  const [settings, staffList] = await Promise.all([
    getSiteSettings(),
    getStaff(),
  ]);

  const reserveMode = settings?.reserveMode ?? "link";
  const reserveUrl = getReserveUrl(reserveMode, settings?.reserveUrl);
  const reserveHref = reserveUrl ?? "/reserve";
  const reserveExternal = Boolean(reserveUrl);

  const pageIntro = toText(settings?.staffPageIntro);
  const sorted = [...staffList].sort(
    (a, b) => getOrderFromItem(a as Record<string, unknown>) - getOrderFromItem(b as Record<string, unknown>)
  );

  return (
    <div className="py-8 sm:py-12">
      <ScrollToHash />
      <Section subtitle="Staff" title="施術者紹介">
        {pageIntro && (
          <p className="whitespace-pre-line leading-relaxed text-neutral-600">
            {pageIntro}
          </p>
        )}
        <ul className={`mt-12 space-y-16 border-t border-neutral-200 pt-12 ${pageIntro ? "mt-8" : ""}`}>
          {sorted.map((staff) => (
            <li
              key={staff.id}
              id={`staff-${String(staff.id).replace(/\s+/g, "-")}`}
              className={`scroll-mt-24 grid grid-cols-1 gap-10 border-b border-neutral-100 pb-16 last:border-b-0 last:pb-0 ${staff.photo?.url ? "sm:grid-cols-[200px_1fr]" : ""}`}
            >
              {staff.photo?.url && (
                <div className="relative aspect-[3/4] w-full max-w-[200px] overflow-hidden bg-neutral-100">
                  <Image
                    src={staff.photo.url}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="font-serif text-xl font-medium text-neutral-900">
                  {toText(staff.name)}
                </h2>
                {toText(staff.role) && (
                  <p className="mt-1 text-sm text-neutral-600">{toText(staff.role)}</p>
                )}
                {staff.qualifications && staff.qualifications.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2 text-sm text-neutral-600">
                    {staff.qualifications.map((q, i) => (
                      <li key={i}>
                        {typeof q === "string" ? q : toText(q)}
                      </li>
                    ))}
                  </ul>
                )}
                {toText(staff.bio) && (
                  <div className="mt-6">
                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                      経歴
                    </span>
                    <p className="mt-2 whitespace-pre-line leading-relaxed text-neutral-600">
                      {toText(staff.bio)}
                    </p>
                  </div>
                )}
                {toText(staff.message) && (
                  <div className="mt-6 border-l-2 border-neutral-200 pl-4">
                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                      ひとこと
                    </span>
                    <p className="mt-2 whitespace-pre-line leading-relaxed text-neutral-700">
                      {toText(staff.message)}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
        {sorted.length === 0 && (
          <p className="text-neutral-500">スタッフ情報はまだ登録されていません。</p>
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
