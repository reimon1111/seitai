"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-xl font-semibold text-neutral-800">エラーが発生しました</h1>
      <p className="mt-2 text-center text-neutral-600">
        しばらくしてから再度お試しください。
      </p>
      {isDev && error?.message && (
        <pre className="mt-4 max-w-full overflow-auto rounded bg-red-50 p-4 text-left text-sm text-red-800">
          {error.message}
        </pre>
      )}
      <button
        onClick={reset}
        className="mt-8 rounded-lg bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-700"
      >
        再試行
      </button>
    </div>
  );
}
