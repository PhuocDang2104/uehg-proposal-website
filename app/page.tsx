import HeroFloatingPhysics from "@/components/sections/HeroFloatingPhysics";
import { Section } from "@/components/sections/section";
import LetterReveal from "@/components/sections/LetterReveal";
import { Card } from "@/components/ui/card";
import LinearPager from "@/components/nav/linear-pager";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
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
    <div className="space-y-10 md:space-y-12">
      <HeroFloatingPhysics />

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

      <Section
        eyebrow="Quick Proof Strip"
        title="Đối tác & nghệ sĩ tiêu biểu"
        description="Hàng logo ngang (hover ripple) + nút xem toàn bộ Social Proof."
        backgroundPreset="emberBloom"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["Nghệ sĩ A", "Nghệ sĩ B", "Đối tác C", "Đối tác D"].map((item) => (
            <Reveal key={item}>
              <Card className="flex h-full flex-col justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.16em] text-foam/60">Placeholder</p>
                  <p className="text-lg font-semibold text-foam">{item}</p>
                </div>
                <Badge className="mt-4 w-fit">Hover ripple</Badge>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href="/social-proof" variant="ghost" size="sm">
            Xem Social Proof
          </Button>
          <Button href="/sponsorship" size="sm">
            Nhận hồ sơ tài trợ
          </Button>
          <Button href="/contact" variant="secondary" size="sm">
            Đăng ký quan tâm/Đặt vé
          </Button>
        </div>
      </Section>

      <LinearPager currentRoute="/" />
    </div>
  );
}
