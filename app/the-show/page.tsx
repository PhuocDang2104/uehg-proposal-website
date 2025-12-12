import LinearPager from "@/components/nav/linear-pager";
import { Section } from "@/components/sections/section";
import { PageHeader } from "@/components/sections/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "The Show — NBĐ Ngược Dòng",
  description: "Banner concept + lịch sử show UEHG, key visual cá hồi & thác nước.",
});

const chapters = [
  { title: "Dòng chảy khát vọng", detail: "Cinematic copy ngắn, mở màn bằng ánh phản chiếu." },
  {
    title: "Bền bỉ ngược dòng",
    detail: "Kết hợp ripple transition khi scroll, tôn vinh ý chí cá hồi.",
  },
  { title: "Trở về nơi bắt đầu", detail: "Cao trào kết, mở ra CTA đặt vé/sponsorship." },
];

const pastShows = [
  { name: "NBĐ 2023 — Set Fire", note: "Sold-out, tạo tiếng vang trẻ trung" },
  { name: "Khúc Giao Mùa", note: "800 vé / 2 giờ, vibe mùa" },
  { name: "Hành trình trao yêu thương", note: "CSR xuyên suốt, gây quỹ 150M+" },
  { name: "UEH Youth Festival", note: "Booking band, giao lưu cộng đồng" },
];

export default function TheShowPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <PageHeader
        eyebrow="The Show"
        title="NBĐ — Ngược Dòng"
        subtitle="Key visual: cá hồi, thác nước, ánh phản chiếu. Hero dùng ripple/splash reveal."
      />

      <Section
        eyebrow="Top Banner"
        title="Banner & thông tin"
        description="Slot key visual NBĐ; Info block: 1000+ sinh viên | Hội trường A.116 UEH | 17:30–21:30, 25/01/2026."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="space-y-3">
            <Badge variant="glow">Key visual</Badge>
            <p className="text-foam">Placeholder hình cá hồi & thác nước.</p>
            <p className="text-sm text-foam/70">
              Motion hero: ripple / splash reveal theo nhịp scroll, giới hạn camera move.
            </p>
          </Card>
          <div className="grid gap-4">
            {chapters.map((chapter) => (
              <Reveal key={chapter.title}>
                <Card className="space-y-2">
                  <h3 className="text-lg font-semibold text-foam">{chapter.title}</h3>
                  <p className="text-foam/80">{chapter.detail}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Past Shows"
        title="All Past Shows"
        description="Card lớn cho NBĐ 2023, Khúc Giao Mùa, Hành trình trao yêu thương; grid nhỏ cho chương trình khác."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {pastShows.slice(0, 3).map((show) => (
            <Card key={show.name} className="space-y-2">
              <Badge variant="glow">Recap</Badge>
              <h3 className="text-xl font-semibold text-foam">{show.name}</h3>
              <p className="text-foam/80">{show.note}</p>
            </Card>
          ))}
          <Card className="space-y-2">
            <Badge>Grid nhỏ</Badge>
            <p className="text-foam/80">
              Placeholder danh sách các chương trình phụ (UEH Youth Festival, booking band, giao
              lưu...).
            </p>
          </Card>
        </div>
      </Section>

      <LinearPager currentRoute="/the-show" />
    </div>
  );
}
