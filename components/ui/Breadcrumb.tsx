"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PATH_LABELS: Record<string, string> = {
  "/": "ホーム",
  "/menu": "メニュー・料金",
  "/testimonials": "お客様の声",
  "/staff": "施術者紹介",
  "/access": "アクセス",
  "/reserve": "ご予約",
  "/privacy": "プライバシーポリシー",
};

function getBreadcrumbItems(pathname: string): { path: string; label: string }[] {
  if (!pathname || pathname === "/") {
    return [];
  }
  const segments = pathname.split("/").filter(Boolean);
  const items: { path: string; label: string }[] = [{ path: "/", label: "ホーム" }];
  let acc = "";
  for (const seg of segments) {
    acc += `/${seg}`;
    items.push({
      path: acc,
      label: PATH_LABELS[acc] ?? seg,
    });
  }
  return items;
}

export function Breadcrumb() {
  const pathname = usePathname();
  const items = getBreadcrumbItems(pathname ?? "/");

  if (items.length === 0) return null;

  return (
    <nav aria-label="パンくず" className="text-xs text-neutral-500">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 sm:gap-x-2">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-x-1.5 sm:gap-x-2">
              {i > 0 && (
                <span aria-hidden className="shrink-0 select-none text-neutral-400" role="separator">
                  →
                </span>
              )}
              {isLast ? (
                <span className="font-medium text-neutral-800" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-1 rounded"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
