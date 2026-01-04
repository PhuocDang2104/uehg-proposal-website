"use client";

import clsx from "clsx";
import { useState } from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

type StackCard = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  paragraphs?: string[];
  bullets?: string[];
  images?: { src: string; alt: string }[];
};

const stackCards: StackCard[] = [
  {
    id: "story",
    label: "Nội dung",
    title: "Hành trình “Ngược Dòng”",
    subtitle: "Dòng chảy khát vọng trở về cội nguồn",
    paragraphs: [
      "Trong mỗi con người luôn ẩn giấu một dòng chảy lặng lẽ, nơi những khát vọng tuổi trẻ âm thầm lớn lên, không ngừng vẫy gọi và dẫn ta tiến về phía trước. Hành trình “Ngược Dòng” cũng giống như cách cá hồi tìm về cội nguồn, bền bỉ, mãnh liệt và đầy bản lĩnh. Âm nhạc trở thành nhịp đập giữ cho trái tim không lạc hướng, giữ cho những khát khao tiếp tục rực sáng giữa muôn vàn thử thách. Trong khoảnh khắc thanh âm ngân lên, ta như thấy mình đang trở về với chính bản nguyên sâu thẳm nhất, nơi ta bắt đầu và nơi ta tìm thấy lý do để tiếp tục bước đi.",
      "Đến với Guitar Show “Nơi Bắt Đầu 2025 – Ngược Dòng”, UEHG không chỉ kể về câu chuyện của cá hồi kiên cường mà còn gửi gắm tinh thần dám đi khác số đông của tuổi trẻ. Đó là hành trình lớn lên từ những dòng sông nhỏ, vươn ra biển lớn, rồi lại quay về với cội nguồn để tiếp nối hành trình sống của chính mình. Bằng sức mạnh của âm nhạc, các bạn trẻ sẽ được khơi dậy những vùng cảm xúc tưởng như đã lắng sâu, tìm lại giá trị thật trong tâm hồn và nhận ra rằng dù dòng đời có cuộn xoáy đến đâu, chúng ta vẫn luôn có một điểm trở về, nơi ý chí, niềm tin và ước mơ hợp lại thành sức mạnh để bước tiếp.",
    ],
    images: [
      { src: "/nbd_resource/NBD_banner.png", alt: "Poster Nơi Bắt Đầu 2025 – Ngược Dòng" },
      { src: "/posters/show-02.png", alt: "Hình ảnh sân khấu UEHG" },
    ],
  },
  {
    id: "info",
    label: "Thông tin",
    title: "Guitar Show 2026",
    subtitle: "Quy mô — Địa điểm — Thời gian",
    bullets: [
      "Quy mô: 1000 sinh viên trên địa bàn TPHCM.",
      "Địa điểm: Hội trường A.116 ĐH Kinh tế TPHCM.",
      "Thời gian: 17h30–21h30 ngày 25/01/2026.",
    ],
    images: [
      { src: "/posters/show-03.png", alt: "Không gian hội trường A.116" },
      { src: "/posters/show-04.png", alt: "Khoảnh khắc ánh sáng tại show UEHG" },
    ],
  },
  {
    id: "purpose",
    label: "Mục đích",
    title: "Đi ngược để chạm đích",
    subtitle: "Ý nghĩa của hành trình 2026",
    bullets: [
      "Gây quỹ 150M+ cho hoạt động thiện nguyện & học bổng âm nhạc.",
      "Kết nối nhà tài trợ với cộng đồng guitarist trẻ UEH và TPHCM.",
      "Truyền cảm hứng dám đi khác số đông, mở đường cho mùa show 2026.",
    ],
    paragraphs: [
      "Mỗi đêm diễn là lời cam kết về một cộng đồng sáng tạo, tử tế và giàu nội lực, nơi âm nhạc dẫn dắt tinh thần bền bỉ giống cá hồi ngược dòng.",
    ],
    images: [
      { src: "/posters/show-07.png", alt: "Tinh thần thiện nguyện UEHG" },
      { src: "/posters/show-08.png", alt: "Cộng đồng Guitar UEH" },
    ],
  },
];

const SalmonMilestoneStack = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div
      className="relative flex h-full min-h-[520px] flex-col gap-4"
      onMouseLeave={() => setActiveId(null)}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_20%_0%,rgba(146,240,255,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,141,106,0.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent)] blur-3xl opacity-60" />

      {stackCards.map((card, index) => {
        const isActive = activeId === card.id;
        const hasHover = activeId !== null;
        const grow = hasHover ? (isActive ? 2.05 : 0.55) : 1;

        return (
          <div
            key={card.id}
            tabIndex={0}
            onFocus={() => setActiveId(card.id)}
            onMouseEnter={() => setActiveId(card.id)}
            onClick={() => setActiveId((current) => (current === card.id ? null : card.id))}
            className="relative flex outline-none"
            style={{
              flexGrow: grow,
              flexBasis: 0,
              minHeight: hasHover ? (isActive ? "240px" : "100px") : "140px",
              transition: "flex-grow 420ms ease, min-height 420ms ease",
            }}
          >
            <CardContainer
              className={clsx(
                "group/card relative z-10 flex w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-md",
                "transition duration-500 ease-out",
                isActive
                  ? "shadow-[0_22px_80px_rgba(0,0,0,0.45)]"
                  : "shadow-[0_14px_50px_rgba(0,0,0,0.35)]",
              )}
            >
              <CardBody className="relative flex h-full min-h-0 flex-col gap-4 px-5 py-6 md:px-7">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <CardItem translateZ={80} className="font-display text-xl text-foam md:text-2xl">
                      {card.title}
                    </CardItem>
                    <CardItem translateZ={55} className="text-sm text-foam/70 md:text-base">
                      {card.subtitle}
                    </CardItem>
                    {isActive && (
                      <CardItem
                        translateZ={60}
                        className="inline-flex rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-foam/70"
                      >
                        {card.label}
                      </CardItem>
                    )}
                  </div>
                  {isActive && (
                    <CardItem
                      translateZ={70}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-foam/80 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </CardItem>
                  )}
                </div>

                <div
                  className={clsx(
                    "relative flex flex-1 min-h-0 flex-col gap-4 transition-all duration-500 ease-out",
                    isActive
                      ? "max-h-[420px] opacity-100 translate-y-0 overflow-y-auto pr-1"
                      : "max-h-0 -translate-y-1 opacity-0 pointer-events-none overflow-hidden",
                  )}
                >
                  {card.paragraphs && (
                    <CardItem translateZ={45} className="space-y-3 text-sm leading-relaxed text-foam/80 md:text-[15px]">
                      {card.paragraphs.map((paragraph, idx) => (
                        <p key={`${card.id}-p-${idx}`}>{paragraph}</p>
                      ))}
                    </CardItem>
                  )}

                  {card.bullets && (
                    <CardItem translateZ={55} className="space-y-2 text-sm text-foam/80">
                      <ul className="space-y-2">
                        {card.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 rounded-xl bg-white/5 px-3 py-2 text-foam/80">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ember" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </CardItem>
                  )}

                  {card.images && (
                    <div className="grid gap-3 md:grid-cols-2">
                      {card.images.map((image, idx) => (
                        <CardItem
                          key={`${card.id}-img-${idx}`}
                          translateZ={75}
                          className={clsx(
                            "overflow-hidden rounded-2xl border border-white/10 bg-black/30 transition duration-500 ease-out",
                            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                          )}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="h-32 w-full object-cover md:h-36"
                            loading="lazy"
                            draggable={false}
                          />
                        </CardItem>
                      ))}
                    </div>
                  )}

                </div>
              </CardBody>
            </CardContainer>
          </div>
        );
      })}
    </div>
  );
};

export default SalmonMilestoneStack;
