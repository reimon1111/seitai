import { getSiteSettings } from "@/lib/microcms";
import { toText } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { ReserveForm } from "@/components/reserve/ReserveForm";
import { getReserveUrl } from "@/lib/reserve";
import { PageHead } from "@/components/layout/PageHead";

export const revalidate = 60;

export const metadata = {
  title: "ご予約",
  description: "ご予約はお電話またはWebから。",
};

const FAQ = [
  {
    q: "予約は何日前まで可能ですか？",
    a: "前日までご予約いただけます。当日はお電話でお問い合わせください。",
  },
  {
    q: "キャンセルはできますか？",
    a: "ご都合が悪くなった場合は、お早めにご連絡ください。",
  },
  {
    q: "初めてでも大丈夫ですか？",
    a: "はい。初めての方もお気軽にご来院ください。",
  },
];

export default async function ReservePage() {
  const settings = await getSiteSettings();

  const reserveMode = settings?.reserveMode ?? "link";
  const reserveUrl = getReserveUrl(reserveMode, settings?.reserveUrl);
  const reserveHref = reserveUrl ?? "/reserve";
  const reserveExternal = Boolean(reserveUrl);
  const isFormMode = reserveMode === "form";

  return (
    <>
      <PageHead title="ご予約" />
      <div className="py-8 sm:py-12">
        <Section>
        <div className="mb-8 text-neutral-600">
          <p>ご予約はお電話または下記よりお願いいたします。</p>
          {toText(settings?.phone) && (
            <p className="mt-2">
              電話:{" "}
              <a
                href={`tel:${toText(settings?.phone).replace(/\D/g, "")}`}
                className="text-emerald-600 hover:underline"
              >
                {toText(settings?.phone)}
              </a>
            </p>
          )}
        </div>

        {isFormMode ? (
          <div id="form" className="scroll-mt-24">
            <h3 className="mb-4 text-lg font-semibold text-neutral-800">
              予約リクエストフォーム
            </h3>
            <p className="mb-6 text-sm text-neutral-600">
              以下の内容で送信いただくと、折り返しご連絡いたします。
            </p>
            <ReserveForm />
          </div>
        ) : (
          <div className="mb-12 flex flex-col items-center gap-6 rounded-lg bg-neutral-50 p-8">
            <p className="text-center text-neutral-700">
              下のボタンから外部予約ページへ進んでください。
            </p>
            <CTAButton
              href={reserveHref}
              label="予約ページへ"
              external={reserveExternal}
              variant="primary"
              className="text-lg px-10 py-4"
            />
          </div>
        )}

        <div className="mt-14 border-t border-neutral-200 pt-10">
          <h3 className="text-lg font-semibold text-neutral-800">
            よくある質問
          </h3>
          <ul className="mt-4 space-y-6">
            {FAQ.map((item, i) => (
              <li key={i}>
                <p className="font-medium text-neutral-700">{item.q}</p>
                <p className="mt-1 text-sm text-neutral-600">{item.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      </div>
    </>
  );
}
