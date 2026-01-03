import type { Metadata } from "next";

const baseTitle = "UEHG — Nơi Bắt Đầu | Proposal Landing";
const baseDescription =
  "Website proposal UEHG Guitar Show “Nơi Bắt Đầu — Ngược Dòng”: hành trình tuyến tính cho sponsor & sinh viên.";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://uehg.vn"),
  title: {
    default: baseTitle,
    template: "%s | UEHG Proposal",
  },
  description: baseDescription,
  icons: {
    icon: "/assets/uehg-favicon.png",
  },
  openGraph: {
    title: baseTitle,
    description: baseDescription,
    siteName: "UEHG Proposal",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: baseTitle,
    description: baseDescription,
  },
};

export const createPageMetadata = (meta: Partial<Metadata>): Metadata => {
  const pageTitle = meta.title;
  const normalizedTitle =
    typeof pageTitle === "string"
      ? {
          default: pageTitle,
          template: "%s | UEHG Proposal",
        }
      : pageTitle;

  return {
    ...siteMetadata,
    ...meta,
    title: normalizedTitle ?? siteMetadata.title,
    description: meta.description ?? siteMetadata.description,
  };
};
