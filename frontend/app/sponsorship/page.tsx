import { Reveal } from "@/components/motion/reveal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Sponsorship — Lời mời hợp tác",
  description: "Trang chuyển đổi chính: thư mời, gói tài trợ, quyền lợi, CTA đặt lịch/đăng ký.",
});

const sponsorshipTiers = [
  {
    id: "diamond",
    label: "Kim cương",
    total: "17.000.000 VNĐ",
    cash: "14.000.000 VNĐ",
    inKind: "3.000.000 VNĐ",
    accent: "from-pearl/70 via-cyan-200/45 to-transparent",
    textGradient: "from-pearl via-cyan-300 to-sky-500",
  },
  {
    id: "gold",
    label: "Vàng",
    total: "15.000.000 VNĐ",
    cash: "12.000.000 VNĐ",
    inKind: "3.000.000 VNĐ",
    accent: "from-amber-200/60 via-amber-100/40 to-transparent",
    textGradient: "from-amber-400 via-amber-300 to-yellow-200",
  },
  {
    id: "silver",
    label: "Bạc",
    total: "12.000.000 VNĐ",
    cash: "10.000.000 VNĐ",
    inKind: "2.000.000 VNĐ",
    accent: "from-slate-200/70 via-slate-100/45 to-transparent",
    textGradient: "from-slate-700 via-slate-600 to-slate-500",
  },
  {
    id: "bronze",
    label: "Đồng",
    total: "10.000.000 VNĐ",
    cash: "8.000.000 VNĐ",
    inKind: "2.000.000 VNĐ",
    accent: "from-amber-300/50 via-amber-200/35 to-transparent",
    textGradient: "from-orange-400 via-amber-400 to-amber-200",
  },
];

type TierKey = "diamond" | "gold" | "silver" | "bronze";

type BenefitRow = {
  content: string;
  diamond?: string;
  gold?: string;
  silver?: string;
  bronze?: string;
};

type BenefitTable = {
  id: string;
  title: string;
  accent: string;
  rows: BenefitRow[];
};

const tierColumns: { key: TierKey; label: string }[] = [
  { key: "diamond", label: "Kim cương" },
  { key: "gold", label: "Vàng" },
  { key: "silver", label: "Bạc" },
  { key: "bronze", label: "Đồng" },
];

const tierStyles: Record<TierKey, { badge: string; text: string }> = {
  diamond: {
    badge: "border-sky-300/35 bg-sky-400/12 text-sky-200 shadow-[0_0_18px_rgba(120,210,255,0.25)]",
    text: "text-sky-200",
  },
  gold: {
    badge: "border-amber-300/35 bg-amber-300/10 text-amber-200 shadow-[0_0_16px_rgba(255,214,128,0.2)]",
    text: "text-amber-200",
  },
  silver: {
    badge: "border-slate-200/30 bg-slate-200/10 text-slate-100 shadow-[0_0_16px_rgba(203,213,225,0.18)]",
    text: "text-slate-100",
  },
  bronze: {
    badge: "border-orange-300/30 bg-orange-300/10 text-orange-200 shadow-[0_0_16px_rgba(255,178,120,0.18)]",
    text: "text-orange-200",
  },
};

const renderTierCell = (value: string | undefined, tier: TierKey) => {
  if (!value) return <span className="text-foam/35">-</span>;
  if (value === "X") {
    return (
      <span
        className={`inline-flex h-7 min-w-[2.2rem] items-center justify-center rounded-full border text-[11px] font-semibold uppercase ${tierStyles[tier].badge}`}
      >
        X
      </span>
    );
  }
  return (
    <span className={`text-[13px] leading-relaxed break-words ${tierStyles[tier].text}`}>
      {value}
    </span>
  );
};

const benefitTables: BenefitTable[] = [
  {
    id: "media",
    title: "Quyền lợi truyền thông",
    accent: "from-sky-400/25 via-blue-500/10 to-transparent",
    rows: [
      {
        content:
          "Thương hiệu của Nhà Tài Trợ xuất hiện nổi bật trong tất cả các bài viết truyền thông và các ấn phẩm quảng cáo của chương trình.",
        diamond: "X",
        gold: "X",
        silver: "X",
        bronze: "X",
      },
      {
        content:
          "Thương hiệu của Nhà Tài Trợ được quảng cáo khéo léo trong các video truyền thông của chương trình.",
        diamond: "X",
      },
      {
        content:
          "Hỗ trợ đặt booth của Nhà Tài Trợ với kích thước 3m x 2m (02 bàn tiếp khách, 01 standee), backdrop logo Nhà Tài Trợ với slogan + banner chương trình, đèn chiếu sáng.",
        diamond: "X",
      },
      {
        content:
          "Logo của Nhà Tài Trợ được in trên tất cả các ấn phẩm / tài liệu truyền thông thuộc phạm vi chương trình.",
        diamond: "100% logo UEHG",
        gold: "100% logo UEHG",
        silver: "80% logo UEHG",
        bronze: "50% logo UEHG",
      },
      {
        content:
          "Logo của Nhà Tài Trợ xuất hiện nổi bật trong Footer email xác nhận đăng ký các gian hàng, email mời các đối tác và CLB, đội nhóm tham dự chương trình.",
        diamond: "Có Hyperlink Fanpage/Website",
        gold: "Có Hyperlink Fanpage/Website",
        silver: "Có logo Câu Lạc Bộ",
        bronze: "Có logo UEHG",
      },
      {
        content:
          "Tên Nhà Tài Trợ trong bài đăng giới thiệu Nhà Tài Trợ đi cùng logo/hình ảnh trên các nền tảng mạng xã hội chính thức của UEHG.",
        diamond: "X",
        gold: "X",
        silver: "X",
        bronze: "X",
      },
      {
        content:
          "Nhắc tên Nhà Tài Trợ trong Footer của tất cả bài truyền thông trên các nền tảng mạng xã hội chính thức của UEHG.",
        diamond: "X",
        gold: "X",
        silver: "X",
        bronze: "X",
      },
      {
        content:
          "Hỗ trợ truyền thông 01 chương trình của Nhà Tài Trợ trên Fanpage chính thức của UEHG trong thời hạn quy định kể từ lúc ký kết Hợp Đồng.",
        diamond: "Trong vòng 6 tháng",
        gold: "Trong vòng 3 tháng",
      },
      {
        content:
          "Hỗ trợ đăng tải 01 tin tuyển dụng của Nhà Tài Trợ trên Fanpage chính thức của UEHG.",
        diamond: "X",
        gold: "X",
      },
      {
        content:
          "Nhà Tài Trợ được sử dụng hình ảnh chương trình cho mục đích truyền thông trong thời hạn quy định kể từ lúc ký Hợp Đồng.",
        diamond: "2 tháng",
        gold: "12 tháng",
        silver: "3 tháng",
        bronze: "1 tháng",
      },
    ],
  },
  {
    id: "placement",
    title: "Quyền lợi product placement",
    accent: "from-cyan-400/20 via-sky-400/10 to-transparent",
    rows: [
      {
        content:
          "Sản phẩm/Voucher/Coupon của Nhà Tài Trợ được đặt/sampling tại bàn Check-in tổ chức chương trình.",
        diamond: "X",
        gold: "X",
        silver: "X",
        bronze: "X",
      },
      {
        content:
          "Sản phẩm/Voucher/Coupon của Nhà Tài Trợ được sử dụng làm quà tặng cho người tham dự trong các hoạt động Minigame diễn ra giữa chương trình, Give-away trên Fanpage chính thức của UEHG.",
        diamond: "Trong vòng 6 tháng",
        gold: "Trong vòng 3 tháng",
      },
      {
        content:
          "Sản phẩm của Nhà Tài Trợ được trưng bày tại bàn khách mời đặc thù trong chương trình.",
        diamond: "X",
        gold: "X",
      },
    ],
  },
  {
    id: "onsite",
    title: "Quyền lợi trong chương trình",
    accent: "from-pearl/20 via-sky-500/10 to-transparent",
    rows: [
      {
        content:
          "Thương hiệu của Nhà Tài Trợ xuất hiện nổi bật trong Video Lễ Tổng Kết và Trailer chương trình (NBD 2024), Video recap diễn ra tại Fanpage chính thức của UEHG.",
        diamond: "X",
      },
      {
        content:
          "Câu chuyện thương hiệu của Nhà Tài Trợ được trình bày súc tích với thời lượng 2 phút/phần trong phần khai mạc chương trình.",
        diamond: "X",
        gold: "X",
      },
      {
        content:
          "Hỗ trợ booth trưng bày cho Nhà Tài Trợ (với mục đích truyền thông).",
        diamond: "1 booth 2m x 2m gần khu vực Check-in",
        gold: "1 booth 2m x 2m gần khu vực Check-in",
      },
      {
        content:
          "Đặt standee của Nhà Tài Trợ ở khu vực cửa Check-in ngay đầu chương trình.",
        diamond: "Tối đa 5 standee 80cm x 180cm",
        gold: "Tối đa 5 standee 80cm x 180cm",
        silver: "1 standee 80cm x 180cm",
        bronze: "1 standee 80cm x 180cm",
      },
      {
        content:
          "Logo của Nhà Tài Trợ được in trên backdrop, poster, standee và được đặt ở khu vực cửa Check-in.",
        diamond: "100% logo UEHG",
        gold: "100% logo UEHG",
        silver: "80% logo UEHG",
        bronze: "50% logo UEHG",
      },
      {
        content:
          "TVC (10-15s) của Nhà Tài Trợ cung cấp được phát trên màn hình chính trước thời gian diễn ra chương trình.",
        diamond: "15 lần",
        gold: "15 lần",
        silver: "7 lần",
        bronze: "2 lần",
      },
      {
        content: "Nhà Tài Trợ là khách mời danh dự của chương trình.",
        diamond: "X",
        gold: "X",
        silver: "X",
        bronze: "X",
      },
      {
        content:
          "Nhà Tài Trợ được trao bằng hoa, quà chứng nhận và lưu niệm trong đêm diễn ra chương trình.",
        diamond: "X",
        gold: "X",
        silver: "X",
        bronze: "X",
      },
      {
        content:
          "Hỗ trợ ghi nhận logo và tên chính thức của Nhà Tài Trợ (do Nhà Tài Trợ cung cấp) trong phần cảm ơn cuối chương trình.",
        diamond: "X",
        gold: "X",
      },
      {
        content:
          "Hỗ trợ phát tờ rơi (do Nhà Tài Trợ cung cấp) nhằm mục đích quảng cáo sản phẩm, dịch vụ của Nhà Tài Trợ trong ngày diễn ra chương trình.",
        diamond: "X",
        gold: "X",
        silver: "X",
        bronze: "X",
      },
    ],
  },
  {
    id: "post",
    title: "Quyền lợi hậu chương trình",
    accent: "from-sky-400/20 via-blue-500/10 to-transparent",
    rows: [
      {
        content:
          "Cung cấp gói giải pháp hỗ trợ truyền thông trong 3 tháng kể từ lúc ký kết Hợp Đồng:\n- Nghĩ thuật hỗ trợ hình ảnh, truyền thông\n- Truyền thông hậu kỳ trong các bài đăng, báo truyền thông\n- Sự kiện: hỗ trợ tổ chức, vận hành sự kiện (dành cho các chương trình quy mô 300 người trở lên)",
        diamond: "X",
      },
      {
        content: "Kết nối Doanh nghiệp với các Đối tác chiến lược của UEHG.",
        diamond: "X",
      },
      {
        content: "Nhà Tài Trợ được in ấn tên và logo bài đăng Recap chương trình.",
        diamond: "X",
        gold: "X",
        silver: "X",
        bronze: "X",
      },
      {
        content: "Đăng tải 01 bài truyền thông cảm ơn Nhà Tài Trợ.",
        diamond: "Kèm theo 300 từ giới thiệu + hình ảnh + video clip/sản phẩm đối tác",
        gold: "Kèm theo 300 từ giới thiệu + hình ảnh + video clip/sản phẩm đối tác",
        silver: "Kèm theo 200 từ giới thiệu + hình ảnh + video clip/sản phẩm đối tác",
        bronze: "Kèm theo 150 từ giới thiệu + hình ảnh + video clip/sản phẩm đối tác",
      },
      {
        content: "Gửi email cảm ơn từ Câu Lạc Bộ đến Nhà Tài Trợ.",
        diamond: "X",
        gold: "X",
        silver: "X",
        bronze: "X",
      },
      {
        content:
          "Nhà Tài Trợ được nhận báo cáo chi tiết số liệu từ hệ thống chương trình (truyền thông, ý kiến, dữ liệu).",
        diamond: "X",
        gold: "X",
      },
      {
        content:
          "Nhà Tài Trợ được cung cấp một số lượng hình ảnh nhất định về chương trình để phục vụ cho việc truyền thông.",
        diamond: "Tối thiểu 20 ảnh (file gốc và file chỉnh sửa)",
        gold: "Tối thiểu 20 ảnh (file gốc và file chỉnh sửa)",
        silver: "Tối thiểu 15 ảnh (file gốc và file chỉnh sửa)",
        bronze: "Tối thiểu 10 ảnh (file gốc và file chỉnh sửa)",
      },
      {
        content: "Nhà Tài Trợ được ưu tiên ký kết hợp đồng cho các chương trình tiếp theo.",
        diamond: "X",
        gold: "X",
      },
      {
        content:
          "Nhà Tài Trợ được cung cấp ưu đãi các dịch vụ biểu diễn nghệ thuật, giải pháp sự kiện, banner backdrop in ấn UEHG.",
        diamond: "Giảm 30% so với giá gốc",
        gold: "Giảm 30% so với giá gốc",
        silver: "Giảm 20% so với giá gốc",
        bronze: "Giảm 10% so với giá gốc",
      },
    ],
  },
];

export default function SponsorshipPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <section
        className="relative isolate w-screen overflow-hidden bg-river-900 py-12 sm:py-14 lg:py-16"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(142,240,255,0.22),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(255,141,106,0.08),transparent_40%),linear-gradient(180deg,rgba(6,12,24,0.98),rgba(0,0,0,0.95))]" />
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_30%_70%,rgba(142,240,255,0.18),transparent_48%)] animate-[hue-rotate_18s_linear_infinite]" />
        <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[conic-gradient(from_0deg,rgba(142,240,255,0.35),rgba(13,22,51,0.1),rgba(255,141,106,0.22),rgba(142,240,255,0.35))] blur-3xl opacity-45 animate-[spin_26s_linear_infinite]" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(142,240,255,0.25),transparent_70%)] blur-3xl opacity-60 animate-pulse" />
        <div className="pointer-events-none absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:36px_36px]" />

        <div className="relative mx-auto w-[min(1200px,92vw)] space-y-8">
          <div className="text-center space-y-4">
            <p className="text-xs uppercase tracking-[0.36em] text-foam/60">Chương 5</p>
            <h1 className="font-display text-4xl uppercase tracking-[0.18em] text-foam sm:text-5xl lg:text-6xl">
              các gói tài trợ
            </h1>
            <p className="mx-auto max-w-3xl text-sm text-foam/80 sm:text-base">
              Giá trị hiện vật được quy đổi bằng 70% so với giá trị thực của hiện vật ngoài thị
              trường.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sponsorshipTiers.map((tier, index) => (
              <Reveal key={tier.id} delay={index * 0.06}>
                <div
                  className="group relative h-full animate-[sponsorFloat_8s_ease-in-out_infinite] motion-reduce:animate-none"
                  style={{ animationDelay: `${index * 0.4}s` }}
                >
                  <div
                    className={`pointer-events-none absolute -inset-6 rounded-[36px] bg-gradient-to-br ${tier.accent} blur-2xl opacity-30 transition duration-500 group-hover:opacity-70`}
                  />
                  <div className="relative h-full rounded-[30px] bg-gradient-to-br from-white/65 via-white/20 to-transparent p-[1px] bg-[length:220%_220%] animate-[borderGlow_10s_ease-in-out_infinite] motion-reduce:animate-none">
                    <div className="relative flex h-full flex-col items-center gap-4 overflow-hidden rounded-[29px] border border-white/25 bg-[linear-gradient(135deg,rgba(255,255,255,0.62),rgba(255,255,255,0.22))] px-6 py-8 text-center text-river-900 shadow-[0_25px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_35px_90px_rgba(0,0,0,0.45)]">
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.7),transparent_45%)] opacity-60" />
                      <div
                        className={`pointer-events-none absolute inset-x-6 top-4 h-px bg-gradient-to-r ${tier.textGradient} opacity-70`}
                      />
                      <div
                        className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${tier.accent} blur-2xl opacity-70`}
                      />
                      <div className="relative z-10 flex h-full flex-col items-center gap-4">
                        <div className="relative h-16 w-16">
                          {tier.id === "diamond" ? (
                            <svg viewBox="0 0 64 56" className="h-16 w-16" aria-hidden="true">
                              <defs>
                                <linearGradient id={`diamond-${tier.id}`} x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#bff5ff" />
                                  <stop offset="55%" stopColor="#7ad7ff" />
                                  <stop offset="100%" stopColor="#3f8bff" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M32 2L62 22L32 54L2 22Z"
                                fill={`url(#diamond-${tier.id})`}
                              />
                              <path d="M32 2L50 22H14Z" fill="rgba(255,255,255,0.55)" />
                              <path d="M32 54L50 22H14Z" fill="rgba(0,0,0,0.05)" />
                            </svg>
                          ) : (
                            <div
                              className={`relative h-16 w-16 rounded-full ${
                                tier.id === "gold"
                                  ? "bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500"
                                  : tier.id === "silver"
                                    ? "bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400"
                                    : "bg-gradient-to-br from-amber-200 via-orange-300 to-amber-700"
                              } shadow-[inset_0_0_12px_rgba(255,255,255,0.6)]`}
                            >
                              <div className="absolute inset-1 rounded-full border border-white/70" />
                              <div className="absolute inset-3 rounded-full bg-white/40" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-[11px] uppercase tracking-[0.3em] text-river-600">
                            {tier.label}
                          </p>
                          <p
                            className={`text-xl font-semibold bg-gradient-to-r ${tier.textGradient} bg-[length:220%_220%] bg-clip-text text-transparent drop-shadow-[0_6px_16px_rgba(0,0,0,0.25)] animate-[sponsorGradient_7s_ease-in-out_infinite] motion-reduce:animate-none`}
                            style={{ animationDelay: `${index * 0.35}s` }}
                          >
                            {tier.total}
                          </p>
                        </div>
                        <div className="h-px w-14 bg-gradient-to-r from-river-200/70 via-river-100/40 to-transparent" />
                        <div className="space-y-1 text-sm text-river-700">
                          <p>
                            <span className="font-semibold text-river-900">Hiện kim:</span>{" "}
                            <span
                              className={`bg-gradient-to-r ${tier.textGradient} bg-[length:200%_200%] bg-clip-text text-transparent font-semibold animate-[sponsorGradient_9s_ease-in-out_infinite] motion-reduce:animate-none`}
                              style={{ animationDelay: `${index * 0.35 + 0.2}s` }}
                            >
                              {tier.cash}
                            </span>
                          </p>
                          <p>
                            <span className="font-semibold text-river-900">Hiện vật:</span>{" "}
                            <span
                              className={`bg-gradient-to-r ${tier.textGradient} bg-[length:200%_200%] bg-clip-text text-transparent font-semibold animate-[sponsorGradient_10s_ease-in-out_infinite] motion-reduce:animate-none`}
                              style={{ animationDelay: `${index * 0.35 + 0.4}s` }}
                            >
                              {tier.inKind}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        className="relative w-screen py-8 sm:py-10 lg:py-12"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
      >
        <div className="mx-auto w-[min(1360px,92vw)] space-y-14">
          {benefitTables.map((table, tableIndex) => (
            <Reveal key={table.id} delay={tableIndex * 0.08}>
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_26px_90px_rgba(0,0,0,0.45)] md:p-8">
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r ${table.accent}`}
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(142,240,255,0.08),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(255,141,106,0.08),transparent_40%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-15 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

                <div className="relative space-y-5">
                  <div className="space-y-2 text-center">
                    <h3 className="font-display text-2xl uppercase tracking-[0.12em] text-foam sm:text-3xl">
                      {table.title}
                    </h3>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                    <table className="w-full table-fixed border-collapse text-left text-xs sm:text-sm">
                      <thead className="bg-black/60 backdrop-blur">
                        <tr>
                          <th className="w-[52px] px-3 py-3 text-[11px] uppercase tracking-[0.26em] text-foam/60 sm:w-[64px] sm:px-4 lg:w-[72px]">
                            STT
                          </th>
                          <th className="w-[48%] px-3 py-3 text-[11px] uppercase tracking-[0.26em] text-foam/60 sm:px-4 lg:w-[44%] lg:min-w-[360px]">
                            Nội dung
                          </th>
                          {tierColumns.map((col) => (
                            <th
                              key={col.key}
                              className="w-[90px] px-2 py-3 text-center text-[10px] uppercase tracking-[0.2em] text-foam/60 sm:w-[110px] sm:px-3 sm:text-[11px] lg:w-[130px] lg:px-4 lg:text-[11px]"
                            >
                              <span
                                className={`inline-flex items-center justify-center rounded-full border px-3 py-1 ${tierStyles[col.key].badge}`}
                              >
                                {col.label}
                              </span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {table.rows.map((row, rowIndex) => (
                          <tr key={`${table.id}-${rowIndex}`} className="hover:bg-white/5">
                            <td className="px-3 py-4 align-top text-xs font-semibold text-foam/70 sm:px-4">
                              {rowIndex + 1}
                            </td>
                            <td className="px-3 py-4 align-top text-sm leading-relaxed text-foam/85 whitespace-pre-line break-words sm:px-4">
                              {row.content}
                            </td>
                            <td className="px-2 py-4 align-top text-center text-sm break-words sm:px-3 lg:px-4">
                              {renderTierCell(row.diamond, "diamond")}
                            </td>
                            <td className="px-2 py-4 align-top text-center text-sm break-words sm:px-3 lg:px-4">
                              {renderTierCell(row.gold, "gold")}
                            </td>
                            <td className="px-2 py-4 align-top text-center text-sm break-words sm:px-3 lg:px-4">
                              {renderTierCell(row.silver, "silver")}
                            </td>
                            <td className="px-2 py-4 align-top text-center text-sm break-words sm:px-3 lg:px-4">
                              {renderTierCell(row.bronze, "bronze")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes sponsorGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes sponsorFloat {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -10px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
