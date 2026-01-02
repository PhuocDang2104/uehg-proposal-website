import Image from "next/image";
import { Section } from "@/components/sections/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { Meteors } from "@/components/ui/meteors";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Social Proof — Nghệ sĩ & Đối tác",
  description: "Wall nghệ sĩ, đối tác theo tier, hover ripple + modal case snippet placeholder.",
});

const artistWall = [
  {
    id: "minh-toc-lam",
    name: "Minh Tốc & Lam",
    tag: "Duo khách mời",
    note: "Sân khấu collab · 2024",
    image: "/artists/minhtoclam.png",
    position: { left: "90%", bottom: "-18%", width: "clamp(180px, 24vw, 320px)" },
    zIndex: "z-10",
    tooltipPosition: "top",
    tooltipAlign: "left",
  },
  {
    id: "van-mai-huong",
    name: "Văn Mai Hương",
    tag: "Giọng ca nội lực",
    note: "Live session · 2023",
    image: "/artists/vanmaihuong.png",
    position: { left: "28%", bottom: "-6%", width: "clamp(150px, 20vw, 260px)" },
    zIndex: "z-20",
    tooltipPosition: "top",
    tooltipAlign: "left",
  },
  {
    id: "lena",
    name: "Lena",
    tag: "Nghệ sĩ trẻ",
    note: "Acoustic set · 2024",
    image: "/artists/lena.png",
    position: { left: "7%", bottom: "-6%", width: "clamp(140px, 18vw, 240px)" },
    zIndex: "z-15",
    tooltipPosition: "top",
    tooltipAlign: "center",
  },
  {
    id: "duong-domic",
    name: "Dương Domic",
    tag: "Nghệ sĩ chính",
    note: "Open show · 2024",
    image: "/artists/domic.png",
    position: { left: "50%", bottom: "-6%", width: "clamp(220px, 30vw, 380px)" },
    zIndex: "z-30",
    tooltipPosition: "top",
    tooltipAlign: "center",
  },
  {
    id: "the-cassette",
    name: "The Cassette",
    tag: "Band khách mời",
    note: "Live set · 2023",
    image: "/artists/thecassette.png",
    position: { left: "78%", bottom: "22%", width: "clamp(190px, 32vw, 320px)" },
    zIndex: "z-1",
    tooltipPosition: "top",
    tooltipAlign: "center",
  },
  {
    id: "thai-dinh",
    name: "Thái Đinh",
    tag: "Indie đặc biệt",
    note: "Mini showcase · 2024",
    image: "/artists/thaidinh.png",
    position: { left: "72%", bottom: "-12%", width: "clamp(170px, 22vw, 300px)" },
    zIndex: "z-25",
    tooltipPosition: "top",
    tooltipAlign: "right",
  },
  {
    id: "theflob",
    name: "The Flob",
    tag: "Band khách mời",
    note: "Spotlight stage · 2023",
    image: "/artists/theflob.png",
    position: { left: "20%", bottom: "22%", width: "clamp(230px, 34vw, 360px)" },
    zIndex: "z-10",
    tooltipPosition: "top",
    tooltipAlign: "right",
  },
];

const sponsorGroups = [
  {
    id: "diamond",
    label: "Nhà tài trợ kim cương",
    tier: "Kim cương",
    slot: "24M",
    note: "Logo nổi bật, quyền lợi tối đa",
    accent: "from-pearl/80 via-sky-200/50 to-cyan-300/30",
    partners: [
      { name: "EduPath", logo: "/partners/edupath.png" },
      { name: "AZ Soundtech", logo: "/partners/az-soundtech.png" },
      { name: "FIVO", logo: "/partners/fivo.png" },
    ],
  },
  {
    id: "gold",
    label: "Nhà tài trợ vàng",
    tier: "Vàng",
    slot: "22M",
    note: "Brand hiện diện đa kênh, booth ưu tiên",
    accent: "from-yellow-300/70 via-amber-200/30 to-transparent",
    partners: [
      { name: "DOL IELTS Đình Lực", logo: "/partners/dol-ielts-dinh-luc.png" },
      { name: "Công ty THNN Văn Duy Phương (VDP)", logo: "/partners/vdp.png" },
    ],
  },
  {
    id: "silver",
    label: "Nhà tài trợ bạc",
    tier: "Bạc",
    slot: "15M",
    note: "Combo truyền thông + offline",
    accent: "from-slate-200/70 via-slate-300/30 to-transparent",
    partners: [
      { name: "TAPTAP", logo: "/partners/taptap.png" },
      { name: "Phước Thịnh Uniform", logo: "/partners/phuoc-thinh-uniform.png" },
      { name: "Lyricist", logo: "/partners/lyricist.png" },
    ],
  },
  {
    id: "bronze",
    label: "Nhà tài trợ đồng",
    tier: "Đồng",
    slot: "14M",
    note: "Hiển thị cơ bản, hiện kim/hiện vật",
    accent: "from-orange-400/70 via-orange-200/30 to-transparent",
    partners: [
      { name: "SGC", logo: "/partners/sgc.png" },
      { name: "AZ Soundtech", logo: "/partners/az-soundtech.png" },
      { name: "Tạp Việt Nam", logo: "/partners/tap-viet-nam.png" },
    ],
  },
];

const partnerGroups = [
  {
    id: "companion",
    label: "Đơn vị đồng hành",
    tier: "Đồng hành",
    slot: "Support",
    note: "Hỗ trợ sản phẩm/dịch vụ",
    accent: "from-emerald-300/70 via-emerald-200/30 to-transparent",
    partners: [{ name: "Crocus", logo: "/partners/crocus.png" }],
  },
  {
    id: "studio-media",
    label: "Đối tác phòng tập & Bảo trợ truyền thông",
    accent: "from-sky-300/70 via-rose-200/30 to-transparent",
    sections: [
      {
        id: "studio",
        label: "Đối tác phòng tập",
        partners: [{ name: "FAM Music", logo: "/partners/fam-music.png" }],
      },
      {
        id: "media",
        label: "Bảo trợ truyền thông",
        slot: "Media",
        note: "Khai thác kênh truyền thông",
        partners: [
          { name: "YBOX.VN", logo: "/partners/ybox.png" },
          { name: "iVolunteer Vietnam", logo: "/partners/ivolunteer-vietnam.png" },
          { name: "ADS Sáng Tạo", logo: "/partners/ads-sang-tao.png" },
          { name: "Edu2Review", logo: "/partners/edu2review.png" },
        ],
      },
    ],
  },
];

const interactionFrameImage = "/assets/hightlighted_show.png";

const bannerSlides = [
  { src: "/assets/socialproof_banner.png", alt: "Social proof banner 1" },
  { src: "/assets/socialproof_banner2.png", alt: "Social proof banner 2" },
  { src: "/assets/socialproof_banner3.png", alt: "Social proof banner 3" },
  { src: "/assets/socialproof_banner4.png", alt: "Social proof banner 4" },
];
const bannerDuration = 20;
const bannerDelay = bannerDuration / bannerSlides.length;

export default function SocialProofPage() {
  const [diamondGroup, ...tierGroups] = sponsorGroups;

  const renderSponsorCard = (group: (typeof sponsorGroups)[number], index: number) => {
    const isDiamond = group.id === "diamond";
    const glowClass = isDiamond
      ? "bg-[radial-gradient(circle_at_18%_20%,rgba(142,240,255,0.28),transparent_60%),radial-gradient(circle_at_82%_12%,rgba(76,156,255,0.2),transparent_55%)] opacity-70 group-hover/partner:opacity-100"
      : "bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_55%)] opacity-0 group-hover/partner:opacity-100";
    const tierLabelClass = isDiamond ? "text-pearl/90" : "text-foam/70";
    const tierSlotClass = isDiamond ? "text-pearl" : "text-foam";

    return (
      <Reveal key={group.id} delay={0.06 * index}>
        <Card
          className={`group/partner h-full overflow-visible bg-black/50 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.35)] ${isDiamond ? "border-cyan-200/35 shadow-[0_35px_90px_rgba(72,184,255,0.22)]" : ""}`}
        >
          <div className="relative h-full">
            <div
              className={`pointer-events-none absolute -inset-6 rounded-[28px] blur-2xl transition duration-300 ${glowClass}`}
            />
            {isDiamond ? (
              <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[linear-gradient(135deg,rgba(142,240,255,0.08),transparent_40%,rgba(74,144,255,0.12))] opacity-70" />
            ) : null}
            <div className="relative z-10">
              <div className="flex h-full flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex flex-wrap items-start gap-4">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
                      <div
                        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${group.accent} opacity-35`}
                      />
                      <div className="relative space-y-1">
                        <p
                          className={`text-[10px] uppercase tracking-[0.32em] ${tierLabelClass}`}
                        >
                          {group.tier}
                        </p>
                        <p className={`text-lg font-semibold ${tierSlotClass}`}>{group.slot}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${group.accent}`}
                        />
                        <p className="text-[10px] uppercase tracking-[0.26em] text-foam/60">
                          {group.label}
                        </p>
                      </div>
                      {group.note ? <p className="text-sm text-foam/80">{group.note}</p> : null}
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.partners.map((partner) => (
                    <div
                      key={partner.name}
                      className="group/logo relative flex aspect-square items-center justify-center rounded-2xl bg-black/40 p-4 text-center transition duration-300 hover:-translate-y-1 hover:bg-black/30"
                    >
                      <div className="relative h-full w-full">
                        <Image
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          fill
                          sizes="140px"
                          className="object-contain opacity-85 transition duration-300 group-hover/logo:scale-105 group-hover/logo:opacity-100"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-x-3 top-3 translate-y-2 opacity-0 transition duration-300 group-hover/logo:translate-y-0 group-hover/logo:opacity-100">
                        <div className="rounded-xl border border-black/10 bg-white/95 px-3 py-2 text-left text-slate-900 shadow-[0_16px_30px_rgba(0,0,0,0.2)]">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            {group.tier}
                          </p>
                          <p className="text-xs font-semibold">{partner.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>
    );
  };

  const renderPartnerGroup = (group: (typeof partnerGroups)[number], index: number) => {
    const isWide = group.id === "studio-media";
    const glowClass =
      "bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_55%)] opacity-0 group-hover/partner:opacity-100";
    const tierLabelClass = "text-foam/70";
    const tierSlotClass = "text-foam";

    return (
      <Reveal
        key={group.id}
        delay={0.06 * index}
        className={`h-full ${isWide ? "lg:col-span-2" : ""}`}
      >
        <Card className="group/partner h-full overflow-visible bg-black/50 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(0,0,0,0.35)]">
          <div className="relative h-full">
            <div
              className={`pointer-events-none absolute -inset-6 rounded-[28px] blur-2xl transition duration-300 ${glowClass}`}
            />
            <div className="relative z-10">
              {"sections" in group ? (
                <div className="flex h-full flex-col gap-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${group.accent}`}
                      />
                      <p className="text-[10px] uppercase tracking-[0.26em] text-foam/60">
                        {group.label}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 divide-y divide-white/10 lg:grid-cols-2 lg:gap-0 lg:divide-y-0 lg:divide-x lg:divide-white/10">
                    {(group.sections ?? []).map((section, sectionIndex) => (
                      <div
                        key={section.id}
                        className={`flex h-full flex-col gap-3 ${sectionIndex === 0 ? "pt-0 lg:pr-6" : "pt-4 lg:pt-0 lg:pl-6"}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-2">
                            <p className="text-[10px] uppercase tracking-[0.24em] text-foam/60">
                              {section.label}
                            </p>
                            {section.slot ? (
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge>{section.slot}</Badge>
                              </div>
                            ) : null}
                            {section.note ? (
                              <p className="text-xs text-foam/70">{section.note}</p>
                            ) : null}
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {section.partners.map((partner) => (
                            <div
                              key={partner.name}
                              className="group/logo relative flex aspect-square items-center justify-center rounded-2xl bg-black/40 p-4 text-center transition duration-300 hover:-translate-y-1 hover:bg-black/30"
                            >
                              <div className="relative h-full w-full">
                                <Image
                                  src={partner.logo}
                                  alt={`${partner.name} logo`}
                                  fill
                                  sizes="140px"
                                  className="object-contain opacity-85 transition duration-300 group-hover/logo:scale-105 group-hover/logo:opacity-100"
                                />
                              </div>
                              <div className="pointer-events-none absolute inset-x-3 top-3 translate-y-2 opacity-0 transition duration-300 group-hover/logo:translate-y-0 group-hover/logo:opacity-100">
                                <div className="rounded-xl border border-black/10 bg-white/95 px-3 py-2 text-left text-slate-900 shadow-[0_16px_30px_rgba(0,0,0,0.2)]">
                                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    {section.label}
                                  </p>
                                  <p className="text-xs font-semibold">{partner.name}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex flex-wrap items-start gap-4">
                      {group.slot ? (
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 px-4 py-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]">
                          <div
                            className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${group.accent} opacity-35`}
                          />
                          <div className="relative space-y-1">
                            <p
                              className={`text-[10px] uppercase tracking-[0.32em] ${tierLabelClass}`}
                            >
                              {group.tier}
                            </p>
                            <p className={`text-lg font-semibold ${tierSlotClass}`}>
                              {group.slot}
                            </p>
                          </div>
                        </div>
                      ) : null}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${group.accent}`}
                          />
                          <p className="text-[10px] uppercase tracking-[0.26em] text-foam/60">
                            {group.label}
                          </p>
                        </div>
                        {group.note ? <p className="text-sm text-foam/80">{group.note}</p> : null}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {group.partners.map((partner) => (
                      <div
                        key={partner.name}
                        className="group/logo relative flex aspect-square items-center justify-center rounded-2xl bg-black/40 p-4 text-center transition duration-300 hover:-translate-y-1 hover:bg-black/30"
                      >
                        <div className="relative h-full w-full">
                          <Image
                            src={partner.logo}
                            alt={`${partner.name} logo`}
                            fill
                            sizes="140px"
                            className="object-contain opacity-85 transition duration-300 group-hover/logo:scale-105 group-hover/logo:opacity-100"
                          />
                        </div>
                        <div className="pointer-events-none absolute inset-x-3 top-3 translate-y-2 opacity-0 transition duration-300 group-hover/logo:translate-y-0 group-hover/logo:opacity-100">
                          <div className="rounded-xl border border-black/10 bg-white/95 px-3 py-2 text-left text-slate-900 shadow-[0_16px_30px_rgba(0,0,0,0.2)]">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                              {group.tier}
                            </p>
                            <p className="text-xs font-semibold">{partner.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Reveal>
    );
  };

  const companionGroup = partnerGroups.find((group) => group.id === "companion");
  const studioMediaGroup = partnerGroups.find((group) => group.id === "studio-media");
  const studioSection =
    studioMediaGroup && "sections" in studioMediaGroup
      ? studioMediaGroup.sections?.find((section) => section.id === "studio")
      : undefined;
  const mediaSection =
    studioMediaGroup && "sections" in studioMediaGroup
      ? studioMediaGroup.sections?.find((section) => section.id === "media")
      : undefined;
  const studioGroup =
    studioMediaGroup && studioSection
      ? {
          id: "studio",
          label: studioSection.label,
          tier: studioSection.label,
          slot: studioSection.slot ?? "",
          note: studioSection.note ?? "",
          accent: studioMediaGroup.accent,
          partners: studioSection.partners,
        }
      : undefined;
  const mediaGroup =
    studioMediaGroup && mediaSection
      ? {
          id: "media",
          label: mediaSection.label,
          tier: mediaSection.label,
          slot: mediaSection.slot ?? "",
          note: mediaSection.note ?? "",
          accent: studioMediaGroup.accent,
          partners: mediaSection.partners,
        }
      : undefined;

  return (
    <div className="space-y-10 md:space-y-12">
      <section
        className="relative isolate w-screen overflow-hidden bg-black py-10 sm:py-12 lg:py-14"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(142,240,255,0.08),transparent_42%),radial-gradient(circle_at_80%_5%,rgba(255,141,106,0.08),transparent_38%),linear-gradient(180deg,rgba(0,0,0,0.99),rgba(0,0,0,0.9))]" />
        <div className="pointer-events-none absolute inset-0 opacity-45 mix-blend-screen bg-[radial-gradient(circle_at_35%_65%,rgba(188,162,255,0.12),transparent_48%)]" />
        <div className="relative mx-auto w-[min(1200px,92vw)]">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal className="space-y-5">
              <Badge variant="glow">chương 3</Badge>
              <h1 className="font-display text-4xl leading-tight text-foam sm:text-5xl lg:text-6xl">
                Nghệ sĩ & đối tác đã đồng hành.
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative lg:-mr-16">
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-ember/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 -left-12 h-32 w-32 rounded-full bg-pearl/25 blur-3xl" />
                <div className="relative h-[200px] w-full overflow-hidden rounded-[24px] sm:h-[230px] lg:h-[260px]">
                  {bannerSlides.map((slide, index) => (
                    <div
                      key={slide.src}
                      className="absolute inset-0 banner-slide"
                      style={{
                        animationDuration: `${bannerDuration}s`,
                        animationDelay: `${index * bannerDelay}s`,
                      }}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        sizes="(min-width: 1024px) 680px, 92vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/35 via-black/5 to-black/35" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/35" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Section
        eyebrow="Artists Wall"
        title="Collab Artists"
        description="Frame nền đen với collage nghệ sĩ; hover để phóng sáng và xem chú thích."
        backgroundPreset="noirBase"
        className="bg-black/40"
      >
        <Reveal>
          <div className="relative isolate h-[320px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black/95 p-4 shadow-[0_28px_90px_rgba(0,0,0,0.55)] sm:h-[380px] md:h-[460px] md:p-6 lg:h-[540px]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_72%_10%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,141,106,0.12),transparent_45%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.08),transparent_45%)]" />
            <div className="pointer-events-none absolute inset-0 z-[5]">
              <Meteors number={18} className="bg-white/70 before:from-white/80" />
            </div>
            <div className="relative h-full w-full">
              {artistWall.map((artist) => {
                const raiseOnHover = artist.id !== "theflob" && artist.id !== "the-cassette";
                const tooltipPosition =
                  artist.tooltipPosition === "top" ? "bottom-full mb-3" : "top-full mt-3";
                const tooltipAlign =
                  artist.tooltipAlign === "left"
                    ? "left-0"
                    : artist.tooltipAlign === "right"
                      ? "right-0"
                      : "left-1/2 -translate-x-1/2";
                const tooltipMotion =
                  artist.tooltipPosition === "top" ? "-translate-y-2" : "translate-y-2";

                return (
                  <div
                    key={artist.id}
                    className={`group/artist absolute aspect-square -translate-x-1/2 cursor-pointer transition-transform duration-300 ease-out ${artist.zIndex} ${raiseOnHover ? "hover:z-40 focus-visible:z-40" : ""} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/80`}
                    style={artist.position}
                    role="button"
                    tabIndex={0}
                    aria-label={artist.name}
                  >
                    <div className="absolute -inset-6 -z-10 scale-90 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.35),rgba(255,141,106,0.18),transparent_70%)] opacity-0 blur-2xl transition duration-300 ease-out group-hover/artist:scale-110 group-hover/artist:opacity-100 group-focus-within/artist:scale-110 group-focus-within/artist:opacity-100" />
                    <div className="relative h-full w-full origin-bottom transition-transform duration-300 ease-out group-hover/artist:scale-[1.04] group-focus-within/artist:scale-[1.04]">
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        sizes="(min-width: 1024px) 260px, (min-width: 768px) 220px, 180px"
                        className="object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
                      />
                    </div>
                    <div
                      className={`pointer-events-none absolute ${tooltipPosition} ${tooltipAlign} ${tooltipMotion} origin-top opacity-0 transition duration-300 ease-out group-hover/artist:translate-y-0 group-hover/artist:opacity-100 group-focus-within/artist:translate-y-0 group-focus-within/artist:opacity-100`}
                    >
                      <div className="min-w-[180px] rounded-xl border border-black/10 bg-white/95 px-4 py-3 text-slate-900 shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                          {artist.tag}
                        </p>
                        <p className="text-sm font-semibold">{artist.name}</p>
                        <p className="text-xs text-slate-600">{artist.note}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section
        eyebrow="Partners by Tier"
        title="Sponsors & Partners"
        description="Những đối tác đã từng đồng hành."
        backgroundPreset="noirGlow"
        className="bg-black/40 w-[min(980px,92vw)] mx-auto"
      >
        <div className="w-full flex flex-wrap items-center gap-3 gap-y-6">
          <input
            id="partners-tab-sponsors"
            name="partners-tab"
            type="radio"
            defaultChecked
            className="peer/partners-sponsors sr-only"
          />
          <label
            htmlFor="partners-tab-sponsors"
            className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-foam/70 transition duration-300 hover:border-white/30 hover:text-foam peer-checked/partners-sponsors:bg-white/10 peer-checked/partners-sponsors:text-foam peer-checked/partners-sponsors:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
          >
            Nhà tài trợ
          </label>
          <input
            id="partners-tab-collab"
            name="partners-tab"
            type="radio"
            className="peer/partners-collab sr-only"
          />
          <label
            htmlFor="partners-tab-collab"
            className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-foam/70 transition duration-300 hover:border-white/30 hover:text-foam peer-checked/partners-collab:bg-white/10 peer-checked/partners-collab:text-foam peer-checked/partners-collab:shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
          >
            Đối tác
          </label>

          <div className="hidden w-full peer-checked/partners-sponsors:block">
            <div className="space-y-6">
              {diamondGroup ? renderSponsorCard(diamondGroup, 0) : null}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {tierGroups.map((group, index) => renderSponsorCard(group, index + 1))}
              </div>
            </div>
          </div>

          <div className="hidden w-full peer-checked/partners-collab:block">
            <div className="grid gap-6 lg:grid-cols-[2fr_1fr] lg:items-stretch">
              <div className="h-full self-stretch">
                {mediaGroup ? renderPartnerGroup(mediaGroup, 0) : null}
              </div>
              <div className="grid h-full grid-rows-[1fr_1fr] gap-6 self-stretch">
                {companionGroup ? renderPartnerGroup(companionGroup, 1) : null}
                {studioGroup ? renderPartnerGroup(studioGroup, 2) : null}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <section
        className="relative isolate w-screen overflow-hidden bg-black/80 py-12 sm:py-16 lg:py-20"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        <Reveal className="relative z-10">
          <div className="relative mx-auto w-[min(1200px,92vw)]">
            <h2 className="mb-6 font-display text-4xl text-foam drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)] sm:text-5xl">
              Các hoạt động nổi bật
            </h2>
            <div className="relative">
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-black">
                <Image
                  src={interactionFrameImage}
                  alt="Interaction frame"
                  fill
                  sizes="(min-width: 1280px) 1200px, 92vw"
                  className="object-contain"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/35" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
