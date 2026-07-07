import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../services/mockApi.js";
import { categories } from "../data/mockData.js";
import TourCard from "../components/TourCard.jsx";
import PromoPopup from "../components/PromoPopup.jsx";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.getTours({}).then((list) =>
      setFeatured([...list].sort((a, b) => b.rating - a.rating).slice(0, 4))
    );
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    navigate(`/tours?q=${encodeURIComponent(q)}`);
  }

  return (
    <div className="space-y-16 pb-16">
      <PromoPopup />
      {/* HERO SECTION — Vintage Poster & Giant Boarding Pass */}
      <section className="relative bg-poster-gradient text-paper overflow-hidden border-b-4 border-gold shadow-xl">
        {/* Background Texture & Decorative Elements */}
        <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-20 sm:py-24 grid md:grid-cols-12 gap-12 items-center relative z-10">
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/40 px-3 py-1 rounded text-gold font-mono-data text-xs uppercase tracking-[0.2em]">
              <span>★</span> Boarding pass tới mọi miền đất
            </div>
            <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1.1] text-paper">
              Đặt vé cho chuyến đi <br />
              <span className="text-coral underline decoration-gold/50 decoration-wavy decoration-2 underline-offset-8">
                chưa từng quên
              </span>.
            </h1>
            <p className="text-paper/80 max-w-lg text-base sm:text-lg leading-relaxed font-body">
              TravelGo gom tour biển đảo, núi rừng, di sản và quốc tế vào một chiếc vé duy nhất — xem lịch trình chuẩn xác, giá minh bạch, giữ chỗ chỉ trong 60 giây.
            </p>

            <form
              onSubmit={handleSearch}
              className="pt-2 flex flex-col sm:flex-row items-stretch gap-3 max-w-lg"
            >
              <div className="relative flex-1">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Bạn muốn đi đâu? (Phú Quốc, Sa Pa...)"
                  className="w-full rounded-ticket px-4 py-3.5 text-ink bg-paper placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-coral shadow-inner text-sm font-medium"
                />
              </div>
              <button className="bg-coral hover:bg-coral-dark text-paper px-6 py-3.5 rounded-ticket font-mono-data text-xs uppercase tracking-widest font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 shrink-0">
                🔍 Tìm tour ngay
              </button>
            </form>

            <div className="pt-2 flex items-center gap-6 text-xs font-mono-data text-paper/60">
              <span>⚡ Xác nhận tức thì</span>
              <span>•</span>
              <span>🏷 Đảm bảo giá tốt</span>
              <span>•</span>
              <span>🔒 Hỗ trợ 24/7</span>
            </div>
          </div>

          {/* Boarding Pass Illustration — Signature Element */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="ticket bg-paper text-ink p-6 sm:p-7 w-full max-w-md shadow-poster-hover rotate-1 hover:rotate-0 transition-transform duration-500 relative border-2 border-ink/20">
              {/* Decorative Stamp */}
              <div className="absolute top-16 right-6 border-2 border-coral/40 text-coral/40 rounded-full w-20 h-20 flex items-center justify-center font-mono-data text-[10px] uppercase font-bold tracking-tighter rotate-[-15deg] pointer-events-none select-none">
                FIRST CLASS <br /> VERIFIED
              </div>

              <div className="flex justify-between items-baseline border-b border-ink/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                  <span className="font-mono-data text-xs uppercase tracking-widest text-coral font-bold">
                    Boarding Pass
                  </span>
                </div>
                <span className="font-mono-data text-xs text-ink/60 font-semibold bg-sand px-2 py-0.5 rounded border border-ink/10">
                  TG-2026
                </span>
              </div>

              <div className="flex justify-between items-end my-6">
                <div>
                  <p className="font-mono-data text-[11px] text-ink/50 uppercase tracking-wider">Khởi hành</p>
                  <p className="font-display text-3xl font-bold text-ink">SGN</p>
                  <p className="text-xs text-ink/70">TP. Hồ Chí Minh</p>
                </div>
                <div className="flex-1 mx-4 flex flex-col items-center justify-center relative bottom-2">
                  <span className="font-mono-data text-[10px] text-gold uppercase tracking-widest mb-1">Direct Tour</span>
                  <div className="w-full border-t-2 border-dashed border-gold relative flex items-center justify-center">
                    <span className="absolute bg-paper px-1 text-gold text-sm">✈</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono-data text-[11px] text-ink/50 uppercase tracking-wider">Điểm đến</p>
                  <p className="font-display text-3xl font-bold text-coral">PQC</p>
                  <p className="text-xs text-ink/70">Phú Quốc, Đảo Ngọc</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono-data text-xs text-ink/80 ticket-perforation pt-4 border-t border-dashed border-ink/20 bg-sand/30 -mx-6 -mb-6 p-6 rounded-b-ticket">
                <div>
                  <p className="text-[10px] text-ink/40 uppercase tracking-wider">CỔNG</p>
                  <p className="font-bold text-ink">GATE 01</p>
                </div>
                <div>
                  <p className="text-[10px] text-ink/40 uppercase tracking-wider">HẠNG VÉ</p>
                  <p className="font-bold text-coral">VIP TOUR</p>
                </div>
                <div>
                  <p className="text-[10px] text-ink/40 uppercase tracking-wider">KHỞI HÀNH</p>
                  <p className="font-bold text-ink">Mùa Hè 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Danh mục nhanh */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-mono-data text-xs uppercase tracking-widest text-gold font-semibold">
            🗂 Chọn nhanh theo danh mục
          </p>
          <span className="text-xs text-ink/50 font-mono-data hidden sm:inline">Cuộn để xem thêm →</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(`/tours?category=${c.id}`)}
              className="shrink-0 font-mono-data text-xs uppercase tracking-widest border border-ink/20 bg-paper text-ink hover:bg-coral hover:text-paper hover:border-coral px-5 py-2.5 rounded-ticket shadow-xs hover:shadow-md transition-all duration-200 active:scale-95"
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tour nổi bật */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-ink/10 pb-4">
          <div>
            <span className="font-mono-data text-xs uppercase tracking-widest text-coral font-semibold">
              ★ Đắc địa &amp; Yêu thích nhất
            </span>
            <h2 className="font-display text-3xl font-bold text-ink mt-1">
              Tour được đánh giá cao
            </h2>
          </div>
          <button
            onClick={() => navigate("/tours")}
            className="font-mono-data text-xs uppercase tracking-widest text-ink hover:text-coral font-semibold flex items-center gap-1 group self-start sm:self-auto transition-colors"
          >
            <span>Xem tất cả hành trình</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          {featured.map((t) => (
            <TourCard key={t.id} tour={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
