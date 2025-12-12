import LinearPager from "@/components/nav/linear-pager";
import { Section } from "@/components/sections/section";
import { PageHeader } from "@/components/sections/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Sponsorship — Lời mời hợp tác",
  description: "Trang chuyển đổi chính: thư mời, gói tài trợ, quyền lợi, CTA đặt lịch/tải kit.",
});

const packages = [
  { name: "Kim cương", price: "24M", note: "Brand tối đa + hiện kim/hiện vật quy đổi 70%" },
  { name: "Vàng", price: "22M", note: "Xuất hiện nổi bật trên ấn phẩm + booth ưu tiên" },
  { name: "Bạc", price: "15M", note: "Combo truyền thông + trong chương trình" },
  { name: "Đồng", price: "14M", note: "Hiển thị cơ bản, phù hợp hiện vật" },
];

const benefitGroups = [
  { title: "Truyền thông", highlights: "Placement đa kênh, bài viết/clip đồng thương hiệu." },
  {
    title: "Product placement",
    highlights: "Sampling, co-branding trên sân khấu, booth 3x2m (2 điểm).",
  },
  {
    title: "Trong chương trình",
    highlights: "Logo trên màn hình chính, TVC phát nhiều lần, mention MC.",
  },
  { title: "Hậu chiến dịch", highlights: "Báo cáo số liệu, hình ảnh lồng ghép sản phẩm, tri ân." },
];

const topBenefits = [
  "Booth 3x2m (2 địa điểm)",
  "Brand xuất hiện nổi bật trên ấn phẩm",
  "TVC phát trên màn hình chính",
  "Mention/tri ân trong recap",
  "Báo cáo số liệu & hình ảnh",
];

export default function SponsorshipPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <PageHeader
        eyebrow="Sponsorship"
        title="Lời mời hợp tác"
        subtitle="Đồng hành để thắp lửa cộng đồng; cam kết quyền lợi rõ ràng + báo cáo hậu chiến dịch."
      />

      <Section
        eyebrow="Invitation"
        title="Thư mời"
        description="6–8 dòng súc tích: đồng hành để thắp lửa cộng đồng; cam kết quyền lợi, minh bạch report."
      >
        <Card className="space-y-3">
          <p className="text-foam">
            UEHG mời thương hiệu trở thành một phần của dòng chảy âm nhạc sinh viên. Chúng tôi đảm
            bảo vận hành chuyên nghiệp, bảo vệ brand-safety và báo cáo chi tiết sau chương trình.
          </p>
          <Badge variant="glow">Không autoplay sound; motion tôn trọng UX</Badge>
        </Card>
      </Section>

      <Section
        eyebrow="Sponsor Packages"
        title="Gói tài trợ & toggle"
        description="Kim cương 24M | Vàng 22M | Bạc 15M | Đồng 14M. Toggle: Hiện kim / Hiện vật / Kết hợp (placeholder)."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {packages.map((pkg) => (
            <Card key={pkg.name} className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="glow">{pkg.name}</Badge>
                <Badge>{pkg.price}</Badge>
              </div>
              <p className="text-foam/80">{pkg.note}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-foam/50">Toggle placeholder</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Benefits System"
        title="Quyền lợi theo nhóm"
        description="Accordion placeholder: Truyền thông, Product placement, Trong chương trình, Hậu chiến dịch."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {benefitGroups.map((group) => (
            <Reveal key={group.title}>
              <Card className="space-y-2">
                <h3 className="text-lg font-semibold text-foam">{group.title}</h3>
                <p className="text-foam/80">{group.highlights}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {topBenefits.map((benefit) => (
            <Badge key={benefit}>{benefit}</Badge>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Call-to-Action Panel"
        title="Hành động nhanh"
        description="Book lịch 15 phút, tải Sponsorship Kit, gửi yêu cầu gói tùy chỉnh."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Book lịch 15 phút</Button>
          <Button href="/media" variant="secondary">
            Tải Sponsorship Kit PDF
          </Button>
          <Button href="/contact" variant="ghost">
            Yêu cầu gói tùy chỉnh
          </Button>
        </div>
      </Section>

      <LinearPager currentRoute="/sponsorship" />
    </div>
  );
}
