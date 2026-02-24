"use client";

import Link from "next/link";

type Props = {
  href: string;
  label?: string;
  external?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
};

export function CTAButton({
  href,
  label = "予約する",
  external = false,
  variant = "primary",
  className = "",
}: Props) {
  const base =
    "flex h-12 w-full items-center justify-center px-8 py-3.5 text-center text-[15px] font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-400 md:inline-flex md:h-auto md:w-auto md:text-sm";
  const styles =
    variant === "primary"
      ? "border border-primary bg-primary text-white hover:bg-primary-hover hover:border-primary-hover focus:ring-primary"
      : "border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50 focus:ring-neutral-400";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${styles} ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {label}
    </Link>
  );
}
