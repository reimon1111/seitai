import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { toText } from "@/lib/utils";
import type { ForWhomItem } from "@/types/microcms";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80";

const DEFAULT_ITEMS: { title: string; text: string }[] = [
  { title: "慢性的な肩こりに悩んでいる方", text: "デスクワークやスマホで固まった肩をほぐします" },
  { title: "産後の不調を改善したい方", text: "骨盤・体幹のバランスを整えていきます" },
  { title: "デスクワークで腰がつらい方", text: "姿勢のくせに合わせた施術で負担を軽く" },
  { title: "根本改善を目指したい方", text: "原因にアプローチし、再発しにくい体へ" },
];

type Props = {
  items: ForWhomItem[] | null;
};

/** list の要素（API 由来 or デフォルト） */
type ListItem = ForWhomItem | { id: string; title: string; text: string; order: number };

export function ForWhom({ items }: Props) {
  const list: ListItem[] = items?.length
    ? items
    : DEFAULT_ITEMS.map((d, i) => ({ id: `d-${i}`, title: d.title, text: d.text, order: i }));

  return (
    <section id="for-whom" className="scroll-mt-20 bg-neutral-50 py-[60px] md:scroll-mt-24 md:py-[120px]">
      <Container wide>
        <p className="font-serif text-sm tracking-[0.2em] text-primary-light">For whom</p>
        <h2 className="font-serif mt-2 text-[22px] font-medium text-neutral-900 md:text-3xl lg:text-4xl">
          こんな方におすすめ
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-12 md:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {list.map((item) => {
            const image = "image" in item && item.image && typeof item.image === "object" ? item.image : null;
            const imgUrl = image && "url" in image && typeof image.url === "string" ? image.url : PLACEHOLDER_IMAGE;
            const title = toText(item.title);
            const text = toText(item.text);
            return (
              <li key={item.id} className="flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                  <Image
                    src={imgUrl}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  />
                </div>
                <h3 className="font-serif mt-4 text-[18px] font-medium text-neutral-900 md:text-lg">
                  {title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-neutral-600 md:text-sm md:leading-relaxed">{text}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
