"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { toText } from "@/lib/utils";
import type { HeroSlide } from "@/types/microcms";

const DEFAULT_SLIDES: { id: string; image: string; catchCopy: string; subCopy: string }[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80",
    catchCopy: "心と体を整え、",
    subCopy: "本来の自分らしさを取り戻す",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1920&q=80",
    catchCopy: "丁寧な施術で、",
    subCopy: "根本から改善をサポートします",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80",
    catchCopy: "あなたの「つらい」に、",
    subCopy: "寄り添います",
  },
];

type Props = {
  slides: HeroSlide[] | null;
  reserveHref: string;
  reserveExternal: boolean;
  phone: string;
  clinicName: string;
};

function normalizeSlides(slides: HeroSlide[] | null): { id: string; image: string; catchCopy: string; subCopy: string }[] {
  if (!slides?.length) return DEFAULT_SLIDES;
  return slides.map((s, i) => ({
    id: (s as { id?: string }).id ?? `slide-${i}`,
    image: s.image?.url ?? DEFAULT_SLIDES[i % DEFAULT_SLIDES.length]!.image,
    catchCopy: toText(s.catchCopy),
    subCopy: toText(s.subCopy),
  }));
}

export function MainVisual({ slides, reserveHref, reserveExternal, phone, clinicName }: Props) {
  const list = normalizeSlides(slides);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const safeReduceMotion = mounted ? reduceMotion : false;
  const tel = phone.replace(/\D/g, "");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 80]);

  useEffect(() => {
    if (safeReduceMotion) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % list.length), 5000);
    return () => clearInterval(id);
  }, [safeReduceMotion, list.length]);

  return (
    <section
      ref={sectionRef}
      id="main"
      className="relative min-h-[100vh] w-full overflow-hidden md:min-h-screen"
    >
      {list.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0"
          style={{ zIndex: i === index ? 10 : 0 }}
        >
          <motion.div
            className="absolute inset-0"
            style={mounted && !safeReduceMotion ? { scale } : { transform: "none" }}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={i === 0}
            />
          </motion.div>
          <div
            className="absolute inset-0 bg-black/55"
            aria-hidden
          />
          <AnimatePresence mode="wait">
            {i === index && (
              <motion.div
                key={slide.id}
                initial={safeReduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center md:items-start md:justify-end md:px-0 md:text-left md:pb-28 md:pl-16 lg:pb-32 lg:pl-24"
              >
                <motion.div
                  className="flex w-full max-w-2xl flex-col items-center md:items-start md:pl-0"
                  style={mounted && !safeReduceMotion ? { y } : { transform: "none" }}
                >
                  <p className="font-serif text-xs tracking-[0.25em] text-white/90 sm:text-sm">
                    {clinicName}
                  </p>
                  <h1 className="font-serif mt-3 text-white">
                    <span className="block text-[28px] font-medium leading-relaxed md:text-2xl lg:text-3xl">
                      {slide.catchCopy}
                    </span>
                    <span className="mt-1 block text-[15px] font-normal leading-relaxed text-white/95 md:text-lg lg:text-xl">
                      {slide.subCopy}
                    </span>
                  </h1>
                  <div className="mt-10 flex w-[60%] flex-col gap-3 md:w-full md:flex-row md:flex-wrap md:gap-4">
                    <a
                      href={reserveHref}
                      {...(reserveExternal && { target: "_blank", rel: "noopener noreferrer" })}
                      className="flex h-12 w-full items-center justify-center border border-white bg-white text-[15px] font-medium text-primary transition hover:bg-white/95 md:inline-flex md:h-auto md:w-auto md:px-8 md:py-3.5 md:text-sm"
                    >
                      予約する
                    </a>
                    <a
                      href={tel ? `tel:${tel}` : "#"}
                      className="flex h-12 w-full items-center justify-center border border-white text-[15px] font-medium text-white transition hover:bg-white/10 md:inline-flex md:h-auto md:w-auto md:px-8 md:py-3.5 md:text-sm"
                    >
                      電話する
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {list.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`スライド${i + 1}へ`}
            onClick={() => setIndex(i)}
            className={`h-1 min-w-[6px] rounded-full transition-all duration-300 ${
              i === index ? "w-10 bg-white" : "w-6 bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
