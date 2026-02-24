"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="ja">
      <body style={{ fontFamily: "sans-serif", padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ color: "#b91c1c" }}>エラーが発生しました</h1>
        <p>しばらくしてから再度お試しください。</p>
        {isDev && error?.message && (
          <pre
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#fef2f2",
              borderRadius: "8px",
              overflow: "auto",
              fontSize: "12px",
            }}
          >
            {error.message}
          </pre>
        )}
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "#059669",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          再試行
        </button>
      </body>
    </html>
  );
}
