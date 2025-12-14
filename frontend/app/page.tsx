import HeroFloatingPhysics from "@/components/sections/HeroFloatingPhysics";
import { Section } from "@/components/sections/section";
import LetterReveal from "@/components/sections/LetterReveal";
import ShowcaseCarousel from "@/components/ShowcaseCarousel/ShowcaseCarousel";
import LinearPager from "@/components/nav/linear-pager";
import { createPageMetadata } from "@/lib/seo";
import SalmonScene from "@/components/experience/salmon-scene";
import SalmonMilestoneStack from "@/components/sections/SalmonMilestoneStack";

export const metadata = createPageMetadata({
  title: "Homepage — NBĐ: Nơi Bắt Đầu — Ngược Dòng",
  description:
    "Landing giới thiệu hành trình UEHG và Guitar Show 2026, dẫn dắt sponsor & sinh viên qua flow tuyến tính.",
});

export default function HomePage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <div className="-mt-10 md:-mt-12">
        <HeroFloatingPhysics />
      </div>

      <Section
        eyebrow="Scroll-driven 3D"
        title="Cá hồi bơi ngược dòng"
        description="Placeholder cho camera dọc sông 3D + chip thông tin bật theo bậc thác. Tích hợp Lenis + GSAP ScrollTrigger sau."
        backgroundPreset="riverNight"
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <SalmonScene />
          <SalmonMilestoneStack />
        </div>
      </Section>

      <LetterReveal />

      <ShowcaseCarousel />

      <LinearPager currentRoute="/" />
    </div>
  );
}
