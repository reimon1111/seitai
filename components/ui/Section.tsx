import { type ReactNode } from "react";
import { Container } from "./Container";

type Props = {
  children: ReactNode;
  /** ローマ字サブタイトル（タイトル上に表示） */
  subtitle?: string;
  title?: string;
  id?: string;
  className?: string;
};

export function Section({ children, subtitle, title, id, className = "" }: Props) {
  return (
    <section id={id} className={`py-[60px] md:py-[120px] ${className}`}>
      <Container wide>
        {title && (
          <>
            {subtitle && (
              <p className="font-serif text-sm tracking-[0.2em] text-primary-light">{subtitle}</p>
            )}
            <h2 className={`font-serif text-[22px] font-medium text-neutral-900 md:text-2xl sm:text-3xl ${subtitle ? "mt-2" : ""} mb-8 md:mb-12`}>
              {title}
            </h2>
          </>
        )}
        {children}
      </Container>
    </section>
  );
}
