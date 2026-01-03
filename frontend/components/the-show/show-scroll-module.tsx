"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollNavigationPath } from "@/components/the-show/scroll-navigation-path";
import { ScrollAnimate, useScrollAnimations } from "@/components/the-show/scroll-animate";
import { useScrollTracker } from "@/components/the-show/scroll-tracker";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { cn } from "@/lib/utils";

type FishEasing = {
  stiffness?: number;
  damping?: number;
  mass?: number;
};

type ScrollAnimationType = "fade-up" | "fade-left" | "fade-right" | "zoom-in";

type AnimationConfig = {
  fadeDuration?: number;
  zoomDuration?: number;
  delayStep?: number;
  baseDelay?: number;
  types?: {
    eyebrow?: ScrollAnimationType;
    title?: ScrollAnimationType;
    body?: ScrollAnimationType;
    accent?: ScrollAnimationType;
    card?: ScrollAnimationType;
    side?: ScrollAnimationType;
  };
};

type ShowScrollModuleProps = {
  amplitude?: number;
  sidePadding?: number;
  segmentHeight?: number;
  fishSize?: number;
  fishEasing?: FishEasing;
  animation?: AnimationConfig;
};

type PastShow = { name: string; note: string };

type ArtistTopTrack = {
  title: string;
  note?: string;
  image: string;
};

type ArtistHighlight = {
  eyebrow: string;
  name: string;
  details: string[];
  image: string;
  imageAlt: string;
  topTracks?: ArtistTopTrack[];
};

type ShowSection = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  body?: string[];
  chips?: string[];
  stats?: { label: string; value: string }[];
  list?: PastShow[];
  chapters?: { title: string; detail: string }[];
  artist?: ArtistHighlight;
  hero?: boolean;
};

const keyVisualChips = ["Cá hồi", "Thác nước"];

const chapters = [
  { title: "Dòng chảy khát vọng", detail: "Cinematic mở màn bằng ánh phản chiếu." },
  { title: "Bền bỉ ngược dòng", detail: "Ripple transition tôn vinh ý chí cá hồi." },
  { title: "Trở về nơi bắt đầu", detail: "Cao trào kết, nhấn mạnh điểm trở về." },
];

const showCarouselSlides = [
  {
    src: "/assets/socialproof_banner.png",
    alt: "Show carousel slide 01",
    label: "Flow 01",
  },
  {
    src: "/assets/socialproof_banner2.png",
    alt: "Show carousel slide 02",
    label: "Flow 02",
  },
  {
    src: "/assets/socialproof_banner3.png",
    alt: "Show carousel slide 03",
    label: "Flow 03",
  },
];

const draggableShowCards = [
  {
    src: "/assets/drag-mock-01.png",
    alt: "Draggable mock 01",
    label: "Mock 01",
    className: "lg:left-0 lg:top-6 lg:-rotate-7 lg:z-30",
  },
  {
    src: "/assets/drag-mock-02.png",
    alt: "Draggable mock 02",
    label: "Mock 02",
    className: "lg:left-16 lg:top-0 lg:rotate-3 lg:z-20",
  },
  {
    src: "/assets/drag-mock-03.png",
    alt: "Draggable mock 03",
    label: "Mock 03",
    className: "lg:left-32 lg:top-16 lg:-rotate-2 lg:z-10",
  },
  {
    src: "/assets/drag-mock-04.png",
    alt: "Draggable mock 04",
    label: "Mock 04",
    className: "lg:left-8 lg:top-48 lg:rotate-6 lg:z-20",
  },
  {
    src: "/assets/drag-mock-05.png",
    alt: "Draggable mock 05",
    label: "Mock 05",
    className: "lg:left-24 lg:top-64 lg:-rotate-8 lg:z-30",
  },
];

const expectedResultsMetrics = [
  {
    value: "50.000",
    text:
      "tiếp cận đối với Clip về chương trình bao gồm 15s Giới thiệu NTT Kim Cương",
  },
  {
    value: "50.000",
    text:
      "tiếp cận đối với APTT chính thức có sự xuất hiện nổi bật sản phẩm của NTT Kim Cương",
  },
];

const expectedResultsReach = [
  {
    value: "20+",
    text: "Tổ chức/Câu lạc bộ/Đội/Nhóm hỗ trợ truyền thông",
  },
  {
    value: "7+",
    text: "Đầu báo/Đối tác lớn là đơn vị bảo trợ truyền thông",
  },
];

const expectedResultsOffline = {
  value: "2 Ngày",
  text: "Đặt booth truyền thông trực tiếp tại Đại Học Kinh tế Thành phố Hồ Chí Minh",
};

const expectedResultsImage = "/assets/soldout.png";

const showSections: ShowSection[] = [
  {
    id: "gioi-thieu",
    eyebrow: "Giới thiệu NBĐ 2026",
    title: "Nơi Bắt Đầu: Ngược dòng",
    subtitle: "Key Visual: Cá hồi, thác nước",
    body: [
      "Trong mỗi con người luôn ẩn giấu một dòng chảy lặng lẽ, nơi những khát vọng tuổi trẻ âm thầm lớn lên, không ngừng vẫy gọi và dẫn ta tiến về phía trước. Hành trình \"Ngược Dòng\" cũng giống như cách cá hồi tìm về cội nguồn, bền bỉ, mãnh liệt và đầy bản lĩnh.",
    ],
    chips: keyVisualChips,
    hero: true,
  },
  {
    id: "nguoc-dong",
    eyebrow: "Hành trình Ngược Dòng",
    title: "Âm nhạc giữ nhịp trái tim",
    body: [
      "Âm nhạc trở thành nhịp đập giữ cho trái tim không lạc hướng, giữ cho những khát khao tiếp tục rực sáng giữa muôn vàn thử thách. Trong khoảnh khắc thanh âm ngân lên, ta như thấy mình đang trở về với chính bản nguyên sâu thẳm nhất, nơi ta bắt đầu và nơi ta tìm thấy lý do để tiếp tục bước đi.",
      "Đến với Guitar Show \"Nơi Bắt Đầu 2026 - Ngược Dòng\", UEHG không chỉ kể về câu chuyện của cá hồi kiên cường mà còn gửi gắm tinh thần dám đi khác số đông của tuổi trẻ. Đó là hành trình lớn lên từ những dòng sông nhỏ, vươn ra biển lớn, rồi lại quay về với cội nguồn để tiếp nối hành trình sống của chính mình.",
    ],
    chapters,
    artist: {
      eyebrow: "NGHỆ SĨ",
      name: "T.R.I",
      image: "/artists/TRI.png",
      imageAlt: "T.R.I",
      topTracks: [
        {
          title: "Ánh Sao Và Bầu Trời",
          note: "Top 1 Spotify",
          image: "/assets/tri-track-01.png",
        },
        {
          title: "Một Bài Hát Không Vui Mấy",
          note: "16.000.000 lượt xem",
          image: "/assets/tri-track-02.png",
        },
        {
          title: "Lặng Im Và Tan Vỡ",
          note: "29.000 lượt xem",
          image: "/assets/tri-track-03.png",
        },
      ],
      details: [
        "Là một trong những gương mặt trẻ theo đuổi con đường âm nhạc nghiêm túc với màu sắc trầm lắng, giàu cảm xúc.",
        "Chủ nhân ca khúc hit Ánh Sao Và Bầu Trời (2021) - sản phẩm đánh dấu dấu ấn cá nhân rõ nét trong phong cách sáng tác và thể hiện.",
        "T.R.I liên tục cho ra mắt các sản phẩm âm nhạc mới như Một bài hát không vui mấy, Lặng im và tan vỡ, Trở thành quá khứ, Lễ đường của em (2024).",
      ],
    },
  },
  {
    id: "thong-tin",
    eyebrow: "Thông tin chương trình",
    title: "Quy mô & thời gian",
    body: [
      "Bằng sức mạnh của âm nhạc, các bạn trẻ sẽ được khơi dậy những vùng cảm xúc tưởng như đã lắng sâu, tìm lại giá trị thật trong tâm hồn và nhận ra rằng dù dòng đời có cuộn xoáy đến đâu, chúng ta vẫn luôn có một điểm trở về.",
    ],
    stats: [
      { label: "Quy mô", value: "1000 sinh viên trên địa bàn TPHCM" },
      { label: "Địa điểm", value: "Hội trường A.116 ĐH Kinh tế TPHCM" },
      { label: "Thời gian", value: "17h30-21h30 · 24/01/2026" },
    ],
  },
  {
    id: "ket-qua-du-kien",
    eyebrow: "Truyền thông",
    title: "Kết quả dự kiến",
  },
];

export const ShowScrollModule = ({
  amplitude = 2000,
  sidePadding = 96,
  segmentHeight = 280,
  fishSize = 30,
  fishEasing,
  animation,
}: ShowScrollModuleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const fadeDuration = animation?.fadeDuration ?? 700;
  const zoomDuration = animation?.zoomDuration ?? 650;
  const delayStep = animation?.delayStep ?? 80;
  const baseDelay = animation?.baseDelay ?? 140;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const carouselCount = showCarouselSlides.length;
  const activeCarouselSlide = showCarouselSlides[carouselIndex] ?? showCarouselSlides[0];

  useEffect(() => {
    if (carouselPaused || carouselCount < 2) return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselCount);
    }, 6200);
    return () => clearInterval(interval);
  }, [carouselPaused, carouselCount]);

  const handleCarouselPrev = () => {
    if (!carouselCount) return;
    setCarouselIndex((prev) => (prev - 1 + carouselCount) % carouselCount);
  };

  const handleCarouselNext = () => {
    if (!carouselCount) return;
    setCarouselIndex((prev) => (prev + 1) % carouselCount);
  };

  useScrollAnimations(containerRef, {
    rootMargin: "0px 0px -20% 0px",
    threshold: 0.2,
  });

  const { activeIndex, progress } = useScrollTracker({
    containerRef,
    sectionRefs,
    rootMargin: "-40% 0px -40% 0px",
  });
  const artistTrackPositions = [
    "left-[-12%] top-[6%] -translate-x-6 -translate-y-4",
    "right-[-10%] top-[18%] translate-x-6 -translate-y-2",
    "right-[-6%] bottom-[-12%] translate-x-4 translate-y-6",
  ];
  const artistTrackDelays = ["", "delay-100", "delay-200"];

  return (
    <section className="relative w-full overflow-hidden bg-[#030303] pb-14 pt-0 sm:pb-16 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(95,150,170,0.04),transparent_46%),radial-gradient(circle_at_85%_12%,rgba(170,95,70,0.05),transparent_52%),linear-gradient(180deg,rgba(0,0,0,0.995),rgba(2,4,8,0.995))]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_25%_80%,rgba(188,162,255,0.12),transparent_50%)]" />
      <div className="pointer-events-none absolute -inset-20 opacity-30 mix-blend-screen blur-3xl bg-[radial-gradient(circle_at_20%_30%,rgba(142,240,255,0.2),transparent_55%),radial-gradient(circle_at_80%_65%,rgba(255,141,106,0.18),transparent_60%),radial-gradient(circle_at_55%_10%,rgba(188,162,255,0.16),transparent_55%)] animate-[hue-rotate_22s_linear_infinite]" />

      <div ref={containerRef} className="relative w-full px-6 sm:px-10 lg:px-14">
        <ScrollNavigationPath
          containerRef={containerRef}
          sectionRefs={sectionRefs}
          activeIndex={activeIndex}
          progress={progress}
          amplitude={amplitude}
          sidePadding={sidePadding}
          fishSize={fishSize}
          fishEasing={fishEasing}
          className="opacity-85 z-[5]"
        />

        <div className="relative z-10 space-y-16 sm:space-y-20 lg:space-y-24">
          {showSections.map((section, index) => {
            const isOutcomeSection = section.id === "ket-qua-du-kien";
            const isRight = isOutcomeSection ? false : index % 2 === 1;
            const hasArtist = Boolean(section.artist);
            const isHero = Boolean(section.hero);
            const hasCarousel = section.id === "thong-tin";
            const hasDraggableDeck = section.id === "nguoc-dong";
            const carouselOnRight = hasCarousel;
            const isArtistGlow = hasArtist && section.id === "nguoc-dong" && activeIndex === index;
            const stackAlignClasses = isRight ? "items-end" : "items-start";
            const mainCardAlignClasses = isRight
              ? "self-end md:mr-12 lg:mr-16"
              : "self-start md:ml-12 lg:ml-16";
            const cardPositionClasses = hasCarousel
              ? isRight
                ? "self-start md:mr-12 lg:mr-16"
                : "self-start md:ml-12 lg:ml-16"
              : mainCardAlignClasses;
            const primaryPositionClasses = hasDraggableDeck
              ? mainCardAlignClasses
              : cardPositionClasses;
            const cardWidthClasses = hasArtist ? "lg:w-[520px] lg:max-w-[520px]" : "";
            const primaryWidthClasses = hasDraggableDeck
              ? "max-w-[760px]"
              : isOutcomeSection
                ? "max-w-[920px]"
                : "max-w-[560px]";
            const artistAlignClasses = "w-full flex justify-center";
            const cardAlignClasses = isRight
              ? "items-end text-right md:pl-16"
              : "items-start text-left md:pr-16";
            const primaryAlignClasses = hasDraggableDeck
              ? "items-start text-left"
              : isOutcomeSection
                ? "items-start text-left"
                : cardAlignClasses;
            const effectiveCardWidthClasses = hasDraggableDeck ? "" : cardWidthClasses;
            const motionFrom = isRight ? "fade-left" : "fade-right";
            const eyebrowAnim = animation?.types?.eyebrow ?? motionFrom;
            const titleAnim = animation?.types?.title ?? "fade-up";
            const bodyAnim = animation?.types?.body ?? "fade-up";
            const accentAnim = animation?.types?.accent ?? "zoom-in";
            const cardAnim = animation?.types?.card ?? motionFrom;
            const sideAnim = animation?.types?.side ?? motionFrom;
            const carouselAnim = carouselOnRight ? "fade-left" : "fade-right";
            const isActive = activeIndex === index;
            const baseCardClassName = cn(
              "flex w-full flex-col gap-5 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm transition duration-300",
              primaryPositionClasses,
              primaryWidthClasses,
              effectiveCardWidthClasses,
              primaryAlignClasses,
              isActive
                ? "border-pearl/40 shadow-[0_30px_90px_rgba(142,240,255,0.18)]"
                : "",
              section.hero ? "bg-white/10" : "",
              isOutcomeSection
                ? "relative overflow-visible border-0 bg-transparent p-0 shadow-none backdrop-blur-0"
                : "",
            );
            const draggableContentClasses =
              "flex w-full flex-col rounded-[28px] border-white/10 backdrop-blur-sm transition duration-300 self-end md:mr-12 lg:mr-16 max-w-[760px] items-start text-left border-0 bg-transparent p-0 shadow-none backdrop-blur-0 gap-0";
            const cardClassName = hasDraggableDeck ? draggableContentClasses : baseCardClassName;
            const carouselNode = hasCarousel ? (
              <ScrollAnimate
                animation={carouselAnim}
                duration={zoomDuration}
                delay={120}
                className="w-full lg:flex-[1.1]"
              >
                <div
                  className="group relative w-full overflow-hidden rounded-[30px] border border-white/10 bg-black/45 p-3 shadow-[0_32px_90px_rgba(0,0,0,0.55)] backdrop-blur-sm"
                  onMouseEnter={() => setCarouselPaused(true)}
                  onMouseLeave={() => setCarouselPaused(false)}
                  onFocusCapture={() => setCarouselPaused(true)}
                  onBlurCapture={() => setCarouselPaused(false)}
                >
                  <div className="relative aspect-video overflow-hidden rounded-[24px]">
                    {showCarouselSlides.map((slide, slideIndex) => (
                      <div
                        key={slide.src}
                        className={cn(
                          "absolute inset-0 transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          slideIndex === carouselIndex
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-[1.04]",
                        )}
                      >
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          draggable={false}
                        />
                      </div>
                    ))}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/30 bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-white/70">
                      Showcase
                    </div>
                    {activeCarouselSlide ? (
                      <div className="pointer-events-none absolute bottom-4 left-4 text-xs uppercase tracking-[0.28em] text-white/75">
                        {activeCarouselSlide.label}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-white/60">
                      <span>{String(carouselIndex + 1).padStart(2, "0")}</span>
                      <span className="text-white/30">/</span>
                      <span>{String(carouselCount).padStart(2, "0")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCarouselPrev}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 transition hover:border-white/40 hover:text-white"
                        aria-label="Previous slide"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                          <path
                            d="M15 6l-6 6 6 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleCarouselNext}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 transition hover:border-white/40 hover:text-white"
                        aria-label="Next slide"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                          <path
                            d="M9 6l6 6-6 6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    {showCarouselSlides.map((slide, slideIndex) => (
                      <button
                        key={`${slide.src}-indicator`}
                        type="button"
                        onClick={() => setCarouselIndex(slideIndex)}
                        className={cn(
                          "h-[3px] flex-1 rounded-full bg-white/15 transition",
                          slideIndex === carouselIndex ? "bg-white/75" : "hover:bg-white/35",
                        )}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </ScrollAnimate>
            ) : null;
            const draggableDeckNode = hasDraggableDeck ? (
              <ScrollAnimate
                animation={cardAnim}
                duration={zoomDuration}
                delay={120}
                className="w-full lg:w-[420px] lg:flex-none"
              >
                <DraggableCardContainer className="relative flex w-full flex-col items-start gap-4 lg:block lg:min-h-[520px]">
                  {draggableShowCards.map((card, cardIndex) => (
                    <DraggableCardBody
                      key={`${card.src}-${cardIndex}`}
                      className={cn(
                        "w-full min-h-[220px] rounded-2xl bg-black/45 p-0 sm:w-56 lg:absolute lg:min-h-[240px] lg:w-60",
                        card.className,
                      )}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-2xl">
                        <img
                          src={card.src}
                          alt={card.alt}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          draggable={false}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/65" />
                        <div className="pointer-events-none absolute left-3 top-3 rounded-full border border-white/25 bg-black/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.32em] text-white/70">
                          {card.label}
                        </div>
                      </div>
                    </DraggableCardBody>
                  ))}
                </DraggableCardContainer>
              </ScrollAnimate>
            ) : null;

            return (
              <section
                key={section.id}
                id={section.id}
                ref={(el) => {
                  sectionRefs.current[index] = el;
                }}
                className={cn(
                  "relative flex items-center",
                  isRight ? "justify-end" : "justify-start",
                )}
                style={{ minHeight: isHero ? "100vh" : segmentHeight }}
              >
                {isHero ? (
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[url('/assets/theshow_bg.png')] bg-cover bg-center" />
                    <div className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-gradient-to-b from-black/95 via-black/35 to-black/95" />
                  </div>
                ) : null}

                <div
                  className={cn(
                    "relative z-10 flex w-full flex-col gap-6",
                    stackAlignClasses,
                    isHero ? "pt-14 sm:pt-20 lg:pt-24" : "",
                  )}
                >
                  <div
                    className={cn(
                      "flex w-full flex-col gap-6",
                      hasCarousel || hasDraggableDeck || isOutcomeSection
                        ? "lg:flex-row lg:items-start lg:gap-10"
                        : "",
                      hasDraggableDeck ? "lg:justify-end lg:gap-8" : "",
                    )}
                  >
                    {!carouselOnRight ? carouselNode : null}
                    {draggableDeckNode}
                    <div className={cardClassName}>
                      {isOutcomeSection ? (
                        <>
                          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(78,140,255,0.18),transparent_45%),radial-gradient(circle_at_82%_15%,rgba(255,141,106,0.2),transparent_48%),radial-gradient(circle_at_50%_85%,rgba(188,162,255,0.12),transparent_55%)]" />
                          <div className="pointer-events-none absolute inset-0 opacity-45 mix-blend-screen bg-[radial-gradient(circle_at_30%_80%,rgba(142,240,255,0.18),transparent_50%)]" />

                          <div className="relative z-10 flex flex-col gap-6 rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                            <div className="space-y-3">
                              <ScrollAnimate animation={titleAnim} duration={fadeDuration}>
                                <Badge variant="glow">{section.eyebrow}</Badge>
                              </ScrollAnimate>
                              <ScrollAnimate
                                animation={titleAnim}
                                duration={fadeDuration}
                                delay={80}
                              >
                                <h2 className="font-display text-4xl text-foam sm:text-5xl lg:text-6xl">
                                  {section.title}
                                </h2>
                              </ScrollAnimate>
                            </div>

                            <div className="space-y-3">
                              {expectedResultsMetrics.map((metric, idx) => (
                                <ScrollAnimate
                                  key={`${metric.value}-${idx}`}
                                  animation={bodyAnim}
                                  duration={fadeDuration}
                                  delay={baseDelay + idx * delayStep}
                                >
                                  <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/45 px-5 py-4 sm:flex-row sm:items-center sm:gap-4">
                                    <span className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-sky-500/70 via-blue-600/70 to-indigo-500/70 px-6 text-xl font-semibold text-white shadow-[0_12px_30px_rgba(30,64,175,0.35)]">
                                      {metric.value}
                                    </span>
                                    <p className="text-base text-foam/80 sm:text-lg">
                                      {metric.text}
                                    </p>
                                  </div>
                                </ScrollAnimate>
                              ))}
                            </div>

                            <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
                              <ScrollAnimate
                                animation={accentAnim}
                                duration={zoomDuration}
                                delay={160}
                              >
                                <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-5">
                                  <p className="text-xs uppercase tracking-[0.24em] text-foam/70">
                                    Tiếp cận ít nhất
                                  </p>
                                  <div className="mt-3 space-y-3">
                                    {expectedResultsReach.map((item) => (
                                      <div
                                        key={item.value}
                                        className="flex items-start gap-4"
                                      >
                                        <span className="text-4xl font-display text-pearl">
                                          {item.value}
                                        </span>
                                        <p className="pt-1 text-base text-foam/80">
                                          {item.text}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </ScrollAnimate>

                              <ScrollAnimate
                                animation={accentAnim}
                                duration={zoomDuration}
                                delay={220}
                              >
                                <div className="rounded-2xl border border-white/15 bg-white/5 px-5 py-5 text-center">
                                  <p className="text-xs uppercase tracking-[0.24em] text-foam/70">
                                    Truyền thông offline
                                  </p>
                                  <p className="mt-3 font-display text-5xl text-foam">
                                    {expectedResultsOffline.value}
                                  </p>
                                  <p className="mt-2 text-base text-foam/80">
                                    {expectedResultsOffline.text}
                                  </p>
                                </div>
                              </ScrollAnimate>
                            </div>
                          </div>
                        </>
                      ) : null}

                      {!isOutcomeSection ? (
                        <>
                          <ScrollAnimate animation={eyebrowAnim} duration={fadeDuration}>
                            <Badge variant="glow">{section.eyebrow}</Badge>
                          </ScrollAnimate>

                        <ScrollAnimate animation={titleAnim} duration={fadeDuration} delay={80}>
                          <h2
                            className={cn(
                              "font-display text-3xl text-foam sm:text-4xl",
                              section.hero ? "lg:text-5xl" : "",
                            )}
                          >
                            {section.title}
                          </h2>
                        </ScrollAnimate>

                        {section.subtitle ? (
                          <ScrollAnimate
                            animation={titleAnim}
                            duration={fadeDuration}
                            delay={120}
                          >
                            <p className="text-sm uppercase tracking-[0.24em] text-foam/60">
                              {section.subtitle}
                            </p>
                          </ScrollAnimate>
                        ) : null}

                        {section.body ? (
                          <div className="space-y-3">
                            {section.body.map((paragraph, idx) => (
                              <ScrollAnimate
                                key={`${section.id}-body-${idx}`}
                                animation={bodyAnim}
                                duration={fadeDuration}
                                delay={baseDelay + idx * delayStep}
                              >
                                <p className="text-sm leading-relaxed text-foam/80 sm:text-base">
                                  {paragraph}
                                </p>
                              </ScrollAnimate>
                            ))}
                          </div>
                        ) : null}

                        {section.chips ? (
                          <ScrollAnimate animation={accentAnim} duration={zoomDuration} delay={180}>
                            <div
                              className={cn(
                                "flex flex-wrap gap-2",
                                isRight ? "justify-end" : "justify-start",
                              )}
                            >
                              {section.chips.map((chip) => (
                                <span
                                  key={chip}
                                  className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-foam/70"
                                >
                                  {chip}
                                </span>
                              ))}
                            </div>
                          </ScrollAnimate>
                        ) : null}

                        {section.chapters ? (
                          <div className="grid gap-3">
                            {section.chapters.map((chapter, idx) => (
                              <ScrollAnimate
                                key={chapter.title}
                                animation={sideAnim}
                                duration={zoomDuration}
                                delay={200 + idx * delayStep}
                              >
                                <Card className="border-white/10 bg-black/40 p-4">
                                  <p className="text-sm font-semibold text-foam">
                                    {chapter.title}
                                  </p>
                                  <p className="text-xs text-foam/70">{chapter.detail}</p>
                                </Card>
                              </ScrollAnimate>
                            ))}
                          </div>
                        ) : null}

                        {section.stats ? (
                          <ScrollAnimate animation={accentAnim} duration={zoomDuration} delay={180}>
                            <div className="grid gap-3">
                              {section.stats.map((stat) => (
                                <div
                                  key={stat.label}
                                  className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/50 px-4 py-3"
                                >
                                  <span className="text-[10px] uppercase tracking-[0.28em] text-foam/60">
                                    {stat.label}
                                  </span>
                                  <span className="text-sm font-semibold text-foam">
                                    {stat.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </ScrollAnimate>
                        ) : null}

                      {section.list ? (
                        <div className="grid gap-3">
                          {section.list.map((show, idx) => (
                            <ScrollAnimate
                              key={show.name}
                              animation={cardAnim}
                              duration={zoomDuration}
                              delay={160 + idx * 60}
                            >
                              <div className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3">
                                <p className="text-sm font-semibold text-foam">{show.name}</p>
                                <p className="text-xs text-foam/70">{show.note}</p>
                              </div>
                            </ScrollAnimate>
                          ))}
                        </div>
                      ) : null}
                        </>
                      ) : null}
                    </div>
                    {isOutcomeSection ? (
                      <ScrollAnimate
                        animation="fade-left"
                        duration={zoomDuration}
                        delay={140}
                        className="w-full self-center lg:w-[440px] lg:flex-none"
                      >
                        <div className="relative mx-auto w-full max-w-[460px]">
                          <img
                            src={expectedResultsImage}
                            alt="Sold out 1000 vé"
                            className="block h-auto w-full object-contain bg-transparent"
                            loading="lazy"
                            draggable={false}
                          />
                        </div>
                      </ScrollAnimate>
                    ) : null}
                  {carouselOnRight ? carouselNode : null}
                  </div>

                  {section.artist ? (
                    <ScrollAnimate
                      animation={accentAnim}
                      duration={zoomDuration}
                      delay={220}
                      className={artistAlignClasses}
                    >
                        <div
                          className={cn(
                          "relative z-30 w-full max-w-[560px] mt-12 md:mt-16 lg:mt-20 transition-transform duration-500",
                          cardWidthClasses,
                          isArtistGlow ? "scale-[1.015]" : "",
                        )}
                      >
                        {isArtistGlow ? (
                          <>
                            <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(circle_at_30%_30%,rgba(142,240,255,0.4),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(255,141,106,0.28),transparent_65%)] opacity-70 blur-3xl animate-[pulse_3s_ease-in-out_infinite]" />
                            <div className="pointer-events-none absolute -inset-3 rounded-[34px] bg-[conic-gradient(from_120deg,rgba(142,240,255,0.22),rgba(255,141,106,0.2),rgba(188,162,255,0.24),rgba(142,240,255,0.22))] opacity-35 blur-2xl animate-[hue-rotate_14s_linear_infinite]" />
                            <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-pearl/50 opacity-40 animate-[ping_4s_ease-out_infinite]" />
                          </>
                        ) : null}
                        <div className="pointer-events-none absolute left-0 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(142,240,255,0.55),transparent_70%)] opacity-80 blur-2xl animate-pulse" />
                        <div className="pointer-events-none absolute left-0 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pearl/50 opacity-40 animate-[ping_4s_ease-out_infinite]" />
                        <div className="pointer-events-none absolute left-0 top-1/2 h-px w-[160px] -translate-x-full -translate-y-1/2 bg-pearl/35 lg:w-[200px]" />
                        <Card className="group/artist-card relative z-10 w-full !overflow-visible border-pearl/30 bg-white/95 text-left text-slate-900 shadow-[0_28px_80px_rgba(142,240,255,0.22)]">
                          <img
                            src={section.artist.image}
                            alt={section.artist.imageAlt}
                            className="pointer-events-none absolute left-1/2 top-0 z-30 h-48 w-auto max-w-[72%] -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_24px_40px_rgba(15,23,42,0.35)] sm:h-56"
                            loading="lazy"
                            draggable={false}
                          />
                          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl">
                            <img
                              src={section.artist.image}
                              alt=""
                              className="absolute -right-6 bottom-0 h-[120%] w-auto opacity-15"
                              loading="lazy"
                              draggable={false}
                            />
                          </div>
                          {section.artist.topTracks?.length ? (
                            <div className="pointer-events-none absolute inset-0 z-20 hidden sm:block">
                              {section.artist.topTracks.map((track, idx) => (
                                <div
                                  key={track.title}
                                  className={cn(
                                    "absolute w-44 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_16px_30px_rgba(15,23,42,0.15)] opacity-0 scale-95 transition-all duration-500 ease-out group-hover/artist-card:opacity-100 group-hover/artist-card:scale-100 group-hover/artist-card:translate-x-0 group-hover/artist-card:translate-y-0 group-focus-within/artist-card:opacity-100 group-focus-within/artist-card:scale-100 group-focus-within/artist-card:translate-x-0 group-focus-within/artist-card:translate-y-0",
                                    artistTrackPositions[idx % artistTrackPositions.length],
                                    artistTrackDelays[idx % artistTrackDelays.length],
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="h-12 w-16 flex-none overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                                      <img
                                        src={track.image}
                                        alt={track.title}
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                        draggable={false}
                                      />
                                    </div>
                                    <div className="min-w-0">
                                      <p className="text-xs font-semibold text-slate-800">
                                        {track.title}
                                      </p>
                                      {track.note ? (
                                        <p className="text-[10px] text-slate-500">
                                          {track.note}
                                        </p>
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                          <div className="relative z-10 flex flex-col items-start gap-4 pt-16 sm:pt-20">
                            <span className="text-[10px] uppercase tracking-[0.38em] text-slate-500">
                              {section.artist.eyebrow}
                            </span>
                            <p className="font-display text-3xl text-slate-900">
                              {section.artist.name}
                            </p>
                            <div className="max-w-[520px] space-y-2 text-sm text-slate-600">
                              {section.artist.details.map((line, idx) => (
                                <p key={`${section.id}-artist-${idx}`}>{line}</p>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </div>
                    </ScrollAnimate>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};
