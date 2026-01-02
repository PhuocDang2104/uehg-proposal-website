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

const floatingHearts = [
  { id: 1, left: "6%", top: "8%", size: 34, delay: "0s", duration: "12s", tone: "text-pink-200/70" },
  { id: 2, left: "18%", top: "18%", size: 22, delay: "1.2s", duration: "10s", tone: "text-rose-200/60" },
  { id: 3, left: "32%", top: "6%", size: 28, delay: "0.6s", duration: "11s", tone: "text-fuchsia-200/65" },
  { id: 4, left: "52%", top: "14%", size: 36, delay: "1.4s", duration: "13s", tone: "text-pink-300/60" },
  { id: 5, left: "68%", top: "8%", size: 26, delay: "0.8s", duration: "10.5s", tone: "text-rose-300/60" },
  { id: 6, left: "84%", top: "18%", size: 30, delay: "1.8s", duration: "12.5s", tone: "text-fuchsia-200/65" },
  { id: 7, left: "10%", top: "42%", size: 24, delay: "0.4s", duration: "11.5s", tone: "text-pink-200/60" },
  { id: 8, left: "76%", top: "46%", size: 20, delay: "1.1s", duration: "9.5s", tone: "text-rose-200/60" },
  { id: 9, left: "44%", top: "72%", size: 28, delay: "1.6s", duration: "12s", tone: "text-fuchsia-200/60" },
  { id: 10, left: "90%", top: "70%", size: 24, delay: "0.9s", duration: "10.8s", tone: "text-pink-300/60" },
];

const burstHearts = [
  { id: 1, dx: "-80px", dy: "-70px", size: "18px", delay: "0s", rot: "-18deg" },
  { id: 2, dx: "70px", dy: "-60px", size: "16px", delay: "0.2s", rot: "20deg" },
  { id: 3, dx: "-60px", dy: "50px", size: "16px", delay: "0.4s", rot: "-14deg" },
  { id: 4, dx: "80px", dy: "60px", size: "18px", delay: "0.1s", rot: "14deg" },
  { id: 5, dx: "0px", dy: "-90px", size: "20px", delay: "0.3s", rot: "0deg" },
  { id: 6, dx: "0px", dy: "85px", size: "18px", delay: "0.5s", rot: "0deg" },
  { id: 7, dx: "-95px", dy: "0px", size: "16px", delay: "0.6s", rot: "-22deg" },
  { id: 8, dx: "95px", dy: "0px", size: "16px", delay: "0.7s", rot: "22deg" },
];

export default function ContactPage() {
  return (
    <section
      className="relative isolate w-screen py-10 sm:py-12 lg:py-16"
      style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,182,221,0.65),transparent_42%),radial-gradient(circle_at_82%_12%,rgba(255,128,190,0.55),transparent_45%),radial-gradient(circle_at_40%_80%,rgba(255,210,235,0.35),transparent_55%),linear-gradient(180deg,rgba(42,6,26,0.96),rgba(12,3,10,0.98))]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_30%_60%,rgba(255,210,245,0.45),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px]" />

      <div className="pointer-events-none absolute inset-0">
        {floatingHearts.map((heart) => (
          <span
            key={heart.id}
            className={`floating-heart ${heart.tone}`}
            style={{
              left: heart.left,
              top: heart.top,
              width: `${heart.size}px`,
              height: `${heart.size}px`,
              animationDelay: heart.delay,
              animationDuration: heart.duration,
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full fill-current">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.28 4 9.96 4.81 11 6.09 12.04 4.81 13.72 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span>
        ))}
      </div>

      <div className="relative mx-auto w-[min(980px,92vw)] space-y-10 md:space-y-12">
        <div className="relative">
          <div className="pointer-events-none absolute -inset-4 rounded-[36px] bg-[radial-gradient(circle_at_30%_20%,rgba(255,172,219,0.45),transparent_60%),radial-gradient(circle_at_70%_0%,rgba(255,120,190,0.35),transparent_55%)] blur-2xl opacity-80" />
          <PageHeader
            eyebrow="Contact"
            title="Kết thúc hành trình"
            subtitle="Lời cảm ơn cuối buổi diễn; 2 hướng lead: Sponsor và Student."
          />
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-[linear-gradient(135deg,rgba(255,140,200,0.32),rgba(255,255,255,0.1))] p-6 shadow-[0_24px_70px_rgba(255,120,190,0.35)] md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,190,230,0.65),transparent_45%),radial-gradient(circle_at_80%_10%,rgba(255,240,255,0.55),transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.1),transparent_55%)]" />
          <div className="pointer-events-none absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-pink-400/45 blur-3xl animate-[loveFloat_7s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute -right-6 top-0 h-24 w-24 rounded-full bg-fuchsia-400/40 blur-3xl animate-[loveFloat_8s_ease-in-out_infinite]" />
          <div className="pointer-events-none absolute inset-0 opacity-80 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.55),transparent)] animate-[glitterSweep_5s_linear_infinite]" />
          <div className="pointer-events-none absolute inset-0">
            {burstHearts.map((heart) => (
              <span
                key={heart.id}
                className="heart-burst text-pink-200"
                style={
                  {
                    "--dx": heart.dx,
                    "--dy": heart.dy,
                    "--delay": heart.delay,
                    "--size": heart.size,
                    "--rot": heart.rot,
                  } as React.CSSProperties
                }
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full fill-current">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.28 4 9.96 4.81 11 6.09 12.04 4.81 13.72 4 15.5 4 18 4 20 6 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </span>
            ))}
          </div>

          <div className="relative space-y-3 text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-foam/70">Easter Egg</p>
            <p className="font-display text-2xl text-transparent bg-gradient-to-r from-white via-pink-200 to-pink-400 bg-clip-text drop-shadow-[0_8px_20px_rgba(255,120,190,0.35)]">
              Ai đọc được tới đây thì
            </p>
            <p className="text-lg font-semibold text-foam">XINH VÃI LOZ, NÓI EM ĐẤY VÂN</p>
          </div>
        </div>

        <Section
          eyebrow="Closing Letter"
          title="Lời cảm ơn"
          description="Viết như lời kết buổi diễn, trang trọng nhưng giàu cảm xúc."
          backgroundPreset="dawnMist"
          className="border-pink-200/30 bg-[linear-gradient(135deg,rgba(255,170,220,0.18),rgba(255,255,255,0.06))] shadow-[0_26px_80px_rgba(255,120,190,0.25)]"
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
          className="border-pink-200/30 bg-[linear-gradient(135deg,rgba(255,170,220,0.16),rgba(255,255,255,0.05))] shadow-[0_26px_80px_rgba(255,120,190,0.2)]"
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
          className="border-pink-200/30 bg-[linear-gradient(135deg,rgba(255,170,220,0.16),rgba(255,255,255,0.05))] shadow-[0_26px_80px_rgba(255,120,190,0.2)]"
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
          className="border-pink-200/30 bg-[linear-gradient(135deg,rgba(255,170,220,0.16),rgba(255,255,255,0.05))] shadow-[0_26px_80px_rgba(255,120,190,0.2)]"
        >
          <div className="flex flex-wrap gap-3">
            <Button href="/contact">Gửi yêu cầu hợp tác</Button>
            <Button href="/contact" variant="secondary">
              Đăng ký quan tâm/Đặt vé
            </Button>
          </div>
        </Section>
      </div>

      <style>{`
        @keyframes loveFloat {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -12px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes glitterSweep {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        @keyframes heartDrift {
          0% { transform: translate3d(0, 0, 0) scale(0.85); opacity: 0; }
          20% { opacity: 0.7; }
          50% { transform: translate3d(8px, -26px, 0) scale(1); opacity: 0.9; }
          100% { transform: translate3d(-6px, -56px, 0) scale(0.8); opacity: 0; }
        }
        @keyframes heartBurst {
          0% { transform: translate3d(-50%, -50%, 0) scale(0.3) rotate(0deg); opacity: 0; }
          18% { opacity: 1; }
          100% {
            transform: translate3d(calc(-50% + var(--dx)), calc(-50% + var(--dy)), 0)
              scale(1)
              rotate(var(--rot));
            opacity: 0;
          }
        }
        .floating-heart {
          position: absolute;
          animation-name: heartDrift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          filter: drop-shadow(0 10px 18px rgba(255, 140, 200, 0.35));
          opacity: 0;
        }
        .heart-burst {
          position: absolute;
          left: 50%;
          top: 50%;
          width: var(--size);
          height: var(--size);
          animation: heartBurst 3.2s ease-out infinite;
          animation-delay: var(--delay);
          filter: drop-shadow(0 8px 18px rgba(255, 120, 190, 0.45));
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
