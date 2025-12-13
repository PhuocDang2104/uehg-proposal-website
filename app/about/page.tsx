import LinearPager from "@/components/nav/linear-pager";
import { Section } from "@/components/sections/section";
import { PageHeader } from "@/components/sections/page-header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About UEHG — Nơi bắt đầu",
  description:
    "Giới thiệu CLB, timeline 2011 tới nay, mission/vision/direction cho sponsor & sinh viên.",
});

const timeline = [
  {
    year: "2011",
    title: "Khởi nguồn UEHG",
    detail: "Thành lập 09/09/2011 – bến nguồn của cộng đồng guitar.",
  },
  {
    year: "2016-2020",
    title: "Nuôi dưỡng cộng đồng",
    detail: "Chuỗi mini show, hoạt động thiện nguyện, mở rộng nhân sự.",
  },
  { year: "2023", title: "Set Fire", detail: "Show NBĐ 2023 sold-out, tạo dấu ấn trẻ trung." },
  {
    year: "2026",
    title: "Ngược Dòng",
    detail: "Bước nhảy trải nghiệm, nâng cấp art direction + đối tác.",
  },
];

const channels = [
  {
    name: "Facebook",
    metric: "27K likes / 30K follows",
    note: "Teaser, recap, tuyển cộng tác viên",
  },
  { name: "YouTube", metric: "Playlist aftermovie", note: "Recap, acoustic session, phỏng vấn" },
  { name: "TikTok", metric: "Gen Z reach", note: "Snippet hậu trường, viral short, challenge" },
];

export default function AboutPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <PageHeader
        eyebrow="About UEHG"
        title="Hành trình 2011 — nay"
        subtitle="Biến phần giới thiệu thành một đoạn phim ngắn: nguồn gốc, sứ mệnh, tầm nhìn, tổ chức bền bỉ."
      />

      <Section
        eyebrow="Origin — Just the beginning"
        title="Dòng chảy khởi nguồn"
        description="Timeline dạng dòng nước, mỗi mốc như viên đá nổi. Motion sẽ chạy dạng flow khi scroll."
        backgroundPreset="dawnMist"
      >
        <div className="grid gap-4 md:grid-cols-2">
          {timeline.map((item) => (
            <Reveal key={item.year}>
              <Card className="space-y-2">
                <Badge variant="glow">{item.year}</Badge>
                <h3 className="text-xl font-semibold text-foam">{item.title}</h3>
                <p className="text-foam/80">{item.detail}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Mission / Vision / Direction"
        title="La bàn hoạt động"
        description="Bộ ba ngắn gọn cho sponsor thấy định hướng và độ bền."
        backgroundPreset="lagoonPulse"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <Badge>Mission</Badge>
            <p className="mt-3 text-foam">
              Nuôi dưỡng đam mê, kết nối nghệ sĩ – sinh viên, kiến tạo sân chơi nghệ thuật.
            </p>
          </Card>
          <Card>
            <Badge>Vision</Badge>
            <p className="mt-3 text-foam">
              CLB nghệ thuật sinh viên hàng đầu TP.HCM, nơi trải nghiệm giải trí dẫn đầu.
            </p>
          </Card>
          <Card>
            <Badge>Direction</Badge>
            <p className="mt-3 text-foam">
              Nâng chất lượng sản phẩm âm nhạc, phát triển nhân sự, mở rộng hợp tác thương hiệu.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Kênh truyền thông"
        title="Media footprint"
        description="Preview 3 kênh chính, số liệu + dạng nội dung."
        backgroundPreset="irisDrift"
      >
        <div className="grid gap-4 md:grid-cols-3">
          {channels.map((channel) => (
            <Card key={channel.name} className="space-y-2">
              <Badge variant="glow">{channel.name}</Badge>
              <p className="text-sm text-foam/70">{channel.metric}</p>
              <p className="text-foam">{channel.note}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Liên kết flow"
        title="Đi tiếp sang Social Proof"
        description="CTA dẫn người xem tới nghệ sĩ & đối tác đã đồng hành."
        backgroundPreset="emberBloom"
      >
        <div className="flex flex-wrap gap-3">
          <Badge>Hover ripple để làm giàu trải nghiệm</Badge>
          <Badge variant="glow">Modal case snippet</Badge>
        </div>
      </Section>

      <LinearPager currentRoute="/about" />
    </div>
  );
}
