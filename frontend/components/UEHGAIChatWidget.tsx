"use client";

import React, { useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  ts: number;
};

const QUICK_PROMPTS = [
  "UEHG là gì và hoạt động ra sao?",
  "Guitar Show “NƠI BẮT ĐẦU” tổ chức khi nào, ở đâu?",
  "UEHG từng hợp tác với những nghệ sĩ nào nổi bật?",
  "UEHG có kênh truyền thông nào để theo dõi?",
];

const MOCK_RESPONSES: Record<string, string> = {
  "UEHG là gì và hoạt động ra sao?":
    "UEHG (Câu lạc bộ Guitar Đại học Kinh tế TP.HCM) được thành lập ngày 09/09/2011, trực thuộc Hội Sinh Viên UEH. CLB là sân chơi nghệ thuật nuôi dưỡng đam mê âm nhạc, kết nối sinh viên yêu guitar và phát triển chuyên môn qua các hoạt động luyện tập, giao lưu và biểu diễn. Slogan của UEHG: “Just the beginning”.",
  "Guitar Show “NƠI BẮT ĐẦU” tổ chức khi nào, ở đâu?":
    "Guitar Show “NƠI BẮT ĐẦU - NGƯỢC DÒNG” là chương trình thường niên lớn của UEHG, dự kiến diễn ra ngày 25/01/2026 tại Hội trường A.116 UEH. Chương trình mang năng lượng tích cực và các tiết mục trình diễn đặc sắc từ cộng đồng UEHG. Nếu bạn cần lịch chi tiết/giờ check-in, hãy để lại email hoặc nhắn fanpage để tụi mình gửi thông tin cập nhật sớm nhất.",
  "UEHG từng hợp tác với những nghệ sĩ nào nổi bật?":
    "UEHG đã có cơ hội hợp tác và đồng hành cùng nhiều nghệ sĩ/nhóm nhạc như: Minh Tốc và Lam, Văn Mai Hương, Thái Đinh, Lena, Whee!, The Flob, Dương Domic, The Cassette. Nếu bạn cần link tổng hợp hoặc thông tin chi tiết về từng lần hợp tác, hãy nhắn lại để tụi mình gửi ngay.",
  "UEHG có kênh truyền thông nào để theo dõi?":
    "Bạn có thể theo dõi UEHG qua:\n- Facebook (kênh chính): hơn 27.000 lượt thích và 30.000 lượt theo dõi, cập nhật sự kiện/hoạt động.\n- YouTube: lưu giữ sân khấu và sản phẩm âm nhạc; video cao nhất hơn 20.000 views.\n- TikTok: nội dung cover guitar, hậu trường và xu hướng âm nhạc dành cho Gen Z.",
};

const normalizeText = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

const UEHGAIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("uehg-ai-sound");
    return saved ? saved === "true" : true;
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const openAudioRef = useRef<HTMLAudioElement | null>(null);
  const sendAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem("uehg-ai-sound", String(soundEnabled));
  }, [soundEnabled]);

  const playAudio = (ref: React.MutableRefObject<HTMLAudioElement | null>, src: string) => {
    if (!soundEnabled) return;
    let audio = ref.current;
    if (!audio) {
      audio = new Audio(src);
      audio.preload = "auto";
      ref.current = audio;
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const findMock = (text: string) => {
    const norm = normalizeText(text);
    const entry = Object.entries(MOCK_RESPONSES).find(([k]) => {
      const nk = normalizeText(k);
      return nk === norm || nk.includes(norm) || norm.includes(nk);
    });
    return entry?.[1];
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: text.trim(),
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    playAudio(sendAudioRef, "/sounds/send.mp3");

    const replyText =
      findMock(text.trim()) ??
      "Mình hỗ trợ thông tin về UEHG, Guitar Show, hợp tác nghệ sĩ và kênh truyền thông. Thử các prompt nhanh nhé!";
    const delay = 600 + Math.random() * 300;
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: replyText,
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handlePromptClick = (p: string) => sendMessage(p);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(input);
    }
    if (e.key === "Escape" && isOpen) setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
    playAudio(openAudioRef, "/sounds/open.mp3");
  };
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  const icon = (
    <div className="group fixed bottom-6 right-6 z-50 flex flex-col items-center">
      <div className="pointer-events-none mb-2 opacity-0 group-hover:opacity-100 transition duration-400 ease-out translate-y-2 group-hover:translate-y-0">
        <div className="rounded-full bg-white/95 px-4 py-1.5 text-[12px] font-semibold text-river-900 shadow-[0_10px_28px_rgba(0,0,0,0.35)] animate-[floatTag_1.8s_ease-in-out_infinite]">
          Ask me!
        </div>
      </div>
      <button
        aria-label="Mở trợ lý âm nhạc"
        onClick={handleOpen}
        className="h-20 w-20 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] outline-none focus:ring-2 focus:ring-ember/70 bg-black/60 border border-white/10 overflow-hidden cursor-pointer"
      >
        <div className="relative h-full w-full">
          <img
            src="/assets/music-assistant.png"
            alt="Music assistant"
            className="h-full w-full object-cover"
            draggable={false}
          />
          <span className="pointer-events-none absolute inset-0 rounded-xl bg-ember/20 blur-lg animate-pulse" />
        </div>
      </button>
      <style>{`
        button:hover img { transform: rotate(-1deg) scale(1.04); }
        button img { transition: transform 600ms ease-in-out; animation: breathe 2.8s ease-in-out infinite; }
        @keyframes breathe { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        @keyframes floatTag {
          0% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );

  const messageBubble = (m: ChatMessage) => (
    <div
      key={m.id}
      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed shadow ${
        m.role === "user"
          ? "ml-auto bg-ember/20 text-ember-50 backdrop-blur"
          : "mr-auto bg-white/5 text-foam"
      }`}
    >
      {m.text.split("\n").map((line, idx) => (
        <p key={idx}>{line}</p>
      ))}
    </div>
  );

  if (!isOpen) return icon;

  return (
    <>
      {icon}
      <div
        ref={containerRef}
        className="fixed bottom-6 right-6 z-50 w-full max-w-[360px] origin-bottom-right rounded-2xl border border-white/15 bg-gradient-to-br from-[#0c1228] via-[#0f1c36] to-[#0b1124] text-foam shadow-[0_24px_70px_rgba(0,0,0,0.55)] transition-all duration-250 ease-out"
        style={{
          height: "520px",
          animation: "chatPop 320ms cubic-bezier(0.18,0.9,0.24,1)",
        }}
      >
        <div className="relative h-full flex flex-col overflow-hidden">
          <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(146,240,255,0.12),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(255,141,106,0.14),transparent_50%)] blur-2xl opacity-70" />
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-ember/30 via-iris/20 to-pearl/10 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="text-sm font-semibold">Trợ lý AI UEHG</div>
              <div className="flex items-end gap-[2px] h-4">
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="w-[3px] rounded-full bg-pearl animate-[equalize_1s_ease-in-out_infinite]"
                    style={{ animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-foam/70">
                <input
                  type="checkbox"
                  className="accent-ember"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                />
                Âm thanh
              </label>
              <button
                aria-label="Đóng"
                onClick={handleClose}
                className="h-8 w-8 rounded-full bg-white/10 text-foam hover:bg-white/20 transition active:scale-95"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 px-4 py-3">
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePromptClick(p)}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-foam hover:bg-white/15 active:scale-95 transition"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 pb-3 pt-1 scroll-smooth">
            {messages.map(messageBubble)}
            {isTyping && (
              <div className="mr-auto flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm text-foam">
                <div className="flex items-end gap-[3px] h-4">
                  {[1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="w-[4px] rounded-full bg-pearl animate-[equalize_1s_ease-in-out_infinite]"
                      style={{ animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </div>
                <span className="text-xs text-foam/70">Đang soạn...</span>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-black/20 px-3 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-1">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="h-10 flex-1 bg-transparent text-sm text-foam placeholder:text-foam/50 outline-none"
                placeholder="Hỏi về UEHG, Guitar Show, hợp tác nghệ sĩ, kênh truyền thông..."
              />
              <button
                onClick={() => sendMessage(input)}
                className="h-9 rounded-lg bg-ember px-3 text-sm font-semibold text-river-900 transition active:scale-95 hover:brightness-105"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes equalize {
          0% { transform: scaleY(0.4); }
          20% { transform: scaleY(1); }
          50% { transform: scaleY(0.5); }
          80% { transform: scaleY(1); }
          100% { transform: scaleY(0.4); }
        }
        @keyframes chatPop {
          0% { opacity: 0; transform: translate3d(12px, 20px, 0) scale(0.9); }
          60% { opacity: 1; transform: translate3d(0, -4px, 0) scale(1.02); }
          100% { opacity: 1; transform: translate3d(0,0,0) scale(1); }
        }
      `}</style>
    </>
  );
};

export default UEHGAIChatWidget;
