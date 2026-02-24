import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold text-neutral-800">ページが見つかりません</h1>
      <p className="mt-2 text-center text-neutral-600">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
        >
          トップ
        </Link>
        <Link href="/menu" className="rounded-lg border border-neutral-300 px-6 py-3 font-medium text-neutral-700 hover:bg-neutral-50">
          メニュー
        </Link>
        <Link href="/access" className="rounded-lg border border-neutral-300 px-6 py-3 font-medium text-neutral-700 hover:bg-neutral-50">
          アクセス
        </Link>
        <Link href="/reserve" className="rounded-lg border border-neutral-300 px-6 py-3 font-medium text-neutral-700 hover:bg-neutral-50">
          予約
        </Link>
      </div>
    </div>
  );
}
