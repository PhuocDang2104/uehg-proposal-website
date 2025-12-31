import Image from "next/image";
import LinearPager from "@/components/nav/linear-pager";
import { Section } from "@/components/sections/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Lens from "@/components/ui/lens";
import { TextRevealCard, TextRevealCardDescription } from "@/components/ui/text-reveal-card";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Giới thiệu UEHG — Chương 2",
  description:
    "Chương 2: tên gọi UEHG, ngày thành lập, sứ mệnh, tầm nhìn và hệ kênh truyền thông.",
});

const identityHighlights = [
  {
    label: "Tên gọi",
    value: "UEHG",
    detail: "Câu Lạc Bộ Guitar Đại Học Kinh tế TP. Hồ Chí Minh.",
  },
  {
    label: "Ngày thành lập",
    value: "09/09/2011",
    detail: "Trực thuộc Hội Sinh Viên Đại Học Kinh Tế TP. HCM.",
  },
];

const missionPillars = [
  {
    title: "Nuôi dưỡng đam mê",
    detail: "Nuôi dưỡng đam mê, kết nối những bạn trẻ có tâm hồn nghệ thuật.",
    image: "/hero-floating/4.png",
    imageAlt: "Minh họa nuôi dưỡng đam mê",
  },
  {
    title: "Sân chơi âm nhạc",
    detail:
      "Tạo ra sân chơi âm nhạc để các bạn trau dồi kinh nghiệm, giao lưu, học hỏi, sáng tạo và thỏa mãn niềm đam mê âm nhạc của mình.",
    image: "/assets/music-assistant.png",
    imageAlt: "Minh họa sân chơi âm nhạc",
  },
  {
    title: "Phát triển chuyên môn",
    detail:
      "Phát triển năng lực chuyên môn của thành viên trên các phương diện trong lĩnh vực nghệ thuật.",
    image: "/hero-floating/7.png",
    imageAlt: "Minh họa phát triển chuyên môn",
  },
];

const visionBlocks = [
  {
    label: "Tầm nhìn",
    detail:
      "UEHG mong muốn định vị và phát triển tổ chức để trở thành một trong những CLB nghệ thuật hàng đầu dành cho sinh viên trên địa bàn Thành Phố Hồ Chí Minh.",
  },
  {
    label: "Định hướng",
    detail:
      "Tập trung phát triển năng lực nhân sự thông qua việc không ngừng cải tiến chất lượng sản phẩm âm nhạc của CLB nhằm đem lại cho các bạn sinh viên món quà tinh thần chất lượng nhất.",
  },
];

const mediaChannels = [
  {
    name: "Facebook",
    tagline: "Kênh truyền thông chính",
    metric: "Với hơn 27.000 lượt thích và 30.000 lượt theo dõi.",
    bullets: [
      "Nội dung: Chuyên nghiệp, đa dạng từ thông báo sự kiện, hoạt động nội bộ đến hỗ trợ truyền thông.",
      "Hình ảnh thương hiệu rõ ràng: Định vị là nơi kết nối đam mê âm nhạc, sáng tạo và mang giá trị cộng đồng.",
    ],
    glow: "from-pearl/20 via-white/5 to-ember/10",
  },
  {
    name: "YouTube",
    tagline: "Kho lưu giữ những sân khấu bùng nổ",
    metric: "Thành tích: Video có lượt xem cao nhất đạt hơn 20K Views.",
    bullets: [
      "Ghi hình lại sân khấu trình diễn ấn tượng, sản phẩm âm nhạc và các hoạt động của Nhà Gờ.",
      "Tạo cầu nối giữa những trái tim yêu nhạc, lan tỏa đam mê.",
    ],
    glow: "from-ember/20 via-white/5 to-iris/10",
  },
  {
    name: "TikTok",
    tagline: "Sân chơi âm nhạc sáng tạo",
    metric: "Mở rộng dấu ấn trên TikTok, kết nối với Gen Z yêu âm nhạc.",
    bullets: [
      "Nội dung đa dạng: Cover guitar, khoảnh khắc hậu trường, xu hướng âm nhạc mới.",
      "Tinh thần sáng tạo: Không ngừng đổi mới để mang đến nội dung hấp dẫn.",
    ],
    glow: "from-iris/20 via-white/5 to-pearl/10",
  },
];

const heroBanner = "/assets/about-banner.jpg";

export default function AboutPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <div className="relative left-1/2 w-[min(1280px,100vw)] -translate-x-1/2">
        <section className="relative min-h-[340px] overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1122] shadow-[0_28px_80px_rgba(0,0,0,0.55)] md:min-h-[420px]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(142,240,255,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,141,106,0.2),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(188,162,255,0.12),transparent_42%)]" />
            <div
              className="absolute inset-0 bg-cover opacity-45"
              style={{ backgroundImage: `url(${heroBanner})`, backgroundPosition: "50% 68%" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,12,0.92)_0%,rgba(3,5,12,0.35)_45%,rgba(3,5,12,0.85)_85%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,transparent_55%)]" />
            <div className="absolute inset-0 mix-blend-screen opacity-60 animate-[hue-rotate_14s_linear_infinite] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.16),transparent_55%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:34px_34px] opacity-25" />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[conic-gradient(from_0deg,rgba(142,240,255,0.45),rgba(255,141,106,0.22),rgba(188,162,255,0.35),rgba(142,240,255,0.45))] blur-3xl opacity-40 animate-[spin_26s_linear_infinite]" />
            <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(142,240,255,0.22),transparent_70%)] blur-3xl opacity-60" />
          </div>

          <div className="relative z-10 flex min-h-[340px] flex-col items-start justify-center px-6 py-10 md:min-h-[420px] md:px-10">
            <div className="max-w-[860px] space-y-4">
              <Badge variant="glow">Chương 2</Badge>
              <TextRevealCard
                text="Giới thiệu UEHG"
                revealText="Just The Beginning"
                frame={false}
                className="max-w-[860px]"
              >
                <TextRevealCardDescription className="text-base text-foam/85 md:text-xl">
                  Cội nguồn, sứ mệnh và hệ kênh truyền thông — nơi nuôi dưỡng đam mê và kết nối những
                  tâm hồn nghệ thuật.
                </TextRevealCardDescription>
              </TextRevealCard>
            </div>
          </div>
        </section>
      </div>

      <Section
        eyebrow="Giới thiệu UEHG"
        title="Tên gọi UEHG & ngày thành lập"
        description="Hai dấu mốc định hình bản sắc: tên gọi thân thương và ngày thành lập chính thức."
        backgroundPreset="dawnMist"
      >
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <Reveal>
              <p className="text-lg text-foam">
                Câu Lạc Bộ Guitar Đại Học Kinh tế TP. Hồ Chí Minh - hay được biết đến với cái tên
                ngắn gọn nhưng rất đỗi thân thương UEHG.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-foam/80">
                UEHG được thành lập vào ngày 09/09/2011, trực thuộc Hội Sinh Viên Đại Học Kinh Tế
                TP. HCM.
              </p>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {identityHighlights.map((item, index) => (
                <Reveal key={item.label} delay={0.1 + index * 0.05}>
                  <Card className="space-y-2">
                    <Badge variant="glow">{item.label}</Badge>
                    <p className="text-2xl font-semibold text-foam">{item.value}</p>
                    <p className="text-sm text-foam/70">{item.detail}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="relative">
            <Reveal>
              <CardContainer className="relative">
                <CardBody className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_70px_rgba(0,0,0,0.45)] md:p-8">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(142,240,255,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,141,106,0.16),transparent_40%)]" />
                  <div className="relative z-10 space-y-4">
                    <CardItem translateZ={70} className="font-display text-4xl text-foam md:text-5xl">
                      UEHG
                    </CardItem>
                    <CardItem
                      translateZ={45}
                      className="text-xs uppercase tracking-[0.32em] text-foam/60"
                    >
                      09 · 09 · 2011
                    </CardItem>
                    <CardItem translateZ={55} className="text-sm text-foam/80">
                      Câu Lạc Bộ Guitar Đại Học Kinh tế TP. Hồ Chí Minh.
                    </CardItem>
                    <CardItem translateZ={45}>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foam/80">
                        Trực thuộc Hội Sinh Viên Đại Học Kinh Tế TP. HCM.
                      </div>
                    </CardItem>
                    <CardItem translateZ={90}>
                      <Lens zoomFactor={1.6} lensSize={160}>
                        <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full border border-white/20 bg-white/90">
                          <Image
                            src="/assets/UEHG_logo.png"
                            alt="UEHG logo"
                            fill
                            sizes="160px"
                            className="object-contain p-2"
                            priority
                          />
                        </div>
                      </Lens>
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Sứ mệnh"
        title="Ba mạch hành động"
        description="Nuôi dưỡng đam mê, tạo sân chơi và phát triển năng lực chuyên môn."
        backgroundPreset="lagoonPulse"
      >
        <div className="relative">
          <Parallax
            strength={40}
            className="pointer-events-none absolute -right-6 -top-10 hidden lg:block"
          >
            <Image
              src="/hero-floating/note4.png"
              alt="Music note"
              width={160}
              height={160}
              className="h-36 w-36 opacity-60"
            />
          </Parallax>
          <Parallax
            strength={24}
            className="pointer-events-none absolute -left-8 bottom-0 hidden md:block"
          >
            <Image
              src="/hero-floating/note2.png"
              alt="Music note"
              width={140}
              height={140}
              className="h-28 w-28 opacity-50"
            />
          </Parallax>
          <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-stretch md:gap-5 lg:gap-6 group/mission">
            {missionPillars.map((mission, index) => (
              <Reveal
                key={mission.title}
                delay={index * 0.05}
                className="min-w-0 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:basis-0 md:grow md:group-hover/mission:grow-[0.65] md:hover:grow-[2.4]"
              >
                <CardContainer className="h-full">
                  <CardBody className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-[box-shadow,transform] duration-500 ease-out md:group-hover/card:shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(146,240,255,0.12),transparent_45%),radial-gradient(circle_at_90%_0%,rgba(255,141,106,0.12),transparent_40%)]" />
                    <div className="relative z-10 flex h-full flex-col">
                      <div className="space-y-4">
                        <CardItem
                          translateZ={40}
                          className="text-xs uppercase tracking-[0.2em] text-foam/60"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </CardItem>
                        <CardItem translateZ={60} className="text-xl font-semibold text-foam">
                          {mission.title}
                        </CardItem>
                        <CardItem translateZ={45} className="text-sm text-foam/80">
                          {mission.detail}
                        </CardItem>
                      </div>
                      <CardItem
                        translateZ={55}
                        className="hidden overflow-hidden md:block md:max-h-0 md:opacity-0 md:transition-[max-height,opacity] md:duration-700 md:ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover/card:max-h-[220px] md:group-hover/card:opacity-100"
                      >
                        <div className="pt-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:translate-y-3 md:group-hover/card:translate-y-0">
                          <div className="flex justify-center">
                            <div className="relative h-36 w-36 rounded-2xl border border-white/15 bg-white/10 shadow-[0_18px_45px_rgba(0,0,0,0.35)] md:h-40 md:w-40">
                              <Image
                                src={mission.image}
                                alt={mission.imageAlt}
                                fill
                                sizes="160px"
                                className="object-contain p-2"
                              />
                            </div>
                          </div>
                        </div>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Tầm nhìn & định hướng"
        title="Định vị dài hạn"
        description="Khát vọng trở thành CLB nghệ thuật hàng đầu, song hành cùng chất lượng sản phẩm âm nhạc."
        backgroundPreset="emberBloom"
      >
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-2">
            {visionBlocks.map((block, index) => (
              <Reveal key={block.label} delay={index * 0.05}>
                <CardContainer className="h-full">
                  <CardBody className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_20%,rgba(142,240,255,0.14),transparent_40%),radial-gradient(circle_at_100%_0%,rgba(255,141,106,0.12),transparent_45%)]" />
                    <div className="relative z-10 space-y-3">
                      <CardItem translateZ={50}>
                        <Badge variant="glow">{block.label}</Badge>
                      </CardItem>
                      <CardItem translateZ={40} className="text-sm text-foam/80">
                        {block.detail}
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </Reveal>
            ))}
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </Section>

      <Section
        eyebrow="Kênh truyền thông"
        title="Hệ kênh lan tỏa"
        description="Ba trụ kênh giúp UEHG giữ nhịp kết nối, ghi dấu và lan truyền cảm hứng."
        backgroundPreset="irisDrift"
      >
        <div className="relative">
          <Parallax
            strength={30}
            className="pointer-events-none absolute -left-10 -top-8 hidden lg:block"
          >
            <Image
              src="/hero-floating/note5.png"
              alt="Music note"
              width={160}
              height={160}
              className="h-36 w-36 opacity-55"
            />
          </Parallax>
          <div className="relative z-10 grid gap-4 lg:grid-cols-3">
            {mediaChannels.map((channel, index) => (
              <Reveal key={channel.name} delay={index * 0.05}>
                <CardContainer className="h-full">
                  <CardBody className="relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${channel.glow}`}
                    />
                    <div className="relative z-10 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <CardItem translateZ={55}>
                          <Badge variant="glow">{channel.name}</Badge>
                        </CardItem>
                        <CardItem
                          translateZ={35}
                          className="text-xs uppercase tracking-[0.2em] text-foam/60"
                        >
                          {channel.tagline}
                        </CardItem>
                      </div>
                      <CardItem translateZ={50}>
                        <Lens zoomFactor={1.3} lensSize={140}>
                          <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-foam/80">
                            {channel.metric}
                          </div>
                        </Lens>
                      </CardItem>
                      <CardItem translateZ={40}>
                        <ul className="space-y-2 text-sm text-foam/80">
                          {channel.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ember" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <LinearPager currentRoute="/about" />
    </div>
  );
}
