import LinearPager from "@/components/nav/linear-pager";
import { Section } from "@/components/sections/section";
import { PageHeader } from "@/components/sections/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact — Kết thúc hành trình",
  description: "Closing letter, contact cards, lead form 2 tab (sponsor/student) placeholder.",
});

export default function ContactPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <PageHeader
        eyebrow="Contact"
        title="Kết thúc hành trình"
        subtitle="Lời cảm ơn cuối buổi diễn; 2 hướng lead: Sponsor và Student."
      />

      <Section
        eyebrow="Closing Letter"
        title="Lời cảm ơn"
        description="Viết như lời kết buổi diễn, trang trọng nhưng giàu cảm xúc."
        backgroundPreset="dawnMist"
      >
        <Card className="space-y-3">
          <p className="text-foam/80">
            Cảm ơn bạn đã đi cùng dòng chảy này. Nếu bạn là nhà tài trợ, chúng tôi sẵn sàng kết nối
            trong 15 phút để thiết kế quyền lợi phù hợp. Nếu bạn là sinh viên, hãy vào hành trình
            cùng UEHG — tham gia, tình nguyện, hoặc đơn giản là đặt vé và cháy cùng âm nhạc.
          </p>
          <Badge variant="glow">CTA rõ ràng, không autoplay sound</Badge>
        </Card>
      </Section>

      <Section
        eyebrow="Contact Cards"
        title="Người phụ trách"
        description="Email / Phone / FB — gắn tên người phụ trách tài trợ."
        backgroundPreset="lagoonPulse"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="space-y-2">
            <h3 className="text-lg font-semibold text-foam">Nhà tài trợ</h3>
            <p className="text-foam">sponsor@uehg.vn</p>
            <p className="text-foam/70">Người phụ trách tài trợ (Placeholder Name)</p>
          </Card>
          <Card className="space-y-2">
            <h3 className="text-lg font-semibold text-foam">Sinh viên</h3>
            <p className="text-foam">student@uehg.vn</p>
            <p className="text-foam/70">Fanpage / FB / Hotline</p>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Lead Form"
        title="2 tab: Sponsor / Student"
        description="Form placeholder: Sponsor (Đơn vị / Ngành / Ngân sách / Mục tiêu hợp tác / Thời gian liên hệ); Student (Họ tên / Khoa / Nhu cầu)."
        backgroundPreset="emberBloom"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="space-y-3">
            <Badge variant="glow">Sponsor</Badge>
            <p className="text-foam/80">
              Form placeholder: input field & select; gửi request hợp tác.
            </p>
            <Button href="/contact" variant="secondary">
              Gửi yêu cầu hợp tác
            </Button>
          </Card>
          <Card className="space-y-3">
            <Badge>Student</Badge>
            <p className="text-foam/80">
              Form placeholder: Họ tên, Khoa, nhu cầu (tham gia CLB / tình nguyện / mua vé).
            </p>
            <Button href="/contact" variant="ghost">
              Đăng ký quan tâm/Đặt vé
            </Button>
          </Card>
        </div>
      </Section>

      <Section
        eyebrow="Final CTA"
        title="Đi tới hành động"
        description="Gắn CTA kép chốt chuyển đổi."
        backgroundPreset="irisDrift"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact">Gửi yêu cầu hợp tác</Button>
          <Button href="/contact" variant="secondary">
            Đăng ký quan tâm/Đặt vé
          </Button>
        </div>
      </Section>

      <LinearPager currentRoute="/contact" />
    </div>
  );
}
