"use client";

import { MainVisual } from "@/components/top/MainVisual";
import { ScrollReveal } from "@/components/top/ScrollReveal";
import { Concept } from "@/components/top/Concept";
import { ForWhom } from "@/components/top/ForWhom";
import { WhyUs } from "@/components/top/WhyUs";
import { MenuBrief } from "@/components/top/MenuBrief";
import { TestimonialsSection } from "@/components/top/TestimonialsSection";
import { StaffProfile } from "@/components/top/StaffProfile";
import { AccessSection } from "@/components/top/AccessSection";
import { ReserveCTA } from "@/components/top/ReserveCTA";
import type { HeroSlide } from "@/types/microcms";
import type { ForWhomItem } from "@/types/microcms";
import type { WhyUsItem } from "@/types/microcms";
import type { Menu } from "@/types/microcms";
import type { Testimonial } from "@/types/microcms";
import type { Staff } from "@/types/microcms";
import type { SiteSettings } from "@/types/microcms";

type Props = {
  heroSlides: HeroSlide[] | null;
  reserveHref: string;
  reserveExternal: boolean;
  phone: string;
  clinicName: string;
  forWhomItems: ForWhomItem[] | null;
  whyUsItems: WhyUsItem[] | null;
  menus: Menu[];
  testimonials: Testimonial[];
  staffList: Staff[];
  settings: SiteSettings | null;
};

export function HomeContent({
  heroSlides,
  reserveHref,
  reserveExternal,
  phone,
  clinicName,
  forWhomItems,
  whyUsItems,
  menus,
  testimonials,
  staffList,
  settings,
}: Props) {
  return (
    <>
      <MainVisual
        slides={heroSlides}
        reserveHref={reserveHref}
        reserveExternal={reserveExternal}
        phone={phone}
        clinicName={clinicName}
      />
      <ScrollReveal>
        <Concept settings={settings} />
      </ScrollReveal>
      <ScrollReveal>
        <ForWhom items={forWhomItems} />
      </ScrollReveal>
      <ScrollReveal>
        <WhyUs items={whyUsItems} />
      </ScrollReveal>
      <ScrollReveal>
        <MenuBrief menus={menus} />
      </ScrollReveal>
      <ScrollReveal>
        <TestimonialsSection testimonials={testimonials} />
      </ScrollReveal>
      <ScrollReveal>
        <StaffProfile staffList={staffList} />
      </ScrollReveal>
      <ScrollReveal>
        <AccessSection
          settings={settings}
          reserveHref={reserveHref}
          reserveExternal={reserveExternal}
        />
      </ScrollReveal>
      <ScrollReveal>
        <ReserveCTA
          reserveHref={reserveHref}
          reserveExternal={reserveExternal}
          phone={phone}
        />
      </ScrollReveal>
    </>
  );
}
