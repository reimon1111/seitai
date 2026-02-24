"use client";

import Link from "next/link";

export function FixedCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:block" aria-hidden>
      <Link
        href="/reserve"
        className="flex items-center justify-center border border-primary bg-primary px-6 py-4 text-sm font-medium text-white transition hover:bg-primary-hover hover:border-primary-hover"
      >
        予約する
      </Link>
    </div>
  );
}
