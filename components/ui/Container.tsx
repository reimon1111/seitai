import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  wide?: boolean;
};

export function Container({ children, className = "", wide = false }: Props) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-10 lg:px-16 ${wide ? "max-w-7xl" : "max-w-5xl"} ${className}`}
    >
      {children}
    </div>
  );
}
