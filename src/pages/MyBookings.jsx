import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import * as api from "../services/mockApi.js";
import { useAuth } from "../context/AuthContext.jsx";

const STATUS_LABEL = {
  pending: { label: "⏳ CHỜ THANH TOÁN", className: "bg-gold/30 text-ink border border-gold/50" },
  confirmed: { label: "✓ ĐÃ XUẤT VÉ (PAID)", className: "bg-ink text-paper border border-ink" },
  cancelled: { label: "✕ ĐÃ HUỶ VÉ", className: "bg-coral/20 text-coral border border-coral/40" },
};

function formatVND(n) {
  return n.toLocaleString("vi-VN") + " đ";
}

export default function MyBookings() {
  const { user } = useAuth();
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    api.getMyBookings(user.id).then((list) => {
      const sorted = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setBookings(sorted);
      setLoading(false);

      const openId = new URLSearchParams(location.search).get("open");
      if (openId) {
        const found = sorted.find((b) => b.id === Number(openId));
        if (found) setSelectedTicket(found);
      }
    });
  }, [user.id, location.search]);

  async function handleCancel(id) {
    if (!window.confirm("Bạn có chắc chắn muốn huỷ vé giữ chỗ này không?")) return;
    const updated = await api.updateBookingStatus(id, "cancelled");
    setBookings((prev) => prev.map((b) => (b.id === id ? updated : b)));
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-8 pb-24">
      {/* Header */}
      <div className="border-b border-ink/15 pb-6 flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 font-mono-data text-xs uppercase tracking-widest text-coral font-bold mb-1">
            <span>PASSENGER WALLET</span>
          </div>
          <h1 className="font-display text-4xl font-bold text-ink tracking-tight">
            Ví Vé Boarding Pass
          </h1>
        </div>
        <div className="hidden sm:block text-right font-mono-data text-sm text-ink/70">
          <span>Hành khách: <strong className="text-ink">{user.name}</strong></span>
        </div>
      </div>

      {loading && (
        <div className="ticket p-12 text-center font-mono-data text-sm animate-pulse">
          ⏳ Đang mở tủ ví &amp; tải các vé hành trình...
        </div>
      )}

      {!loading && bookings.length === 0 && (
        <div className="ticket p-12 text-center border-2 border-dashed border-ink/20 bg-sand/30">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-display text-xl font-bold text-ink">Ví của bạn đang trống.</p>
          <p className="text-sm text-ink/70 mt-1 font-body">Hãy đặt ngay chuyến đi đầu tiên để in chiếc Boarding Pass độc bản cho riêng mình!</p>
          <Link
            to="/tours"
            className="mt-6 inline-block font-mono-data text-xs uppercase tracking-widest bg-coral hover:bg-coral-dark text-paper px-6 py-3 rounded-ticket font-bold shadow-sm transition-transform active:scale-95"
          >
            ✈ Khám phá các hành trình ngay
          </Link>
        </div>
      )}

      {/* Danh sách vé */}
      <div className="space-y-6">
        {bookings.map((b) => {
          const status = STATUS_LABEL[b.status];
          const gate = `G-${(b.id % 8) + 1}A`;
          const seat = `${(b.id * 3) % 25 + 1}${"ABCDEF"[b.id % 6]}`;

          return (
            <div key={b.id} className="ticket shadow-poster transition-transform hover:-translate-y-1 duration-300 overflow-hidden bg-paper border border-ink/20">
              <div className="grid md:grid-cols-[1fr_220px] items-stretch">
                {/* Phần chính của vé */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-data text-xs font-bold text-coral bg-sand px-2.5 py-1 rounded border border-ink/10">
                        ✈ PASS #{b.bookingCode}
                      </span>
                      <span className="font-mono-data text-xs text-ink/60">
                        {new Date(b.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                    <span className={`font-mono-data text-[11px] font-bold uppercase px-2.5 py-1 rounded-ticket ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono-data text-[11px] uppercase tracking-wider text-ink/50 block">Hành trình trải nghiệm</span>
                    <h3 className="font-display text-2xl font-bold text-ink mt-0.5">{b.tourTitle}</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-2 font-mono-data text-sm">
                    <div>
                      <span className="text-[11px] text-ink/50 block uppercase">Ngày khởi hành</span>
                      <strong className="text-ink">{b.departureDate}</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-ink/50 block uppercase">Hành khách</span>
                      <strong className="text-ink">{b.people} Người</strong>
                    </div>
                    <div>
                      <span className="text-[11px] text-ink/50 block uppercase">Tổng tiền</span>
                      <strong className="text-coral">{formatVND(b.totalPrice)}</strong>
                    </div>
                  </div>
                </div>

                {/* Phần cuống vé bên phải (Stub) */}
                <div className="bg-sand/60 p-6 flex flex-col justify-between items-center border-t md:border-t-0 md:border-l-2 border-dashed border-ink/20 relative">
                  <div className="w-full text-center space-y-1">
                    <div className="flex justify-around font-mono-data text-xs text-ink/70">
                      <div>
                        <span className="text-[10px] text-ink/40 block">CỔNG</span>
                        <strong>{gate}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-ink/40 block">GHẾ</span>
                        <strong>{seat}</strong>
                      </div>
                    </div>
                  </div>

                  {/* SVG Barcode mô phỏng */}
                  {b.status === "cancelled" ? (
                    <div className="my-3 w-full h-12 bg-coral/10 p-1.5 rounded border border-coral/30 flex items-center justify-center">
                      <span className="font-mono-data font-bold text-coral text-lg tracking-[0.2em] opacity-80">VOID</span>
                    </div>
                  ) : (
                    <div className="my-3 w-full h-12 bg-paper p-1.5 rounded border border-ink/15 flex items-center justify-center opacity-85">
                      <svg viewBox="0 0 120 30" className="w-full h-full fill-ink">
                        {[2,6,10,12,18,22,24,30,34,38,42,48,50,56,60,66,70,74,80,84,88,92,98,102,106,112,116].map((x, i) => (
                          <rect key={x} x={x} y="0" width={i % 2 === 0 ? 3 : 1.5} height="30" />
                        ))}
                      </svg>
                    </div>
                  )}

                  <div className="w-full space-y-2">
                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => setSelectedTicket(b)}
                        className="w-full bg-ink hover:bg-ink-light text-paper font-mono-data text-xs uppercase tracking-widest py-2 rounded font-bold shadow-xs transition-transform active:scale-95"
                      >
                        👁 Xem E-Ticket
                      </button>
                    )}

                    {b.status === "pending" && (
                      <button
                        onClick={() => handleCancel(b.id)}
                        className="w-full text-center font-mono-data text-xs text-coral hover:underline py-1 block"
                      >
                        ✕ Huỷ vé giữ chỗ
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal E-Ticket toàn màn hình */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-paper ticket p-8 max-w-lg w-full shadow-2xl border-2 border-gold relative space-y-6">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 text-ink/50 hover:text-coral font-bold text-xl"
            >
              ✕
            </button>

            <div className="text-center border-b border-ink/15 pb-4">
              <span className="font-mono-data text-xs uppercase tracking-widest bg-gold/20 text-ink px-3 py-1 rounded font-bold">
                BOARDING PASS / E-TICKET
              </span>
              <h3 className="font-display text-2xl font-bold text-ink mt-2">
                {selectedTicket.tourTitle}
              </h3>
            </div>

            <div className="bg-sand/50 p-5 rounded border border-ink/15 space-y-4 font-mono-data text-sm">
              <div className="flex justify-between border-b border-ink/10 pb-2">
                <span>Hành khách:</span>
                <strong className="text-ink">{user.name}</strong>
              </div>
              <div className="flex justify-between border-b border-ink/10 pb-2">
                <span>Mã đặt vé:</span>
                <strong className="text-coral">{selectedTicket.bookingCode}</strong>
              </div>
              <div className="flex justify-between border-b border-ink/10 pb-2">
                <span>Khởi hành:</span>
                <strong className="text-ink">{selectedTicket.departureDate}</strong>
              </div>
              <div className="flex justify-between border-b border-ink/10 pb-2">
                <span>Số lượng:</span>
                <strong className="text-ink">{selectedTicket.people} Hành khách</strong>
              </div>
              <div className="flex justify-between">
                <span>Trạng thái vé:</span>
                <strong className="uppercase">{STATUS_LABEL[selectedTicket.status].label}</strong>
              </div>
            </div>

            {/* Mã vạch checkin */}
            <div className="text-center space-y-2">
              <p className="font-mono-data text-xs uppercase text-ink/50">Đưa mã vạch này tại quầy làm thủ tục sân bay</p>
              <div className="h-16 bg-paper p-2 border border-ink/20 rounded shadow-inner flex items-center justify-center">
                <svg viewBox="0 0 150 40" className="w-4/5 h-full fill-ink">
                  {[2,8,14,18,26,32,36,44,50,56,62,70,76,82,88,96,102,108,114,122,128,134,142,146].map((x, i) => (
                    <rect key={x} x={x} y="0" width={i % 3 === 0 ? 4 : 2} height="40" />
                  ))}
                </svg>
              </div>
              <p className="font-mono-data text-xs tracking-widest text-ink font-bold">{selectedTicket.bookingCode}-2026-TG</p>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full bg-coral hover:bg-coral-dark text-paper font-mono-data text-xs uppercase tracking-widest py-3.5 rounded font-bold shadow transition-transform active:scale-95"
            >
              🖨 In vé / Lưu file PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
