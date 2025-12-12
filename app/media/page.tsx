import LinearPager from "@/components/nav/linear-pager";
import { Section } from "@/components/sections/section";
import { PageHeader } from "@/components/sections/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Media — Ảnh/clip/link",
  description: "Afternoon recap video hero, gallery, press mentions, download center.",
});

const gallery = [
  "Sân khấu bùng nổ",
  "Crowd energy",
  "Backstage",
  "Lineup moment",
  "Sponsor booth",
  "Hậu trường âm thanh",
];

export default function MediaPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <PageHeader
        eyebrow="Media"
        title="Show, gallery, press"
        subtitle="Cho xem bằng mắt: video hero + playlist grid, gallery lightbox, press mention placeholder."
      />

      <Section
        eyebrow="Aftermovie / Recap"
        title="Video hero & playlist"
        description="Block video chính + playlist grid. Placeholder iframe box."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="flex h-48 items-center justify-center rounded-2xl bg-black/40 text-foam/60">
            Video hero placeholder
          </Card>
          <div className="grid gap-3">
            {[1, 2, 3].map((item) => (
              <Reveal key={item}>
                <Card className="flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.16em] text-foam/60">Playlist</p>
                    <p className="text-foam">Recap #{item}</p>
                  </div>
                  <Badge variant="glow">Xem</Badge>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Gallery"
        title="Ảnh sân khấu + crowd + backstage"
        description="Grid ảnh; click mở lightbox (placeholder)."
      >
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {gallery.map((item) => (
            <Card key={item} className="h-32">
              <p className="text-sm uppercase tracking-[0.16em] text-foam/60">Placeholder</p>
              <p className="text-foam">{item}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Press & Mentions"
        title="Đối tác truyền thông"
        description="Nơi gắn logo báo chí/đơn vị truyền thông nếu có."
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="glow">Press logo</Badge>
          <Badge>Partner shout-out</Badge>
        </div>
      </Section>

      <Section
        eyebrow="Download center"
        title="Media kit & tài liệu"
        description="Sponsorship kit, logo pack, media kit."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/media" variant="secondary">
            Tải Sponsorship Kit
          </Button>
          <Button href="/media" variant="ghost">
            Media Kit / Logo Pack
          </Button>
        </div>
      </Section>

      <LinearPager currentRoute="/media" />
    </div>
  );
}
