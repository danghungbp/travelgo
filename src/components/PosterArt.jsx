// Trình tạo Vintage Travel Poster tự động
// Dựa vào thông tin tour (category, destination, id) để sinh ra bức tranh poster độc bản.

const PALETTES = [
  { sky: "#E1C788", mid: "#1B4B5A", fore: "#0F2A3D", sun: "#E8633A", accent: "#FAF6EE" },
  { sky: "#EFE6D3", mid: "#C9A24B", fore: "#0F2A3D", sun: "#E8633A", accent: "#FAF6EE" },
  { sky: "#E0D2B4", mid: "#C84F2A", fore: "#0F2A3D", sun: "#C9A24B", accent: "#FAF6EE" },
  { sky: "#1B4B5A", mid: "#0F2A3D", fore: "#E1C788", sun: "#E8633A", accent: "#FAF6EE" },
  { sky: "#FAF6EE", mid: "#1B4B5A", fore: "#0F2A3D", sun: "#E8633A", accent: "#C9A24B" },
];

export default function PosterArt({ tour, category = "beach", className = "" }) {
  // Nếu có truyền object tour, dùng id hoặc độ dài chuỗi để chọn bảng màu và biến thể độc bản
  const seed = tour ? (tour.id || tour.title.length) : 1;
  const paletteIndex = seed % PALETTES.length;
  const p = PALETTES[paletteIndex];
  
  const cat = tour ? tour.category : category;
  const destName = tour && tour.destination ? tour.destination.split(",")[0].toUpperCase() : "TRAVELGO";

  // Vị trí mặt trời thay đổi theo seed
  const sunX = 280 + (seed % 80);
  const sunY = 45 + (seed % 30);

  // Nếu tour có trường image hoặc imageUrl truyền vào thì ưu tiên hiển thị ảnh thật
  if (tour && (tour.image || tour.imageUrl)) {
    return (
      <div className={`relative overflow-hidden bg-ink ${className}`}>
        <img
          src={tour.image || tour.imageUrl}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 400 240"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Vintage poster ${destName}`}
    >
      <defs>
        <linearGradient id={`grad-${seed}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={p.sky} />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Nền bầu trời */}
      <rect width="400" height="240" fill={`url(#grad-${seed})`} />

      {/* Mặt trời / Mặt trăng */}
      <circle cx={sunX} cy={sunY} r={24 + (seed % 10)} fill={p.sun} opacity="0.9" />

      {/* Mây trang trí */}
      <path
        d={`M ${40 + (seed % 50)} 60 Q ${80 + (seed % 50)} 45 ${120 + (seed % 50)} 60 T ${180 + (seed % 50)} 60`}
        stroke={p.accent}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {cat === "beach" && (
        <>
          {/* Dãy núi xa */}
          <path d="M0 160 Q100 120 200 160 T400 150 V240 H0 Z" fill={p.mid} opacity="0.7" />
          {/* Biển */}
          <path d="M0 180 Q120 155 240 185 T400 180 V240 H0 Z" fill={p.mid} />
          <path d="M0 205 Q100 190 200 205 T400 200 V240 H0 Z" fill={p.fore} />
          {/* Cây cọ */}
          <path d="M50 240 Q55 180 75 140" stroke={p.fore} strokeWidth="5" fill="none" />
          <path d="M75 140 Q50 145 35 160 M75 140 Q85 125 105 135 M75 140 Q65 120 50 125" stroke={p.fore} strokeWidth="3" fill="none" />
          {/* Thuyền buồm nhỏ */}
          <polygon points="280,185 290,165 290,185" fill={p.accent} opacity="0.8" />
        </>
      )}

      {cat === "mountain" && (
        <>
          {/* Lớp núi 1 */}
          <polygon points="-20,240 100,80 200,240" fill={p.mid} opacity="0.8" />
          {/* Lớp núi 2 */}
          <polygon points="110,240 230,50 350,240" fill={p.fore} />
          {/* Đỉnh tuyết */}
          <polygon points="230,50 205,90 255,90" fill={p.accent} />
          {/* Lớp núi 3 tiền cảnh */}
          <polygon points="260,240 340,140 420,240" fill={p.mid} />
        </>
      )}

      {cat === "culture" && (
        <>
          {/* Kiến trúc cổng cổ kính */}
          <rect x="70" y="130" width="260" height="110" fill={p.fore} />
          <polygon points="50,130 200,70 350,130" fill={p.mid} />
          <polygon points="80,95 200,50 320,95" fill={p.sun} />
          {/* Cột */}
          {[100, 160, 220, 280].map((x) => (
            <rect key={x} x={x} y="145" width="20" height="95" fill={p.accent} opacity="0.15" />
          ))}
        </>
      )}

      {cat === "city" && (
        <>
          {/* Cầu đường hoặc sông */}
          <path d="M0 220 Q200 200 400 220 V240 H0 Z" fill={p.mid} />
          {/* Các toà nhà skyline */}
          {[30, 80, 130, 180, 240, 290, 340].map((x, i) => {
            const h = 70 + ((i * 37 + seed * 13) % 90);
            return (
              <g key={x}>
                <rect x={x} y={240 - h} width="38" height={h} fill={p.fore} />
                {/* Cửa sổ sổ sáng đèn */}
                <rect x={x + 8} y={240 - h + 15} width="6" height="6" fill={p.accent} opacity="0.6" />
                <rect x={x + 24} y={240 - h + 35} width="6" height="6" fill={p.sun} opacity="0.8" />
              </g>
            );
          })}
        </>
      )}

      {cat === "adventure" && (
        <>
          {/* Đồi dốc trekking */}
          <polygon points="0,240 130,100 260,240" fill={p.mid} />
          <polygon points="180,240 300,110 420,240" fill={p.fore} />
          {/* Đường mòn đứt đoạn */}
          <path d="M 20 230 Q 100 200 180 170 T 300 120" stroke={p.sun} strokeWidth="3" strokeDasharray="8 6" fill="none" />
        </>
      )}

      {/* Khung viền và Tên địa điểm mang phong cách Vintage Poster */}
      <rect x="12" y="12" width="376" height="216" stroke={p.accent} strokeWidth="2" fill="none" opacity="0.4" />
      
      <g transform="translate(200, 215)">
        <rect x="-140" y="-22" width="280" height="30" fill={p.fore} opacity="0.85" rx="4" />
        <text
          x="0"
          y="-3"
          textAnchor="middle"
          fill={p.accent}
          fontFamily="'IBM Plex Mono', monospace"
          fontSize="13"
          fontWeight="bold"
          letterSpacing="4"
        >
          {destName}
        </text>
      </g>
    </svg>
  );
}
