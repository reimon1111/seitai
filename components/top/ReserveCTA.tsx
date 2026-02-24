type Props = {
  reserveHref: string;
  reserveExternal: boolean;
  phone: string;
};

export function ReserveCTA({ reserveHref, reserveExternal, phone }: Props) {
  const tel = phone.replace(/\D/g, "");

  return (
    <section
      id="reserve"
      className="relative py-[60px] overflow-hidden bg-neutral-900 bg-cover bg-center bg-no-repeat md:py-[140px]"
      style={{ backgroundImage: "url(/reserve-cta-bg.png)" }}
    >
      <div className="absolute inset-0 bg-black/45" aria-hidden />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-10">
        <p className="font-serif text-sm tracking-[0.25em] text-neutral-400">Reserve</p>
        <h2 className="font-serif mt-3 text-[22px] font-medium text-white md:text-4xl lg:text-5xl">
          ご予約・お問い合わせ
        </h2>
        <p className="mt-6 text-[15px] leading-[1.7] text-neutral-300 md:text-lg md:leading-relaxed">
          お身体のことでお悩みでしたら、お気軽にご連絡ください。
          <br className="hidden sm:inline" />
          お電話またはWebからご予約いただけます。
        </p>
        <div className="mt-10 flex flex-col gap-3 md:mt-14 md:flex-row md:items-center md:justify-center md:gap-6">
          <a
            href={reserveHref}
            {...(reserveExternal && { target: "_blank", rel: "noopener noreferrer" })}
            className="group flex h-12 w-full items-center justify-center gap-3 bg-white text-[15px] font-medium text-neutral-900 transition hover:bg-neutral-100 md:max-w-xs md:px-10 md:py-5 md:text-base"
          >
            <span>Webで予約する</span>
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
          </a>
          <a
            href={tel ? `tel:${tel}` : "#"}
            className="group flex h-12 w-full items-center justify-center gap-3 border-2 border-white text-[15px] font-medium text-white transition hover:bg-white/10 md:max-w-xs md:px-10 md:py-5 md:text-base"
          >
            <span aria-hidden>📞</span>
            <span>電話で予約する</span>
          </a>
        </div>
      </div>
    </section>
  );
}
