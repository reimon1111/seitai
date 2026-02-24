"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionLink } from "@/components/ui/SectionLink";
import { toText, getImageUrl } from "@/lib/utils";
import type { Menu } from "@/types/microcms";

type Props = {
  menus: Menu[];
};

export function MenuBrief({ menus }: Props) {
  const featured = menus
    .filter((m) => m.isFeatured === true)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const display =
    featured.length > 0
      ? featured.slice(0, 4)
      : [
          { id: "1", title: "全身整体", priceText: "5,500円〜", description: "お身体全体のバランスを整えます", order: 0 },
          { id: "2", title: "骨盤矯正", priceText: "4,400円〜", description: "骨盤のゆがみにアプローチします", order: 1 },
          { id: "3", title: "産後ケア", priceText: "5,500円〜", description: "産後の体調改善をサポートします", order: 2 },
          { id: "4", title: "肩こり・腰痛", priceText: "4,400円〜", description: "つらい症状に丁寧にアプローチします", order: 3 },
        ];

  const ref = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0.2, 0.45], [1.08, 1]);

  return (
    <section id="menu" ref={ref} className="bg-white py-[60px] md:py-[120px]">
      <Container wide>
        <p className="font-serif text-sm tracking-[0.2em] text-primary-light">Menu</p>
        <h2 className="font-serif mt-2 text-[22px] font-medium text-neutral-900 md:text-3xl lg:text-4xl">
          施術メニュー
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-10 md:mt-16 md:gap-12 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-20">
          {display.map((menu) => {
            const imageUrl = getImageUrl("image" in menu ? menu.image : undefined);
            return (
              <li
                key={menu.id}
                className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_1fr] sm:items-center"
              >
                <motion.div
                  className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200"
                  style={mounted ? { scale } : { transform: "none" }}
                >
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 639px) 100vw, 50vw"
                    />
                  ) : null}
                </motion.div>
                <div>
                  <h3 className="font-serif text-[18px] font-medium text-primary md:text-xl lg:text-2xl">
                    {toText(menu.title)}
                  </h3>
                  <p className="mt-2 text-[15px] font-medium text-neutral-700 md:text-base">
                    {toText(menu.priceText)}
                  </p>
                  {toText(menu.description) && (
                    <p className="mt-4 text-[15px] leading-[1.7] text-neutral-600 md:leading-relaxed">
                      {toText(menu.description)}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <SectionLink href="/menu">メニュー・料金の詳細を見る</SectionLink>
      </Container>
    </section>
  );
}
