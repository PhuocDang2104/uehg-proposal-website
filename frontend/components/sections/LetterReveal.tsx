"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { Button } from "../ui/button";

const fullLetterText = [
  "Kính gửi Quý đơn vị,",
  "Lời đầu tiên Câu lạc bộ Guitar Đại Học Kinh tế TP. Hồ Chí Minh (UEHG) kính gửi đến Quý đơn vị lời chúc sức khỏe và lời chào trân trọng nhất.",
  'UEHG được thành lập vào năm 2011, là sân chơi nghệ thuật với sứ mệnh thắp sáng và nuôi dưỡng ngọn lửa đam mê âm nhạc cho các thế hệ sinh viên. Trải qua nhiều năm duy trì và phát triển, với slogan “Just the beginning”, UEHG đã thành công xây dựng một cộng đồng, một sân chơi cho những tâm hồn trẻ yêu âm nhạc được học hỏi, được kết nối và thỏa sức đam mê của mình trên địa bàn TP. Hồ Chí Minh nói chung và sinh viên UEH nói riêng. Bên cạnh đó, UEHG cũng đã tổ chức thành công nhiều show diễn với quy mô lên đến 1000 sinh viên trong nhiều năm hoạt động. Và Guitar Show Nơi bắt đầu là một trong những chương trình thường niên lớn nhất của clb với sự bùng nổ của với các màn trình diễn nơi UEHG truyền tải nguồn năng lượng tích cực đến khán giả thông qua những giai điệu vô cùng đặc sắc.',
  'Guitar Show “NƠI BẮT ĐẦU - NGƯỢC DÒNG” năm 2026 diễn ra vào ngày 24/01 tại hội trường A116 Đại Học Kinh tế TP. Hồ Chí Minh. Để Guitar Show “NƠI BẮT ĐẦU - NGƯỢC DÒNG” được diễn ra suôn sẻ và trọn vẹn, sự đồng hành từ phía Quý đơn vị với tư cách là Nhà tài trợ của chương trình là một điều vô cùng quan trọng. Sự quan tâm và giúp đỡ của Quý đơn vị vừa góp phần tiếp lửa xây dựng một cộng đồng yêu âm nhạc nói chung vừa là nguồn động lực to lớn đối với UEHG trong quá trình thực hiện Guitar Show “NƠI BẮT ĐẦU - NGƯỢC DÒNG” nói riêng.',
  "Trân trọng,",
  "Câu lạc bộ Guitar Đại Học Kinh tế TP. Hồ Chí Minh.",
];

const fullLetterNodes: React.ReactNode[] = [
  <span key="greeting">
    Kính gửi <strong>Quý đơn vị</strong>,
  </span>,
  <span key="p1">
    Lời đầu tiên <strong>Câu lạc bộ Guitar Đại Học Kinh tế TP. Hồ Chí Minh (UEHG)</strong> kính gửi
    đến <strong>Quý đơn vị</strong> lời chúc sức khỏe và lời chào trân trọng nhất.
  </span>,
  <span key="p2">
    <strong>UEHG</strong> được thành lập vào năm 2011, là sân chơi nghệ thuật với sứ mệnh thắp sáng
    và nuôi dưỡng ngọn lửa đam mê âm nhạc cho các thế hệ sinh viên. Trải qua nhiều năm duy trì và phát
    triển, với slogan “Just the beginning”, UEHG đã thành công xây dựng một cộng đồng, một sân chơi
    cho những tâm hồn trẻ yêu âm nhạc được học hỏi, được kết nối và thỏa sức đam mê của mình trên địa
    bàn TP. Hồ Chí Minh nói chung và sinh viên UEH nói riêng. Bên cạnh đó, UEHG cũng đã tổ chức thành
    công nhiều show diễn với quy mô lên đến 1000 sinh viên trong nhiều năm hoạt động. Và Guitar Show
    Nơi bắt đầu là một trong những chương trình thường niên lớn nhất của clb với sự bùng nổ của với
    các màn trình diễn nơi UEHG truyền tải nguồn năng lượng tích cực đến khán giả thông qua những giai
    điệu vô cùng đặc sắc.
  </span>,
  <span key="p3">
    <strong>Guitar Show “NƠI BẮT ĐẦU - NGƯỢC DÒNG”</strong> năm 2026 diễn ra vào ngày 24/01 tại hội
    trường A116 Đại Học Kinh tế TP. Hồ Chí Minh. Để{" "}
    <strong>Guitar Show “NƠI BẮT ĐẦU - NGƯỢC DÒNG”</strong> được diễn ra suôn sẻ và trọn vẹn, sự đồng
    hành từ phía <strong>Quý đơn vị</strong> với tư cách là{" "}
    <strong>Nhà tài trợ của chương trình</strong> là một điều vô cùng quan trọng. Sự quan tâm và giúp
    đỡ của <strong>Quý đơn vị</strong> vừa góp phần tiếp lửa xây dựng một cộng đồng yêu âm nhạc nói
    chung vừa là nguồn động lực to lớn đối với UEHG trong quá trình thực hiện{" "}
    <strong>Guitar Show “NƠI BẮT ĐẦU - NGƯỢC DÒNG”</strong> nói riêng.
  </span>,
  <span key="closing">Trân trọng,</span>,
  <strong key="club">Câu lạc bộ Guitar Đại Học Kinh tế TP. Hồ Chí Minh.</strong>,
];

const previewText = fullLetterText.slice(0, 2).join(" ");

const noiseTexture =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")";

const LetterReveal = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { margin: "-10% 0px -10% 0px", once: true });
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [expanded, setExpanded] = useState(false);
  const envelopeAudioRef = useRef<HTMLAudioElement | null>(null);
  const envelopeAudioCtxRef = useRef<AudioContext | null>(null);
  const hasAudioTriggered = useRef(false);

  const ensureEnvelopeAudio = () => {
    if (!envelopeAudioRef.current) {
      const audio = new Audio("/audio/envelope.mp3");
      audio.preload = "auto";
      audio.volume = 1;
      envelopeAudioRef.current = audio;
      const Ctx =
        window.AudioContext ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).webkitAudioContext;
      if (Ctx) {
        const ctx = new Ctx();
        const source = ctx.createMediaElementSource(audio);
        const gain = ctx.createGain();
        gain.gain.value = 2;
        source.connect(gain);
        gain.connect(ctx.destination);
        envelopeAudioCtxRef.current = ctx;
      }
    }
    return envelopeAudioRef.current;
  };

  const playEnvelopeAudio = () => {
    const audio = ensureEnvelopeAudio();
    if (!audio) return;
    const ctx = envelopeAudioCtxRef.current;
    if (ctx && ctx.state !== "running") {
      ctx.resume().catch(() => {});
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? -4 : -10]);

  useEffect(() => {
    if (expanded && contentRef.current) {
      contentRef.current.focus({ preventScroll: false });
    }
  }, [expanded]);

  useEffect(() => {
    return () => {
      const ctx = envelopeAudioCtxRef.current;
      if (ctx) {
        ctx.close().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    if (!hasAudioTriggered.current && !expanded) return;
    hasAudioTriggered.current = true;
    playEnvelopeAudio();
  }, [expanded]);

  const foldVariants = useMemo<Variants>(
    () => ({
      initial: {
        opacity: 0,
        rotateX: prefersReducedMotion ? 0 : -32,
        scale: 0.96,
      },
      animate: {
        opacity: 1,
        rotateX: 0,
        scale: 1,
        transition: {
          type: prefersReducedMotion ? "tween" : "spring",
          stiffness: 140,
          damping: 16,
          mass: 0.8,
          duration: prefersReducedMotion ? 0.45 : undefined,
        },
      },
    }),
    [prefersReducedMotion],
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-[#0c1224] via-[#0f172a] to-[#0c1020] px-6 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.55)] md:px-12 md:py-16"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_22%_12%,rgba(146,240,255,0.09),transparent_38%),radial-gradient(circle_at_78%_10%,rgba(255,141,106,0.12),transparent_42%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.04),transparent_40%)]" />
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] mix-blend-soft-light opacity-40"
        style={{ backgroundImage: noiseTexture }}
      />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="text-center space-y-3">
          <p className="text-sm uppercase tracking-[0.18em] text-foam/70">Thư ngỏ</p>
          <h2 className="font-display text-3xl leading-tight text-foam md:text-4xl">
            Lời mời đồng hành cùng Guitar Show “Nơi Bắt Đầu — 2026”
          </h2>
        </div>

        <div className="relative w-full max-w-3xl">
          <div className="pointer-events-none absolute inset-[-14%] rounded-[32px] bg-[radial-gradient(circle_at_30%_30%,rgba(255,141,106,0.12),transparent_45%),radial-gradient(circle_at_70%_20%,rgba(146,240,255,0.12),transparent_45%)] blur-2xl" />
          <motion.div
            className="relative"
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
          >
            <AnimatePresence initial={false}>
              {!expanded && (
                <motion.div
                  key="envelope"
                  className="relative h-[420px] rounded-[22px] cursor-pointer"
                  initial={{ opacity: 0, y: 18, rotateX: prefersReducedMotion ? 0 : -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 32, scale: 0.94, transition: { duration: 0.28, ease: "easeOut" } }}
                  transition={{
                    duration: prefersReducedMotion ? 0.35 : 0.6,
                    ease: prefersReducedMotion ? "easeOut" : [0.18, 0.82, 0.18, 1],
                  }}
                  style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
                  onClick={() => setExpanded(true)}
                >
                  <div className="absolute inset-0 rounded-[26px] bg-gradient-to-br from-[#0a1326] via-[#0d1f38] to-[#0a0f1f] shadow-[0_26px_70px_rgba(0,0,0,0.58)]" />
                  <div
                    className="absolute inset-0 rounded-[26px]"
                    style={{ backgroundImage: noiseTexture, opacity: 0.22, mixBlendMode: "soft-light" }}
                  />
                  <div className="relative z-10 h-full w-full flex items-center justify-center">
                    <div className="relative w-[70%] max-w-[400px] overflow-visible">
                      <img
                        src="/hero-floating/opened-evelope.png"
                        alt="Phong bì thư"
                        className="h-full w-full object-contain drop-shadow-[0_30px_70px_rgba(0,0,0,0.5)]"
                        draggable={false}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative z-20 w-[58%] max-w-[320px] -translate-y-5 rounded-[10px] bg-gradient-to-br from-[#f7f2e7]/95 to-[#ebe2d4]/92 px-3 py-2 shadow-[0_8px_16px_rgba(0,0,0,0.2)]">
                          <div
                            className="pointer-events-none absolute inset-0 rounded-[10px]"
                            style={{ backgroundImage: noiseTexture, opacity: 0.32, mixBlendMode: "soft-light" }}
                          />
                          <p className="relative text-[13px] leading-relaxed text-zinc-800 text-center">
                            {previewText}{" "}
                            <span className="font-semibold text-zinc-700 opacity-80">
                              <br />
                              Ấn để xem thêm
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="open-letter"
                  className="relative rounded-2xl bg-gradient-to-br from-[#f8f5ee] to-[#f0ebe1] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
                  variants={foldVariants}
                  initial="initial"
                  animate="animate"
                  style={{
                    transformStyle: "preserve-3d",
                    y: parallaxY,
                    overflow: "hidden",
                  }}
                  exit={{ opacity: 0, scale: 0.99 }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-50 mix-blend-soft-light"
                    style={{ backgroundImage: noiseTexture }}
                  />
                  <motion.div
                    className="absolute -left-2 -top-4 h-[86%] w-[60%] rounded-xl bg-gradient-to-br from-white/70 to-white/30 shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
                    initial={{ opacity: 0, y: 18, rotate: -8 }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : 18,
                      rotate: isInView ? -3 : -8,
                      transition: { delay: 0.12, duration: 0.55, ease: "easeOut" },
                    }}
                  />
                  <div className="relative space-y-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">NBĐ — Thư ngỏ</p>
                    <AnimatePresence initial={false} mode="wait">
                      {expanded ? (
                        <motion.div
                          key="full"
                          ref={contentRef}
                          tabIndex={-1}
                          className="space-y-3 text-sm leading-relaxed text-zinc-800 outline-none"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 0.84, 0.24, 1] }}
                        >
                          {fullLetterNodes.map((para, idx) => (
                            <p key={idx}>{para}</p>
                          ))}
                        </motion.div>
                      ) : (
                        <motion.div
                          key="preview"
                          className="space-y-3 text-sm leading-relaxed text-zinc-800"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.28 }}
                        >
                          <p>{previewText}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-wrap gap-3 pt-2 justify-end">
                      <Button
                        size="sm"
                        variant="utility"
                        onClick={() => setExpanded((v) => !v)}
                        aria-expanded={expanded}
                      >
                        {expanded ? "Thu gọn" : "Mở thư"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LetterReveal;
