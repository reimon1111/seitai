import { getSiteSettings, getMenus, getTestimonials, getStaff, getForWhom, getWhyUs } from "@/lib/microcms";
import { toText } from "@/lib/utils";
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
import { ScrollToHash } from "@/components/ui/ScrollToHash";

export default async function HomePage() {
  let settings = null;
  let menus: Awaited<ReturnType<typeof getMenus>> = [];
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = [];
  let staffList: Awaited<ReturnType<typeof getStaff>> = [];
  let forWhomItems: Awaited<ReturnType<typeof getForWhom>> | null = null;
  let whyUsItems: Awaited<ReturnType<typeof getWhyUs>> | null = null;

  try {
    const [s, m, t, st, fw, wu] = await Promise.all([
      getSiteSettings(),
      getMenus(),
      getTestimonials(50),
      getStaff(),
      getForWhom(),
      getWhyUs(),
    ]);
    settings = s;
    menus = m ?? [];
    testimonials = t ?? [];
    staffList = st ?? [];
    forWhomItems = fw ?? null;
    whyUsItems = wu ?? null;
  } catch {
    // データ取得に失敗してもトップは表示する
  }

  const phone = toText(settings?.phone);
  const clinicName = toText(settings?.clinicName) || "整体院";
  const heroSlides = settings?.heroSlides ?? null;

  return (
    <>
      <ScrollToHash />
      <MainVisual
        slides={heroSlides}
        reserveHref="/reserve"
        reserveExternal={false}
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
          reserveHref="/reserve"
          reserveExternal={false}
        />
      </ScrollReveal>
      <ScrollReveal>
        <ReserveCTA
          reserveHref="/reserve"
          reserveExternal={false}
          phone={phone}
        />
      </ScrollReveal>
    </>
  );
}
