import { ShowScrollModule } from "@/components/the-show/show-scroll-module";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "The Show — NBĐ Ngược Dòng",
  description: "Banner concept + lịch sử show UEHG, key visual cá hồi & thác nước.",
});

export default function TheShowPage() {
  return (
    <div
      className="space-y-12 w-screen"
      style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
    >
      <ShowScrollModule />
    </div>
  );
}
