// Dữ liệu mẫu — sẽ được thay bằng API thật khi nối backend (xem services/mockApi.js)

export const categories = [
  { id: "beach", label: "Biển đảo" },
  { id: "mountain", label: "Núi rừng" },
  { id: "culture", label: "Văn hoá - Di sản" },
  { id: "city", label: "Khám phá thành phố" },
  { id: "adventure", label: "Mạo hiểm" },
];

export const tours = [
  {
    id: 1,
    slug: "phu-quoc-doc-dao",
    title: "Phú Quốc — Đảo Ngọc 4 ngày 3 đêm",
    destination: "Phú Quốc, Việt Nam",
    region: "domestic",
    category: "beach",
    price: 4990000,
    duration: "4 ngày 3 đêm",
    departure: ["12/07/2026", "26/07/2026", "09/08/2026"],
    maxPeople: 20,
    rating: 4.8,
    reviewCount: 132,
    description:
      "Khám phá đảo Ngọc với những bãi biển cát trắng, lặn ngắm san hô ở Hòn Thơm và thưởng thức hải sản tươi sống mỗi tối.",
    highlights: [
      "Ngày 1: Đón sân bay — Check-in resort — Chợ đêm Phú Quốc",
      "Ngày 2: Cáp treo Hòn Thơm — Lặn ngắm san hô — Aquatopia",
      "Ngày 3: Tham quan Vinpearl Safari — Tự do tắm biển",
      "Ngày 4: Mua sắm đặc sản — Tiễn sân bay",
    ],
  },
  {
    id: 2,
    slug: "sapa-may-mu",
    title: "Sa Pa — Săn mây Fansipan 3 ngày 2 đêm",
    destination: "Sa Pa, Lào Cai",
    region: "domestic",
    category: "mountain",
    price: 3290000,
    duration: "3 ngày 2 đêm",
    departure: ["05/07/2026", "19/07/2026", "02/08/2026"],
    maxPeople: 16,
    rating: 4.7,
    reviewCount: 98,
    description:
      "Chinh phục nóc nhà Đông Dương bằng cáp treo, dạo bước giữa ruộng bậc thang Mường Hoa và trải nghiệm văn hoá bản Cát Cát.",
    highlights: [
      "Ngày 1: Khởi hành từ Hà Nội — Bản Cát Cát",
      "Ngày 2: Cáp treo Fansipan — Săn mây — Chợ tình Sa Pa",
      "Ngày 3: Ruộng bậc thang Mường Hoa — Về Hà Nội",
    ],
  },
  {
    id: 3,
    slug: "hoi-an-pho-co",
    title: "Hội An — Phố cổ & Đèn lồng 2 ngày 1 đêm",
    destination: "Hội An, Quảng Nam",
    region: "domestic",
    category: "culture",
    price: 2190000,
    duration: "2 ngày 1 đêm",
    departure: ["08/07/2026", "22/07/2026"],
    maxPeople: 24,
    rating: 4.9,
    reviewCount: 211,
    description:
      "Lạc bước trong phố cổ rực rỡ ánh đèn lồng, học làm đèn lồng truyền thống và thưởng thức cao lầu chính gốc.",
    highlights: [
      "Ngày 1: Phố cổ Hội An — Chùa Cầu — Thả đèn hoa đăng",
      "Ngày 2: Làng gốm Thanh Hà — Rừng dừa Bảy Mẫu — Kết thúc tour",
    ],
  },
  {
    id: 4,
    slug: "tokyo-mua-hoa",
    title: "Tokyo — Osaka 5 ngày 4 đêm",
    destination: "Tokyo, Nhật Bản",
    region: "international",
    category: "city",
    price: 18990000,
    duration: "5 ngày 4 đêm",
    departure: ["15/07/2026", "29/07/2026"],
    maxPeople: 15,
    rating: 4.9,
    reviewCount: 76,
    description:
      "Trải nghiệm trọn vẹn Tokyo hiện đại và Osaka sôi động, từ đền Senso-ji đến lâu đài Osaka và khu mua sắm Shibuya.",
    highlights: [
      "Ngày 1: Đến Tokyo — Đền Senso-ji — Phố Asakusa",
      "Ngày 2: Shibuya — Harajuku — Tháp Tokyo Skytree",
      "Ngày 3: Tàu cao tốc Shinkansen đến Osaka",
      "Ngày 4: Lâu đài Osaka — Dotonbori",
      "Ngày 5: Mua sắm — Về nước",
    ],
  },
  {
    id: 5,
    slug: "da-lat-thac-ghenh",
    title: "Đà Lạt — Trekking thác Datanla 3 ngày 2 đêm",
    destination: "Đà Lạt, Lâm Đồng",
    region: "domestic",
    category: "adventure",
    price: 3590000,
    duration: "3 ngày 2 đêm",
    departure: ["11/07/2026", "25/07/2026"],
    maxPeople: 12,
    rating: 4.6,
    reviewCount: 64,
    description:
      "Vượt thác, đu zipline và cắm trại giữa rừng thông Đà Lạt — dành cho người yêu thích vận động và thiên nhiên hoang dã.",
    highlights: [
      "Ngày 1: Nhận phòng — Quảng trường Lâm Viên",
      "Ngày 2: Trekking & vượt thác Datanla — Zipline",
      "Ngày 3: Đồi chè Cầu Đất — Về lại trung tâm",
    ],
  },
  {
    id: 6,
    slug: "ha-long-vinh-ngoc",
    title: "Vịnh Hạ Long — Du thuyền 5 sao 2 ngày 1 đêm",
    destination: "Hạ Long, Quảng Ninh",
    region: "domestic",
    category: "beach",
    price: 5490000,
    duration: "2 ngày 1 đêm",
    departure: ["13/07/2026", "27/07/2026"],
    maxPeople: 18,
    rating: 4.8,
    reviewCount: 145,
    description:
      "Nghỉ đêm trên du thuyền giữa vịnh di sản, chèo kayak quanh hang Luồn và thưởng thức bữa tối hải sản trên biển.",
    highlights: [
      "Ngày 1: Lên du thuyền — Hang Sửng Sốt — Chèo kayak",
      "Ngày 2: Tập Tai Chi trên du thuyền — Hang Luồn — Về bờ",
    ],
  },
  {
    id: 7,
    slug: "bangkok-pattaya",
    title: "Bangkok — Pattaya 4 ngày 3 đêm",
    destination: "Bangkok, Thái Lan",
    region: "international",
    category: "city",
    price: 8990000,
    duration: "4 ngày 3 đêm",
    departure: ["10/07/2026", "24/07/2026"],
    maxPeople: 20,
    rating: 4.5,
    reviewCount: 88,
    description:
      "Chùa Vàng lộng lẫy, chợ nổi Damnoen Saduak và biển Pattaya sôi động trong một hành trình trọn vẹn.",
    highlights: [
      "Ngày 1: Đến Bangkok — Chùa Vàng",
      "Ngày 2: Chợ nổi Damnoen Saduak",
      "Ngày 3: Di chuyển Pattaya — Đảo Coral",
      "Ngày 4: Mua sắm — Về nước",
    ],
  },
  {
    id: 8,
    slug: "ninh-binh-trang-an",
    title: "Ninh Bình — Tràng An & Tam Cốc 1 ngày",
    destination: "Ninh Bình, Việt Nam",
    region: "domestic",
    category: "culture",
    price: 1190000,
    duration: "1 ngày",
    departure: ["06/07/2026", "20/07/2026", "03/08/2026"],
    maxPeople: 30,
    rating: 4.7,
    reviewCount: 173,
    description:
      "Ngồi thuyền len lỏi qua hang động Tràng An, ghé chùa Bái Đính và check-in cánh đồng lúa Tam Cốc trong ngày.",
    highlights: [
      "Sáng: Khởi hành — Chùa Bái Đính",
      "Trưa: Ăn trưa đặc sản dê núi",
      "Chiều: Chèo thuyền Tràng An — Tam Cốc — Về Hà Nội",
    ],
  },
];

export function findTourBySlug(slug) {
  return tours.find((t) => t.slug === slug);
}

export function findTourById(id) {
  return tours.find((t) => t.id === Number(id));
}

export const reviews = [
  {
    id: 1,
    tourId: 4,
    userId: 2,
    userName: "Hồng Ngọc",
    rating: 5,
    comment: "Chuyến đi tuyệt vời! Hoa anh đào nở rộ khắp nơi, hướng dẫn viên nhiệt tình, chỗ ở rất sạch sẽ và tiện nghi.",
    createdAt: "2026-03-25T10:00:00Z"
  },
  {
    id: 2,
    tourId: 4,
    userId: 3,
    userName: "Minh Tuấn",
    rating: 4,
    comment: "Lịch trình hợp lý nhưng thời gian tự do mua sắm hơi ít. Ẩm thực Nhật Bản rất ngon.",
    createdAt: "2026-04-02T14:30:00Z"
  },
  {
    id: 3,
    tourId: 1,
    userId: 4,
    userName: "Thu Trà",
    rating: 5,
    comment: "Phú Quốc thật đẹp! Hải sản tươi sống, lịch trình lặn biển ngắm san hô là trải nghiệm tuyệt vời nhất.",
    createdAt: "2026-05-15T09:15:00Z"
  },
  {
    id: 4,
    tourId: 3,
    userId: 5,
    userName: "Hoàng Bách",
    rating: 5,
    comment: "Hội An lung linh về đêm. Cảm giác được ngồi thuyền thả hoa đăng rất lãng mạn. Rất đáng đồng tiền!",
    createdAt: "2026-02-14T20:45:00Z"
  }
];
