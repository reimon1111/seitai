"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionLink } from "@/components/ui/SectionLink";
import { toText, getOrderFromItem } from "@/lib/utils";
import type { Staff } from "@/types/microcms";

const PLACEHOLDER_PHOTO = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80";

type Props = {
  staffList: Staff[];
};

/** list の要素（API 由来 or デフォルト） */
type ListItem =
  | Staff
  | { id: string; name: string; role?: string; order: number; photo?: { url?: string } };

export function StaffProfile({ staffList }: Props) {
  const sorted = [...staffList].sort(
    (a, b) => getOrderFromItem(a as Record<string, unknown>) - getOrderFromItem(b as Record<string, unknown>)
  );
  const list: ListItem[] = sorted.length
    ? sorted
    : [{ id: "1", name: "施術者名", role: "院長", order: 0 }];

  return (
    <section id="staff" className="bg-neutral-50 py-[60px] md:py-[120px]">
      <Container wide>
        <p className="font-serif text-sm tracking-[0.2em] text-primary-light">Staff</p>
        <h2 className="font-serif mt-2 text-[22px] font-medium text-neutral-900 md:text-3xl lg:text-4xl">
          施術者紹介
        </h2>
        <div className="mt-10 overflow-x-auto overflow-y-hidden pb-6 -mx-4 px-4 md:mt-16 md:-mx-6 md:px-6 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16">
          <ul className="flex w-max flex-nowrap list-none p-0 m-0 min-w-0 snap-x snap-mandatory [&>li]:mr-3 [&>li:last-child]:mr-0">
            {list.map((staff) => (
              <li
                key={staff.id}
                className="shrink-0 list-none m-0 p-0 w-[180px] snap-center sm:w-[200px] lg:w-[220px]"
              >
                <Link
                  href={`/staff#staff-${String(staff.id).replace(/\s+/g, "-")}`}
                  className="group block bg-white shadow-md shadow-neutral-200/80 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-300/60 hover:-translate-y-0.5"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-200">
                    <Image
                      src={staff.photo?.url ?? PLACEHOLDER_PHOTO}
                      alt=""
                      fill
                      className="object-cover transition duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 639px) 180px, (max-width: 1023px) 200px, 220px"
                    />
                  </div>
                  <div className="px-3 pb-3 pt-3 sm:px-3.5 sm:pb-4 sm:pt-3.5">
                    <p className="font-serif text-xs tracking-[0.12em] text-primary-light">
                      {toText(staff.role) || "施術者"}
                    </p>
                    <p className="font-serif mt-1 text-base font-medium text-neutral-900 sm:text-lg">
                      {toText(staff.name)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <SectionLink href="/staff">施術者紹介の詳細を見る</SectionLink>
      </Container>
    </section>
  );
}
