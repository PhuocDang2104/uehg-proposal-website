import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import SalmonScene from "../experience/salmon-scene";
import { Reveal } from "../motion/reveal";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  showScene?: boolean;
};

export const PageHeader = ({
  eyebrow,
  title,
  subtitle,
  actions,
  showScene = false,
}: PageHeaderProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-river-900/90 via-river-800/80 to-river-900/80 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] md:p-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(146,240,255,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,141,106,0.24),transparent_25%),radial-gradient(circle_at_50%_70%,rgba(178,162,255,0.12),transparent_30%)] opacity-90" />
      <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
        <Reveal className="space-y-4">
          {eyebrow && <Badge variant="glow">{eyebrow}</Badge>}
          <h1 className="font-display text-4xl leading-tight text-foam md:text-5xl">{title}</h1>
          {subtitle && <p className="max-w-xl text-lg text-foam/80">{subtitle}</p>}
          <div className="flex flex-wrap items-center gap-3">
            <Button href="/sponsorship" size="md">
              Trở thành Nhà Tài Trợ
            </Button>
            <Button href="/contact" variant="ghost" size="md">
              Đăng ký quan tâm/Đặt vé
            </Button>
            {actions}
          </div>
        </Reveal>
        {showScene ? (
          <div className="relative">
            <SalmonScene />
          </div>
        ) : null}
      </div>
    </div>
  );
};
