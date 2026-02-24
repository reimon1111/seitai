"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { toText } from "@/lib/utils";
import type { SiteSettings } from "@/types/microcms";

const DEFAULT_CONCEPT = `当院では、一人ひとりのお身体の状態やお悩みに丁寧に耳を傾け、
無理のない施術で根本改善をお手伝いします。
「また来たい」と思っていただける、安心の空間づくりを心がけています。`;

const DEFAULT_CONCEPT_IMAGE = "/concept-counseling.png";

type Props = {
  settings: SiteSettings | null;
};

export function Concept({ settings }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.4], [60, -40]);
  const scale = useTransform(scrollYProgress, [0.1, 0.35], [1.05, 1]);

  const conceptText = toText(settings?.conceptText) || DEFAULT_CONCEPT;
  // サイト設定でコンセプト画像が設定されていれば必ずそれを使用、未設定時のみデフォルト画像
  const conceptImageUrl =
    settings?.conceptImage?.url && String(settings.conceptImage.url).trim()
      ? settings.conceptImage.url
      : DEFAULT_CONCEPT_IMAGE;

  return (
    <section
      ref={ref}
      id="concept"
      className="scroll-mt-20 grid min-h-0 grid-cols-1 bg-white pt-8 md:scroll-mt-24 md:min-h-[70vh] md:pt-0 lg:grid-cols-2"
    >
      <div className="relative order-1 min-h-[280px] w-full md:min-h-[320px] lg:min-h-0">
        <motion.div
          className="absolute inset-0 lg:inset-0"
          style={mounted ? { y, scale } : { transform: "none" }}
        >
          <Image
            src={conceptImageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1023px) 100vw, 50vw"
          />
        </motion.div>
      </div>
      <div className="order-2 flex flex-col justify-center px-4 py-[60px] sm:px-10 sm:py-[120px] lg:px-16 lg:py-[120px] xl:px-24">
        <p className="font-serif text-sm tracking-[0.2em] text-primary-light">Concept</p>
        <h2 className="font-serif mt-2 text-[22px] font-medium text-neutral-900 md:text-3xl lg:text-4xl">
          コンセプト
        </h2>
        <p className="mt-6 text-[15px] leading-[1.7] text-neutral-600 whitespace-pre-line md:mt-8 md:leading-[2]">
          {conceptText}
        </p>
        <p className="mt-6 text-[15px] leading-[1.7] text-neutral-700 md:mt-8">
          <strong className="font-medium">国家資格保有</strong>・
          <strong className="font-medium">完全予約制</strong>・
          <strong className="font-medium">丁寧なカウンセリング</strong>で、
          あなたの「つらい」に寄り添います。
        </p>
      </div>
    </section>
  );
}
