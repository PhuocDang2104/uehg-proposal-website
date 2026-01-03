"use client";

import { useState, type FormEvent } from "react";

const ContactTableSection = () => {
  const [showThanks, setShowThanks] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const toEmail = "donghai.uehg@gmail.com";
    const subject = `UEHG Contact${name ? ` - ${name}` : ""}`;
    const body = [
      "Thông tin liên hệ:",
      `Họ và tên: ${name || "Không cung cấp"}`,
      `E-mail: ${email || "Không cung cấp"}`,
      "",
      "Tin nhắn:",
      message || "Không có nội dung",
    ].join("\n");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      toEmail,
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const fallbackMailto = `mailto:${toEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    if (typeof window !== "undefined") {
      const opened = window.open(gmailUrl, "_blank", "noopener,noreferrer");
      if (!opened) {
        window.location.href = fallbackMailto;
      }
    }

    setShowThanks(true);
    form.reset();
    window.setTimeout(() => setShowThanks(false), 4200);
  };

  return (
    <section className="relative mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-black px-5 py-10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] md:mt-14 md:px-8 md:py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(142,240,255,0.14),transparent_42%),radial-gradient(circle_at_88%_0%,rgba(255,141,106,0.06),transparent_50%),linear-gradient(180deg,rgba(5,8,16,0.96),rgba(0,0,0,0.98))]" />
      <div className="pointer-events-none absolute inset-0 opacity-45 mix-blend-screen bg-[radial-gradient(circle_at_20%_85%,rgba(142,240,255,0.24),transparent_45%)] animate-[hue-rotate_18s_linear_infinite]" />
      <div className="pointer-events-none absolute -left-16 top-10 h-48 w-48 rounded-full bg-pearl/24 blur-3xl animate-[floatUp_8s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -right-16 bottom-6 h-56 w-56 rounded-full bg-river-700/60 blur-3xl animate-[floatDown_10s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute right-8 top-6 h-16 w-16 rounded-full bg-ember/18 blur-2xl" />
      <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.22)_1px,transparent_0)] [background-size:46px_46px]" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-5">
          <p className="text-[11px] uppercase tracking-[0.42em] text-foam/50">Contact</p>
          <h2 className="font-display text-4xl leading-none text-foam sm:text-5xl lg:text-6xl">
            Liên hệ
            <span className="mt-2 block text-pearl">Chúng tôi</span>
          </h2>
          <p className="max-w-md text-sm text-foam/70">
            Chỉ cần để lại thông tin, đội UEHG sẽ phản hồi nhanh nhất có thể để kết nối và hỗ trợ
            bạn.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.28em] text-foam/50">
            <span className="inline-flex h-2 w-10 rounded-full bg-gradient-to-r from-pearl to-ember/50" />
            Thứ 2 - CN · 08:30 - 21:00
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="group relative">
            <label htmlFor="contact-name" className="sr-only">
              Họ và tên
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              placeholder="Họ và tên"
              className="h-12 w-full rounded-full border border-white/10 bg-white/10 px-5 text-sm text-foam placeholder:text-foam/40 transition duration-300 focus:border-pearl/60 focus:outline-none focus:ring-2 focus:ring-pearl/40"
            />
            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-transparent transition group-focus-within:ring-pearl/40" />
          </div>

          <div className="group relative">
            <label htmlFor="contact-email" className="sr-only">
              E-mail
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="E-mail"
              className="h-12 w-full rounded-full border border-white/10 bg-white/10 px-5 text-sm text-foam placeholder:text-foam/40 transition duration-300 focus:border-pearl/60 focus:outline-none focus:ring-2 focus:ring-pearl/40"
            />
            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-transparent transition group-focus-within:ring-pearl/40" />
          </div>

          <div className="group relative">
            <label htmlFor="contact-message" className="sr-only">
              Tin nhắn
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              placeholder="Tin nhắn"
              className="min-h-[120px] w-full rounded-[24px] border border-white/10 bg-white/10 px-5 py-3 text-sm text-foam placeholder:text-foam/40 transition duration-300 focus:border-pearl/60 focus:outline-none focus:ring-2 focus:ring-pearl/40"
            />
            <span className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-transparent transition group-focus-within:ring-pearl/40" />
          </div>

          <button
            type="submit"
            className="group relative h-12 w-full overflow-hidden rounded-full bg-gradient-to-r from-pearl via-foam to-ember/60 text-sm font-semibold uppercase tracking-[0.24em] text-river-900 shadow-[0_18px_45px_rgba(142,240,255,0.28)] transition duration-300 hover:translate-y-[-1px] hover:shadow-[0_24px_60px_rgba(142,240,255,0.4)] active:translate-y-[1px]"
          >
            <span className="relative z-10">Gửi</span>
            <span className="absolute inset-0 translate-x-[-120%] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.45),transparent)] opacity-70 transition duration-700 group-hover:translate-x-[120%]" />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -18px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes floatDown {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, 14px, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>

      {showThanks ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowThanks(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Escape") setShowThanks(false);
            }}
          />
          <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/15 bg-[#0b0f1a]/95 p-6 text-foam shadow-[0_30px_80px_rgba(0,0,0,0.65)]">
            <div className="pointer-events-none absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_20%_20%,rgba(142,240,255,0.28),transparent_60%),radial-gradient(circle_at_80%_15%,rgba(255,141,106,0.22),transparent_55%)] opacity-70 blur-2xl" />
            <div className="relative z-10 space-y-3">
              <p className="text-[10px] uppercase tracking-[0.32em] text-foam/60">
                UEHG · Contact
              </p>
              <h3 className="font-display text-2xl text-foam">Cảm ơn bạn!</h3>
              <p className="text-sm text-foam/80">
                Gmail đã được mở sẵn với đầy đủ thông tin. Vui lòng kiểm tra và nhấn gửi để hoàn
                tất liên hệ.
              </p>
              <button
                type="button"
                className="mt-2 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-foam transition duration-300 hover:border-white/40 hover:bg-white/20"
                onClick={() => setShowThanks(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default ContactTableSection;
