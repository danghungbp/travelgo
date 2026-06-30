export default function Footer() {
  return (
    <footer className="bg-ink text-paper/75 mt-24 border-t-2 border-gold/40 shadow-[0_-4px_20px_rgba(15,42,61,0.15)] relative overflow-hidden">
      {/* Background grain pattern */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-50" />

      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-12 relative z-10">
        <div className="sm:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-3xl text-paper font-bold tracking-tight">
              Travel<span className="text-coral">Go</span>
            </span>
            <span className="font-mono-data text-[10px] uppercase tracking-widest px-2 py-0.5 border border-gold/50 text-gold rounded">
              Est. 2026
            </span>
          </div>
          <p className="text-sm leading-relaxed text-paper/80 max-w-sm">
            Đặt tour du lịch trong nước &amp; quốc tế với phong cách Boarding Pass duy nhất. Minh bạch giá cả, xác nhận tức thì, đồng hành tin cậy suốt hành trình.
          </p>
          <div className="pt-2 flex items-center gap-2 font-mono-data text-xs text-gold">
            <span>✈ 100+ Lịch trình</span>
            <span>·</span>
            <span>🛡 Hỗ trợ 24/7</span>
          </div>
        </div>

        <div className="sm:col-span-3 space-y-3">
          <p className="font-mono-data text-xs uppercase tracking-widest text-gold font-semibold border-b border-gold/20 pb-2">
            Khám phá
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="/tours?region=domestic" className="hover:text-coral transition-colors duration-200 block">
                Tour Trong nước
              </a>
            </li>
            <li>
              <a href="/tours?region=international" className="hover:text-coral transition-colors duration-200 block">
                Tour Quốc tế
              </a>
            </li>
            <li>
              <a href="/tours" className="hover:text-coral transition-colors duration-200 block">
                Khuyến mãi mùa hè
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-coral transition-colors duration-200 block">
                Cẩm nang du lịch
              </a>
            </li>
          </ul>
        </div>

        <div className="sm:col-span-4 space-y-3">
          <p className="font-mono-data text-xs uppercase tracking-widest text-gold font-semibold border-b border-gold/20 pb-2">
            Trạm hỗ trợ khách hàng
          </p>
          <ul className="space-y-2.5 text-sm font-mono-data text-paper/85">
            <li className="flex items-center gap-2">
              <span className="text-coral">✉</span> hotro@travelgo.vn
            </li>
            <li className="flex items-center gap-2">
              <span className="text-coral">☎</span> 1900 0000 (8:00 - 22:00)
            </li>
            <li className="flex items-start gap-2 leading-relaxed">
              <span className="text-coral mt-0.5">📍</span> Q.1, TP. Hồ Chí Minh, Việt Nam
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10 py-5 bg-ink-dark/60 text-center text-xs font-mono-data text-paper/60 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>© 2026 TravelGo. Đồ án Chuyên đề 1 — Dữ liệu mẫu demo.</span>
          <span className="text-gold/80 tracking-widest uppercase text-[11px]">Vintage Boarding Pass Edition</span>
        </div>
      </div>
    </footer>
  );
}
