import HeroFloatingPhysics from "@/components/sections/HeroFloatingPhysics";
import { Section } from "@/components/sections/section";
import LetterReveal from "@/components/sections/LetterReveal";
import ShowcaseCarousel from "@/components/ShowcaseCarousel/ShowcaseCarousel";
import { Card } from "@/components/ui/card";
import LinearPager from "@/components/nav/linear-pager";
import { Button } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo";
import SalmonScene from "@/components/experience/salmon-scene";

export const metadata = createPageMetadata({
  title: "Homepage — NBĐ: Nơi Bắt Đầu — Ngược Dòng",
  description:
    "Landing giới thiệu hành trình UEHG và Guitar Show 2026, dẫn dắt sponsor & sinh viên qua flow tuyến tính.",
});

const waterfallChips = [
  "Thành lập 09/09/2011",
  "Show quy mô 1000+",
  "FB 27K likes — 30K follows",
  "Gây quỹ thiện nguyện 150M+",
];

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
        <div className="grid gap-6 md:grid-cols-2">
          <SalmonScene />
          <div className="grid gap-3">
            {waterfallChips.map((chip) => (
              <Card key={chip} className="p-4">
                <p className="text-sm uppercase tracking-[0.18em] text-foam/60">Mốc</p>
                <p className="text-lg font-semibold text-foam">{chip}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <LetterReveal />

      <ShowcaseCarousel />

      <LinearPager currentRoute="/" />
    </div>
  );
}
