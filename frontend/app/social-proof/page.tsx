import LinearPager from "@/components/nav/linear-pager";
import { Section } from "@/components/sections/section";
import { PageHeader } from "@/components/sections/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Social Proof — Nghệ sĩ & Đối tác",
  description: "Wall nghệ sĩ, đối tác theo tier, hover ripple + modal case snippet placeholder.",
});

const artists = [
  "Artist Alpha",
  "Artist Beta",
  "Artist Gamma",
  "Artist Delta",
  "Artist Epsilon",
  "Artist Zeta",
];

const partnerTiers = [
  { tier: "Kim cương", slot: "24M", note: "Logo nổi bật, quyền lợi tối đa" },
  { tier: "Vàng", slot: "22M", note: "Brand hiện diện đa kênh, booth ưu tiên" },
  { tier: "Bạc", slot: "15M", note: "Combo truyền thông + offline" },
  { tier: "Đồng", slot: "14M", note: "Hiển thị cơ bản, hiện kim/hiện vật" },
  { tier: "Đồng hành", slot: "Support", note: "Hỗ trợ sản phẩm/dịch vụ" },
  { tier: "Bảo trợ truyền thông", slot: "Media", note: "Khai thác kênh truyền thông" },
];

export default function SocialProofPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <PageHeader
        eyebrow="Social Proof"
        title="Nghệ sĩ & đối tác đã tin"
        subtitle="Biến danh sách thành bằng chứng thị giác. Hover = ripple + tooltip; click = modal case snippet."
      />

      <Section
        eyebrow="Artists Wall"
        title="Collab artists"
        description="Grid poster-style; mỗi ô hiển thị năm/dạng hợp tác khi hover."
        backgroundPreset="irisDrift"
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {artists.map((artist, idx) => (
            <Reveal key={artist} delay={idx * 0.05}>
              <Card className="h-full space-y-3">
                <Badge variant="glow">Hover ripple</Badge>
                <h3 className="text-xl font-semibold text-foam">{artist}</h3>
                <p className="text-sm text-foam/70">
                  Case snippet placeholder — năm, dạng hợp tác, link recap.
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Partners by Tier"
        title="Tầng quyền lợi 2023-2024"
        description="Có filter theo năm (placeholder). Logo hover hiển thị role + year."
        backgroundPreset="lagoonPulse"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {partnerTiers.map((tier) => (
            <Card key={tier.tier} className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="glow">{tier.tier}</Badge>
                <Badge>{tier.slot}</Badge>
              </div>
              <p className="text-foam/80">{tier.note}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-foam/50">
                Placeholder: modal info + tooltip hover
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Interaction"
        title="UX note"
        description="Hover ripple + tooltip; click mở modal case snippet (2–3 dòng + hình)."
        backgroundPreset="emberBloom"
      >
        <div className="flex flex-wrap gap-3">
          <Badge>Filter 2023/2024</Badge>
          <Badge variant="glow">Ripple hover</Badge>
          <Badge>Modal case</Badge>
        </div>
      </Section>

      <LinearPager currentRoute="/social-proof" />
    </div>
  );
}
