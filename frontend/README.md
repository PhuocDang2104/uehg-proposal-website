# UEHG — Proposal Landing (Next.js 14+, App Router)

Skeleton cho website tuyến tính “Nơi Bắt Đầu — Ngược Dòng” (UEHG). Mục tiêu: dẫn sponsor & sinh viên đi qua 8 chương, giữ trải nghiệm mượt (Lenis), ưu tiên motion nhưng tôn trọng `prefers-reduced-motion`.

## Tech stack

- Next.js 16 (App Router) + TypeScript (strict)
- Tailwind CSS (inline @theme) + custom palette theo poster cá hồi
- Framer Motion (reveal/parallax), Lenis (smooth scroll, tắt khi reduce motion), GSAP stub (chưa gắn)
- ESLint + Prettier, alias `@/*`

## Cấu trúc chính

- `app/` — 8 page tuyến tính (`/`, `/about`, `/social-proof`, `/the-show`, `/impact`, `/sponsorship`, `/media`, `/contact`)
- `components/layout/RootLayout` — shell global + Lenis + StickyNav
- `components/nav/StickyNav` — menu, CTA, waterline progress, sound toggle (OFF mặc định)
- `components/nav/LinearPager` — PREV/NEXT cuối trang
- `components/sections/` — `PageHeader`, `Section` wrapper
- `components/ui/` — `Button`, `Card`, `Badge`
- `components/motion/` — `Reveal`, `Parallax` (respect reduce motion)
- `components/experience/SalmonScene` — placeholder container cho 3D/canvas
- `lib/routes.ts` — map thứ tự tuyến tính + helper progress
- `lib/seo.ts` — metadata base + helper per page
- `app/globals.css` — theme màu River/Foam/Ember/Pearl + nền gradient, data-attr reduce motion

## Màu & mood (theo poster)

- `river-*` (xanh sâu), `foam` (trắng sương), `ember` (cam đỏ nhẹ), `pearl` (neon ngọc), `iris` (tím nhấn)
- Nền gradient + noise nhẹ; typo: Space Grotesk (sans) + Playfair Display (display)

## Motion & accessibility

- `MotionConfig reducedMotion="user"` + `data-motion="reduced"` → tắt Lenis, bỏ animate khi user chọn giảm chuyển động.
- Sound toggle chỉ là placeholder (OFF mặc định, không autoplay).
- Parallax/Reveal tự tắt khi reduce motion.

## Chạy dự án

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint    # kiểm tra lint (ESLint + Prettier)
npm run format  # format bằng Prettier
```

## Nơi cần gắn nội dung/asset thật

- Thay placeholder hero/3D tại `components/experience/SalmonScene`.
- Cập nhật copy/CTA/ảnh tại từng `app/*/page.tsx` (đã chia section bám blueprint).
- Gắn animation phức tạp (GSAP ScrollTrigger/WebGL) vào `SalmonScene` + các section đã comment placeholder.
- Cập nhật link tải Sponsorship Kit trong CTA nav và `Media` page.

## Lưu ý triển khai

- Sticky nav luôn hiển thị menu đúng thứ tự + waterline progress.
- Mỗi page có PREV/NEXT để đảm bảo flow tuyến tính.
- Mobile-first: nav scroll ngang, CTA rút gọn; desktop: đầy đủ CTA.
- Không xoá logic reduce-motion khi thêm hiệu ứng mới.
