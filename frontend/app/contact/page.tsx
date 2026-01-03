import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact — Kết thúc hành trình",
  description: "Lời kết và thông tin liên hệ cho UEHG.",
});

export default function ContactPage() {
  return (
    <div className="relative space-y-10 pt-6 md:space-y-12 md:pt-10">
      <section className="relative overflow-hidden rounded-[36px] border border-white/10 bg-[#05070c] px-6 py-12 shadow-[0_32px_110px_rgba(0,0,0,0.6)] md:px-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(142,240,255,0.1),transparent_45%),radial-gradient(circle_at_85%_5%,rgba(255,141,106,0.12),transparent_50%),radial-gradient(circle_at_50%_90%,rgba(188,162,255,0.14),transparent_55%),linear-gradient(180deg,rgba(4,8,16,0.98),rgba(2,3,5,0.98))]" />
        <div className="pointer-events-none absolute inset-0 opacity-12 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_0)] [background-size:52px_52px]" />
        <div className="pointer-events-none absolute -right-24 top-8 h-56 w-56 rounded-full bg-ember/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-6 h-64 w-64 rounded-full bg-pearl/20 blur-3xl" />

        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="font-display text-5xl uppercase tracking-[0.14em] text-foam sm:text-6xl lg:text-7xl">
                Lời kết
              </h2>
              <span className="block h-1 w-16 rounded-full bg-gradient-to-r from-pearl via-sky-300 to-ember/60" />
            </div>
            <div className="rounded-[30px] border border-white/70 bg-white/95 px-6 py-7 text-slate-800 shadow-[0_24px_70px_rgba(15,23,42,0.25)] md:px-9 md:py-8">
              <p className="text-[15px] leading-7 text-slate-700">
                Câu lạc bộ Guitar Đại Học Kinh Tế TP. Hồ Chí Minh xin chân thành cảm ơn{" "}
                <span className="font-semibold text-slate-900">Quý đơn vị</span> đã dành thời gian
                quan tâm và xem qua hồ sơ chương trình của chúng tôi. Đặc biệt, dự án sẽ không thể
                thành công nếu thiếu đi sự ủng hộ, hợp tác và đóng góp nhiệt tình từ{" "}
                <span className="font-semibold text-slate-900">Quý đơn vị</span>. Do đó, chúng tôi
                rất mong sẽ sớm nhận được phản hồi từ{" "}
                <span className="font-semibold text-slate-900">Quý đơn vị</span> trong thời gian sớm
                nhất để xác nhận việc hợp tác mang lại giá trị lâu dài cho sự kiện lần này, cũng như
                những chương trình ý nghĩa trong tương lai. UEHG cam kết sẽ đảm bảo các quyền lợi
                của <span className="font-semibold text-slate-900">Quý đơn vị</span>, đồng thời đảm
                bảo tiến độ, nội dung của sự kiện diễn ra theo thoả thuận.
              </p>
              <p className="mt-5 text-[15px] leading-7 text-slate-700">
                Một lần nữa, chúng tôi xin gửi lời cảm ơn chân thành đến{" "}
                <span className="font-semibold text-slate-900">Quý đơn vị</span>. Kính chúc{" "}
                <span className="font-semibold text-slate-900">Quý đơn vị</span> sẽ luôn thành công
                và phát triển hơn nữa trong tương lai!
              </p>
              <div className="mt-5 space-y-1 text-sm font-semibold text-slate-900">
                <p>Trân trọng,</p>
                <p>Câu lạc bộ Guitar Đại Học Kinh Tế TP. Hồ Chí Minh.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="font-display text-4xl uppercase tracking-[0.14em] text-foam sm:text-5xl">
                Thông tin liên hệ
              </h3>
              <span className="block h-1 w-12 rounded-full bg-gradient-to-r from-pearl via-sky-300 to-ember/60" />
            </div>
            <div className="space-y-5">
              <div className="rounded-[26px] border border-white/70 bg-white/95 px-6 py-5 text-slate-900 shadow-[0_22px_60px_rgba(15,23,42,0.2)]">
                <p className="text-lg font-semibold">Nguyễn Phương Thảo</p>
                <p className="text-sm text-slate-600">Trưởng Team Đối ngoại UEHG</p>
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Email:</span>{" "}
                  <a
                    href="mailto:thaonguyen.uehg.er@gmail.com"
                    className="underline decoration-slate-300 underline-offset-2"
                  >
                    thaonguyen.uehg.er@gmail.com
                  </a>
                </p>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Số điện thoại:</span> (+84) 981
                  305 800
                </p>
              </div>

              <div className="rounded-[26px] border border-white/70 bg-white/95 px-6 py-5 text-slate-900 shadow-[0_22px_60px_rgba(15,23,42,0.2)]">
                <p className="text-lg font-semibold">Trần Đông Hải</p>
                <p className="text-sm text-slate-600">Chủ nhiệm Câu Lạc Bộ UEHG</p>
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Email:</span>{" "}
                  <a
                    href="mailto:donghai.uehg@gmail.com"
                    className="underline decoration-slate-300 underline-offset-2"
                  >
                    donghai.uehg@gmail.com
                  </a>
                </p>
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Số điện thoại:</span> (+84) 788
                  588 069
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
