import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import * as api from "../services/mockApi.js";

export default function Profile() {
  const { user, refreshUser } = useAuth();
  const [form, setForm] = useState({ name: user.name, phone: user.phone || "" });
  const [state, setState] = useState({ loading: false, success: "" });
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.getMyBookings(user.id).then(setBookings);
  }, [user.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setState({ loading: true, success: "" });
    await refreshUser(form);
    setState({ loading: false, success: "Đã lưu thay đổi." });
  }

  // Trích xuất các điểm đến duy nhất để làm mộc dấu
  const stamps = Array.from(
    new Set(bookings.filter((b) => b.status !== "cancelled").map((b) => b.tourTitle.split("—")[0].trim()))
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-start pb-24">
      {/* Cột trái: Thông tin cá nhân */}
      <div className="ticket p-7 shadow-poster bg-paper border border-ink/20 space-y-6">
        <div>
          <p className="font-mono-data text-xs uppercase tracking-widest text-coral font-bold">
            Hồ sơ hành khách
          </p>
          <h1 className="font-display text-3xl font-bold text-ink mt-1">
            Thông tin cá nhân
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-mono-data text-[11px] uppercase text-ink/60 font-semibold block mb-1">Email đăng nhập</label>
            <input
              disabled
              value={user.email}
              className="w-full border border-ink/15 rounded-ticket px-3.5 py-2.5 text-sm bg-sand/40 text-ink/50 font-mono-data"
            />
          </div>
          <div>
            <label className="font-mono-data text-[11px] uppercase text-ink/60 font-semibold block mb-1">Họ và tên hành khách</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-ink/20 rounded-ticket px-3.5 py-2.5 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-coral font-medium shadow-inner"
            />
          </div>
          <div>
            <label className="font-mono-data text-[11px] uppercase text-ink/60 font-semibold block mb-1">
              Số điện thoại liên lạc
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="09xx xxx xxx"
              className="w-full border border-ink/20 rounded-ticket px-3.5 py-2.5 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-coral font-medium shadow-inner"
            />
          </div>

          {state.success && (
            <p className="text-xs text-ink bg-gold/30 border border-gold px-3.5 py-2.5 rounded font-mono-data font-semibold animate-fadeIn">
              ✓ {state.success}
            </p>
          )}

          <button
            disabled={state.loading}
            className="w-full bg-ink hover:bg-ink-light text-paper font-mono-data text-xs uppercase tracking-widest py-3.5 rounded-ticket disabled:opacity-50 font-bold shadow transition-transform active:scale-95"
          >
            {state.loading ? "⏳ Đang lưu..." : "💾 Lưu thay đổi hồ sơ"}
          </button>
        </form>
      </div>

      {/* Cột phải: Sổ Thông Hành & Mộc Dấu (Travel Passport) */}
      <div className="ticket p-7 shadow-poster bg-sand/50 border-2 border-gold relative overflow-hidden space-y-6">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full pointer-events-none" />

        <div className="border-b border-ink/15 pb-4 flex justify-between items-start">
          <div>
            <span className="font-mono-data text-xs uppercase tracking-widest bg-gold/30 text-ink px-2.5 py-1 rounded font-bold">
              OFFICIAL PASSPORT
            </span>
            <h2 className="font-display text-3xl font-bold text-ink mt-2">
              Sổ Thông Hành
            </h2>
          </div>
          <span className="text-3xl">🛂</span>
        </div>

        {/* Tiến độ sưu tầm */}
        <div className="bg-paper p-4 rounded-ticket border border-ink/15 shadow-inner space-y-2">
          <div className="flex justify-between font-mono-data text-xs font-semibold">
            <span className="text-ink/70">Mộc dấu đã thu thập:</span>
            <strong className="text-coral">{stamps.length} / 6 Điểm đến</strong>
          </div>
          <div className="w-full h-2.5 bg-sand rounded-full overflow-hidden border border-ink/10">
            <div
              className="h-full bg-coral transition-all duration-700"
              style={{ width: `${Math.min(100, (stamps.length / 6) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-ink/60 font-body">
            {stamps.length >= 3 ? (
              <span className="text-coral font-bold">🎉 Chúc mừng! Bạn đã đạt hạng FIRST CLASS TRAVELER.</span>
            ) : (
              <span>Sưu tầm đủ 3 mộc dấu để mở khoá Huy hiệu VIP &amp; Mã giảm giá 10%!</span>
            )}
          </p>
        </div>

        {/* Huy hiệu & Mã giảm giá khi đạt 3 stamp */}
        {stamps.length >= 3 && (
          <div className="bg-gold/20 border-2 border-dashed border-gold p-4 rounded text-center space-y-1 animate-fadeInUp">
            <span className="inline-block bg-ink text-gold text-[10px] font-mono-data font-bold px-2 py-0.5 rounded tracking-widest">
              VIP MEMBER BENEFIT
            </span>
            <h4 className="font-display text-lg font-bold text-ink">Mã ưu đãi độc quyền 10%</h4>
            <div className="my-2 inline-block bg-paper px-4 py-1.5 rounded border border-ink font-mono-data text-lg font-bold text-coral tracking-widest shadow-xs">
              TRAVELGO10
            </div>
            <p className="text-[11px] text-ink/70">Áp dụng cho toàn bộ hành trình tại TravelGo.</p>
          </div>
        )}

        {/* Lưới các ô hộ chiếu (Passport Stamp Grid) */}
        <div>
          <h3 className="font-mono-data text-xs uppercase tracking-wider text-ink/60 font-bold mb-3">
            Trang Mộc Dấu Điểm Đến
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => {
              const stampName = stamps[idx];
              return (
                <div
                  key={idx}
                  className={`aspect-square rounded border-2 flex flex-col items-center justify-center p-3 text-center transition-all ${
                    stampName
                      ? "bg-paper border-coral/80 shadow-sm rotate-[-3deg] hover:rotate-0"
                      : "bg-sand/30 border-dashed border-ink/20 opacity-60"
                  }`}
                >
                  {stampName ? (
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-coral flex flex-col items-center justify-center p-1 text-coral animate-fadeIn">
                      <span className="text-[9px] font-mono-data font-bold tracking-widest uppercase opacity-75">
                        VISITED &amp; VERIFIED
                      </span>
                      <strong className="font-display text-sm font-bold my-1 line-clamp-1">
                        {stampName}
                      </strong>
                      <span className="text-[8px] font-mono-data opacity-75">★ TRAVELGO ★</span>
                    </div>
                  ) : (
                    <div className="space-y-1 text-ink/40">
                      <div className="text-2xl">✈</div>
                      <p className="font-mono-data text-[10px] uppercase tracking-wider">Ô trống #{idx + 1}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-2 text-center">
          <Link
            to="/tours"
            className="inline-block font-mono-data text-xs uppercase tracking-widest text-coral hover:underline font-bold"
          >
            → Khám phá thêm điểm đến mới để nhận mộc
          </Link>
        </div>
      </div>
    </div>
  );
}
