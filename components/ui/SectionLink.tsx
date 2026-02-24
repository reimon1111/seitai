import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** セクション下部の「詳細を見る」用・クオリティの高いCTAボタン */
export function SectionLink({ href, children, className = "" }: Props) {
  return (
    <div className={`mt-10 md:mt-16 ${className}`}>
      <Link
        href={href}
        className="group flex h-12 w-full items-center justify-center gap-3 border-2 border-primary bg-primary text-[15px] font-medium text-white transition hover:bg-primary-hover hover:border-primary-hover md:inline-flex md:h-auto md:w-auto md:px-8 md:py-4 md:text-sm"
      >
        {children}
        <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      </Link>
    </div>
  );
}
