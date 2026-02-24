import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { toText } from "@/lib/utils";
import type { WhyUsItem } from "@/types/microcms";

const DEFAULT_REASONS = [
  {
    title: "国家資格を持つ施術者が対応",
    text: "国家資格を保有した施術者が、身体の状態を正しく見極め施術を行います。\n専門知識と経験に基づいた、安全で信頼できる整体をご提供します。",
    image: "/why-us-01.png",
  },
  {
    title: "原因にアプローチする根本施術",
    text: "痛みのある部分だけでなく、身体全体のバランスを整えます。\n不調の原因から改善を目指し、快適な状態へ導きます。",
    image: "/why-us-02.png",
  },
  {
    title: "長野に根ざした地域密着の整体院",
    text: "地域の皆さまに寄り添い、一人ひとりに丁寧な施術を行っています。\n安心して長く通える整体院を目指しています。",
    image: "/why-us-03.png",
  },
];

type Props = {
  items: WhyUsItem[] | null;
};

/** list の要素（API 由来 or デフォルト） */
type ListItem =
  | WhyUsItem
  | { id: string; title: string; text: string; order: number; image: string };

export function WhyUs({ items }: Props) {
  const list: ListItem[] = items?.length
    ? items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : DEFAULT_REASONS.map((d, i) => ({
        id: `d-${i}`,
        title: d.title,
        text: d.text,
        order: i,
        image: d.image,
      }));

  return (
    <section id="why-us" className="scroll-mt-20 bg-white py-[60px] md:scroll-mt-24 md:py-[120px]">
      <Container wide>
        <p className="font-serif text-sm tracking-[0.2em] text-primary-light">Why us</p>
        <h2 className="font-serif mt-2 text-[22px] font-medium text-neutral-900 md:text-3xl lg:text-4xl">
          選ばれる理由
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-12 border-t border-neutral-200 pt-10 md:mt-16 md:gap-16 md:pt-16 sm:grid-cols-3 sm:gap-12 sm:pt-20">
          {list.map((r, i) => {
            const num = `0${i + 1}`;
            const title = toText(r.title);
            const rawText = r.text;
            const text = typeof rawText === "string" ? rawText : toText(rawText);
            const image = "image" in r && r.image && typeof r.image === "object" ? r.image : null;
            const imgUrlFromObj = image && "url" in image && typeof image.url === "string" ? image.url : null;
            const imgUrlFromStr = "image" in r && typeof (r as { image?: string }).image === "string" ? (r as { image: string }).image : null;
            const imgUrl = imgUrlFromObj ?? imgUrlFromStr ?? "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80";
            return (
              <li
                key={r.id}
                className="flex flex-col sm:border-l sm:border-neutral-200 sm:pl-10 first:sm:border-l-0 first:sm:pl-0"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={imgUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, 33vw"
                  />
                </div>
                <span className="font-serif mt-4 block text-3xl font-medium text-primary md:text-4xl sm:text-5xl">
                  {num}
                </span>
                <h3 className="font-serif mt-2 text-[18px] font-medium text-neutral-900 md:text-lg">
                  {title}
                </h3>
                {text && (
                  <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.7] text-neutral-600 md:text-sm md:leading-relaxed">{text}</p>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
