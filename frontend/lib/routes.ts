export type RouteConfig = {
  path: string;
  label: string;
  eyebrow?: string;
  summary?: string;
};

const normalizePath = (path: string): string => {
  if (path === "/") return "/";
  const trimmed = path.endsWith("/") ? path.slice(0, -1) : path;
  return trimmed || "/";
};

export const routes: RouteConfig[] = [
  { path: "/", label: "Trang chủ", eyebrow: "Chương 1" },
  { path: "/about", label: "Giới thiệu UEHG", eyebrow: "Chương 2" },
  { path: "/social-proof", label: "Nghệ sĩ & Đối tác", eyebrow: "Chương 3" },
  { path: "/the-show", label: "Guitar Show", eyebrow: "Chương 4" },
  { path: "/sponsorship", label: "Tài trợ", eyebrow: "Chương 5" },
  { path: "/contact", label: "Liên hệ", eyebrow: "Chương 6" },
];

const routeIndex = new Map(routes.map((route, index) => [route.path, index]));

export const getRouteIndex = (path: string): number => routeIndex.get(normalizePath(path)) ?? 0;

export const getProgress = (path: string): number => {
  const idx = getRouteIndex(path);
  if (routes.length <= 1) return 0;
  return (idx / (routes.length - 1)) * 100;
};

export const getAdjacentRoutes = (
  path: string,
): {
  prev?: RouteConfig;
  next?: RouteConfig;
} => {
  const idx = getRouteIndex(path);
  const prev = idx > 0 ? routes[idx - 1] : undefined;
  const next = idx < routes.length - 1 ? routes[idx + 1] : undefined;
  return { prev, next };
};
