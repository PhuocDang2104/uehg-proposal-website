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
  { path: "/", label: "Homepage", eyebrow: "Chương 1" },
  { path: "/about", label: "About UEHG", eyebrow: "Chương 2" },
  { path: "/social-proof", label: "Social Proof", eyebrow: "Chương 3" },
  { path: "/the-show", label: "The Show", eyebrow: "Chương 4" },
  { path: "/sponsorship", label: "Sponsorship", eyebrow: "Chương 5" },
  { path: "/contact", label: "Contact", eyebrow: "Chương 6" },
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
