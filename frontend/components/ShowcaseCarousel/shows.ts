export type ShowItem = {
  id: string;
  title: string;
  subtitle: string;
  posterSrc: string;
  year: string;
  location: string;
  shortSummary: string;
  fullDescription: string;
};

export const shows: ShowItem[] = [
  {
  id: "show-01",
  title: "Nơi Bắt Đầu 2024",
  subtitle: "Acoustic Night",
  posterSrc: "/posters/Nơi bắt đầu 2024.jpg",
    year: "2018",
    location: "Hội trường A, UEH",
    shortSummary: "Đêm acoustic thân mật, mở màn chuỗi Nơi Bắt Đầu.",
    fullDescription:
      "Đêm nhạc acoustic mở màn chuỗi sự kiện, mang màu sắc mộc mạc với những bản phối tối giản. Quy mô 300 khách, đội ngũ sinh viên tự sản xuất, gây quỹ cho dự án thiện nguyện đầu tiên của UEHG.",
  },
  {
  id: "show-02",
  title: "Nơi Bắt Đầu — Vol.2",
  subtitle: "City Lights",
  posterSrc: "/posters/Nơi bắt đầu 2023.jpg",
    year: "2019",
    location: "Nhà hát Bến Thành",
    shortSummary: "Không gian city-pop, ánh sáng neon hiện đại.",
    fullDescription:
      "Chủ đề city-pop, sân khấu ánh sáng neon và visual mapping. 600+ khán giả, hợp tác với local brand để sản xuất merch. Dàn line-up sinh viên kết hợp khách mời indie.",
  },
  {
  id: "show-03",
  title: "Nơi Bắt Đầu — Vol.3",
  subtitle: "Dòng Chảy",
  posterSrc: "/posters/Camping 2023.jpg",
    year: "2020",
    location: "UEH Auditorium",
    shortSummary: "Concept dòng chảy, motion water & laser nhẹ.",
    fullDescription:
      "Biểu diễn giữa setup dòng chảy, laser nhẹ và màn hình LED cong. 700 vé sold-out, ứng dụng vé QR lần đầu, line-up có khách mời acoustic nổi bật và band sinh viên.",
  },
  {
  id: "show-04",
  title: "Nơi Bắt Đầu — Vol.4",
  subtitle: "Above The Clouds",
  posterSrc: "/posters/Hành trình trao yêu thương 2023.jpg",
    year: "2021",
    location: "Youth Theatre",
    shortSummary: "Visual mây bay, vocal ballad và RnB mềm.",
    fullDescription:
      "Khai thác visual mây bay, lighting pastel. 550 khán giả, 12 tiết mục, đội hình band mở rộng kèn/strings. Hợp tác charity quyên góp 120 triệu cho quỹ học bổng.",
  },
  {
  id: "show-05",
  title: "Nơi Bắt Đầu — Vol.5",
  subtitle: "Runway Pulse",
  posterSrc: "/posters/Hành trình trao yêu thương 2024.jpg",
    year: "2022",
    location: "Hội trường 272",
    shortSummary: "Fusion âm nhạc + catwalk, vibe runway.",
    fullDescription:
      "Show kết hợp catwalk và nhạc live, visual kiểu runway, lighting chase. 800+ khách, 18 brand đồng hành. Giới thiệu sân khấu hai tầng và live camera feed.",
  },
  {
    id: "show-06",
    title: "Nơi Bắt Đầu — Vol.6",
    subtitle: "Aurora",
    posterSrc: "/posters/NVTL 2023.jpg",
    year: "2023",
    location: "Youth Cultural House",
    shortSummary: "Sắc màu cực quang, synthwave và indie pop.",
    fullDescription:
      "Chủ đề cực quang, palette xanh tím, nhạc synthwave/indie-pop. 900 khách, dàn dựng sương mù, pixel tubes, VJ theo beat. Bán vé qua landing riêng, NPS 87/100.",
  },
  {
    id: "show-07",
    title: "Nơi Bắt Đầu — Vol.7",
    subtitle: "Echoes",
    posterSrc: "/posters/Open show 2024.jpg",
    year: "2024",
    location: "Rex Theatre",
    shortSummary: "Âm vang điện tử + acoustic, màn hình split.",
    fullDescription:
      "Khai thác đối lập acoustic vs. electronic, sân khấu split screen, motion phản chiếu. 1000+ khách, 4 khách mời, thu về 150 triệu cho quỹ thiện nguyện.",
  },
  {
    id: "show-08",
    title: "Nơi Bắt Đầu — X",
    subtitle: "Preview 2025",
    posterSrc: "/posters/UYF 2024.jpg",
    year: "2025",
    location: "Sắp công bố",
    shortSummary: "Teaser phiên bản X, âm hưởng ngược dòng.",
    fullDescription:
      "Teaser cho phiên bản X với concept ngược dòng, kết hợp cá hồi và thác nước. Dự kiến 1200+ khách, mở rộng hợp tác brand và ứng dụng kỹ thuật sân khấu immersive.",
  },
];
