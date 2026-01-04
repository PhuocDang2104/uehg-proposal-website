import { Section } from "@/components/sections/section";
import { PageHeader } from "@/components/sections/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Impact — Số liệu & thiện nguyện",
  description: "Trang bán dữ liệu: ticket velocity, audience reach, CSR 150M+, biểu đồ dòng nước.",
});

const ticketStats = [
  { title: "Early bird", detail: "100 vé / 3 phút (NBĐ 2023)" },
  { title: "Cháy vé", detail: "900+ vé / 1 giờ" },
  { title: "Khúc Giao Mùa", detail: "800 vé / 2 giờ" },
];

export default function ImpactPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <PageHeader
        eyebrow="Impact"
        title="Sức mạnh con số"
        subtitle="KPI, độ phủ, khả năng tổ chức — dành cho sponsor nhìn thấy tiềm năng brand."
      />

      <Section
        eyebrow="Ticketing Velocity"
        title="Tốc độ bán vé"
        description="Nhịp bán vé theo từng mốc mở bán nổi bật."
        backgroundPreset="emberBloom"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {ticketStats.map((stat) => (
            <Card key={stat.title} className="space-y-2">
              <Badge variant="glow">{stat.title}</Badge>
              <p className="text-xl font-semibold text-foam">{stat.detail}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-foam/60">Tốc độ mở bán</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Audience & Reach"
        title="Độ phủ offline + online"
        description="Biểu đồ dòng chảy thể hiện tăng trưởng khán giả và độ phủ truyền thông."
        backgroundPreset="lagoonPulse"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="space-y-2">
            <Badge>Offline attendance</Badge>
            <p className="text-foam">Số liệu audience theo mùa, phân loại khán giả.</p>
            <div className="mt-4 h-36 rounded-2xl bg-gradient-to-r from-ember/40 via-pearl/30 to-iris/30" />
          </Card>
          <Card className="space-y-2">
            <Badge>Online distribution</Badge>
            <p className="text-foam">FB/YT/TikTok reach theo mùa, phân bổ theo kênh.</p>
            <div className="mt-4 h-36 rounded-2xl bg-gradient-to-r from-pearl/30 via-iris/30 to-ember/40" />
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Community & CSR"
        title="Hành trình trao yêu thương"
        description="Tổng gây quỹ 150M+, điểm nhấn câu chuyện và hình ảnh cộng đồng."
        backgroundPreset="dawnMist"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Reveal>
            <Card className="space-y-2">
              <Badge variant="glow">150M+</Badge>
              <p className="text-foam">Tổng gây quỹ qua nhiều mùa.</p>
            </Card>
          </Reveal>
          <Reveal delay={0.05}>
            <Card className="space-y-2">
              <Badge>Story highlight</Badge>
              <p className="text-foam/80">Ảnh và trích dẫn tiêu biểu từ các mùa trước.</p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="space-y-2">
              <Badge>CSR proof</Badge>
              <p className="text-foam/80">Báo cáo hậu chiến dịch cho sponsor.</p>
            </Card>
          </Reveal>
        </div>
      </Section>

    </div>
  );
}
