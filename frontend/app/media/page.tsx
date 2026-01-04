import { Section } from "@/components/sections/section";
import { PageHeader } from "@/components/sections/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Truyền thông — Ảnh/clip/link",
  description: "Video tổng hợp, thư viện ảnh, báo chí và trung tâm tải tài liệu.",
});

const gallery = [
  "Sân khấu bùng nổ",
  "Năng lượng khán giả",
  "Hậu trường",
  "Khoảnh khắc đội hình",
  "Gian hàng tài trợ",
  "Hậu trường âm thanh",
];

export default function MediaPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <PageHeader
        eyebrow="Truyền thông"
        title="Show diễn, thư viện ảnh, báo chí"
        subtitle="Cho xem bằng mắt: video tổng hợp, danh sách phát nổi bật, thư viện ảnh và bài viết truyền thông."
      />

      <Section
        eyebrow="Hậu kỳ / tổng hợp"
        title="Video chính & danh sách phát"
        description="Video tổng hợp chính kèm danh sách phát nổi bật."
        backgroundPreset="lagoonPulse"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="flex h-48 items-center justify-center rounded-2xl bg-black/40 text-foam/60">
            Video tổng hợp nổi bật
          </Card>
          <div className="grid gap-3">
            {[1, 2, 3].map((item) => (
              <Reveal key={item}>
                <Card className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-foam/60">
                      Danh sách phát
                    </p>
                    <p className="text-foam">Tổng hợp #{item}</p>
                  </div>
                  <Badge variant="glow">Xem</Badge>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Thư viện ảnh"
        title="Ảnh sân khấu + khán giả + hậu trường"
        description="Grid ảnh; mở lightbox để xem chi tiết."
        backgroundPreset="irisDrift"
      >
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {gallery.map((item) => (
            <Card key={item} className="h-32">
              <p className="text-sm uppercase tracking-[0.16em] text-foam/60">Thư viện ảnh</p>
              <p className="text-foam">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Báo chí & nhắc đến"
        title="Đối tác truyền thông"
        description="Nơi gắn logo báo chí/đơn vị truyền thông nếu có."
        backgroundPreset="dawnMist"
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="glow">Logo báo chí</Badge>
          <Badge>Nhắc tên đối tác</Badge>
        </div>
      </Section>

      <Section
        eyebrow="Trung tâm tải"
        title="Bộ truyền thông & tài liệu"
        description="Bộ tài trợ, gói logo, bộ truyền thông."
        backgroundPreset="emberBloom"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/media" variant="secondary">
            Tải bộ tài trợ
          </Button>
          <Button href="/media" variant="ghost">
            Bộ truyền thông / gói logo
          </Button>
        </div>
      </Section>

    </div>
  );
}
