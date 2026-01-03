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
  subtitle: "VỌNG",
  posterSrc: "/posters/Nơi bắt đầu 2024.jpg",
    year: "2024",
    location: "Hội trường A, UEH",
    shortSummary: "Đêm acoustic thân mật, mở màn chuỗi Nơi Bắt Đầu.",
    fullDescription:
      "Đêm nhạc acoustic mở màn chuỗi sự kiện, mang màu sắc mộc mạc với những bản phối tối giản. Quy mô 300 khách, đội ngũ sinh viên tự sản xuất, gây quỹ cho dự án thiện nguyện đầu tiên của UEHG.",
  },
  {
  id: "show-02",
  title: "Nơi Bắt Đầu 2023",
  subtitle: "SET FIRE",
  posterSrc: "/posters/Nơi bắt đầu 2023.jpg",
    year: "2023",
    location: "Hội trường A, UEH",
    shortSummary: "Không gian city-pop, ánh sáng neon hiện đại.",
    fullDescription:
      "Guitar Show Nơi Bắt Đầu - Set Fire là đêm nhạc được UEHG tổ chức nhằm tạo ra không gian nghệ thuật lành mạnh và lan tỏa tinh thần năng động, vui tươi đến với các bạn sinh viên, những người bạn có cùng đam mê với UEHG. Sự kiện đã thu hút 1000 người tham dự, sold out vé trong vòng 2 giờ kể từ lúc mở bán..",
  },
  {
  id: "show-03",
  title: "G-Camping 2023",
  subtitle: "Heat The Beat",
  posterSrc: "/posters/Camping 2023.jpg",
    year: "2023",
    location: "Hội trường A, UEH",
    shortSummary: "Concept dòng chảy, motion water & laser nhẹ.",
    fullDescription:
      "Hoạt động nội bộ thường niên của UEHG nhằm kết nối những thành viên của CLB, giải toả stress và cùng nhìn lại hành trình một năm qua UEHG đã cùng nhau làm được gì.",
  },
  {
  id: "show-04",
  title: "HTTYT 2023 - Hướng Dương",
  subtitle: "Hướng Dương",
  posterSrc: "/posters/Hành trình trao yêu thương 2023.jpg",
    year: "2023",
    location: "Hội trường A, UEH",
    shortSummary: "Visual mây bay, vocal ballad và RnB mềm.",
    fullDescription:
      "Hành Trình Trao Yêu Thương là hoạt động thường niên được tổ chức hằng năm bởi UEHG. Chương trình được thực hiện với mục đích thiện nguyện, gắn kết những mảnh đời còn khó khăn và trao những phần quà đến mọi người đặc biệt là các em nhỏ ở những nơi vùng sâu vùng xa.",
  },
  {
  id: "show-05",
  title: "HTTYT 2024 - Đan Giày",
  subtitle: "Đan Giày - Dây Đàn",
  posterSrc: "/posters/Hành trình trao yêu thương 2024.jpg",
    year: "2024",
    location: "Hội trường A, UEH",
    shortSummary: "Fusion âm nhạc + catwalk, vibe runway.",
    fullDescription:
      "Show kết hợp catwalk và nhạc live, visual kiểu runway, lighting chase. 800+ khách, 18 brand đồng hành. Giới thiệu sân khấu hai tầng và live camera feed.",
  },
  {
    id: "show-06",
    title: "Nối Vòng Tay Lớn 2023",
    subtitle: "Lễ hội chào đón TSV UEH",
    posterSrc: "/posters/NVTL 2023.jpg",
    year: "2023",
    location: "Hội trường A, UEH",
    shortSummary: "Sắc màu cực quang, synthwave và indie pop.",
    fullDescription:
      "Lễ hội văn hoá chào đón tân sinh viên UEH với những màn liveband hoành tráng đến từ UEHG và những tiết mục biểu diễn đặc sắc từ những CLB, đội nhóm khác.",
  },
  {
    id: "show-07",
    title: "Open Show 2024 - ĐẦM",
    subtitle: "ĐẦM",
    posterSrc: "/posters/Open show 2024.jpg",
    year: "2024",
    location: "Sánh B1, UEH",
    shortSummary: "Âm vang điện tử + acoustic, màn hình split.",
    fullDescription:
      "Open show “ĐẦM” là một sự kiện âm nhạc lành mạnh, gần gũi được tổ chức nhằm tôn vinh vẻ đẹp của người phụ nữ nhân ngày 8/3. Sự kiện được tổ chức tại sảnh B1, ĐH UEH với hơn 300 bạn sinh viên tham dự.",
  },
  {
    id: "show-08",
    title: "UEH Youth Festival 2024",
    subtitle: "Sức Trẻ Kinh Tế",
    posterSrc: "/posters/UYF 2024.jpg",
    year: "2024",
    location: "Sắp công bố",
    shortSummary: "Teaser phiên bản X, âm hưởng ngược dòng.",
    fullDescription:
      "UEH Youth Festival (UYF) 2024: CITYVERSE - Sự kiện được mong chờ nhất tại ĐH Kinh tế TP. HCM với hơn 4000 người tham dự. UEHG vinh dự được góp mặt trong line up biểu diễn trên sân khấu UYF với những tiết mục sôi động và đặc sắc.",
  },
];
