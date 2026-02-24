import { Section } from "@/components/ui/Section";
import { PageHead } from "@/components/layout/PageHead";

export const metadata = {
  title: "プライバシーポリシー",
  description: "プライバシーポリシー。",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHead title="プライバシーポリシー" />
      <div className="py-8 sm:py-12">
        <Section>
        <div className="prose prose-sm max-w-none text-neutral-600">
          <p className="mb-4">
            当院では、お客様の個人情報の保護を大切にしています。
          </p>
          <h3 className="mt-6 font-semibold text-neutral-800">
            1. 収集する情報
          </h3>
          <p className="mt-2">
            ご予約・お問い合わせの際に、お名前・電話番号・メールアドレス等をいただく場合があります。
          </p>
          <h3 className="mt-6 font-semibold text-neutral-800">
            2. 利用目的
          </h3>
          <p className="mt-2">
            ご予約の確認・ご連絡、サービス向上のためのみに利用します。
          </p>
          <h3 className="mt-6 font-semibold text-neutral-800">
            3. 第三者提供
          </h3>
          <p className="mt-2">
            法令に基づく場合を除き、お客様の同意なく第三者に提供することはありません。
          </p>
          <p className="mt-8 text-sm text-neutral-500">
            制定日: 2025年1月／改定は当ページでお知らせします。
          </p>
        </div>
      </Section>
      </div>
    </>
  );
}
