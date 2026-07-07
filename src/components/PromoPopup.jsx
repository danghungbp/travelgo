import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hideFor24h, setHideFor24h] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const hiddenUntil = localStorage.getItem("travelgo_promo_hidden_until");
    const now = Date.now();

    // Nếu chưa có timestamp hoặc đã quá thời gian ẩn thì mới hiển thị
    if (!hiddenUntil || now > Number(hiddenUntil)) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500); // Đợi 1.5 giây sau khi tải trang chủ để pop-up hiện lên mượt mà
      return () => clearTimeout(timer);
    }
  }, []);

  function handleClose() {
    if (hideFor24h) {
      // Ẩn trong 24 giờ (24 * 60 * 60 * 1000 ms)
      const expireTime = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem("travelgo_promo_hidden_until", expireTime.toString());
    }
    setIsOpen(false);
  }

  function handleExplore() {
    handleClose();
    navigate("/tours");
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm animate-fadeIn">
      {/* Khung Postcard Vintage Airmail */}
      <div className="bg-paper ticket p-8 max-w-lg w-full shadow-2xl border-4 border-double border-gold relative overflow-hidden animate-fadeInUp">
        {/* Viền trang trí phong cách tem thư Airmail góc trên */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-coral via-gold to-ink opacity-80" />

        {/* Nút đóng */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-sand hover:bg-coral hover:text-paper text-ink/70 font-bold flex items-center justify-center transition-colors shadow-xs"
          title="Đóng thông báo"
        >
          ✕
        </button>

        {/* Dấu bưu điện (Postmark stamp) */}
        <div className="absolute -top-4 -right-4 w-28 h-28 border-2 border-dashed border-coral/20 rounded-full flex items-center justify-center pointer-events-none rotate-12">
          <span className="font-mono-data text-[9px] font-bold text-coral/40 uppercase text-center leading-tight">
            TRAVELGO<br />AIRMAIL<br />2026
          </span>
        </div>

        {/* Nội dung chính */}
        <div className="space-y-5 pt-2">
          <div className="border-b border-ink/15 pb-4">
            <span className="font-mono-data text-[11px] uppercase tracking-widest bg-gold/30 text-ink px-3 py-1 rounded font-bold border border-gold/50 inline-block">
              ✈ SPECIAL ANNOUNCEMENT / AIRMAIL
            </span>
            <h3 className="font-display text-3xl font-bold text-ink mt-3 leading-tight">
              Chào mừng bạn đến với <span className="text-coral underline decoration-gold">TravelGo</span>!
            </h3>
          </div>

          <div className="bg-sand/60 p-5 rounded-ticket border border-ink/15 space-y-3">
            <p className="font-body text-base text-ink/90 leading-relaxed font-medium">
              🔥 <strong className="text-coral">Hành trình mới vừa cập bến:</strong> Chúng tôi vừa bổ sung thêm các tuyến du lịch đặc sắc như <span className="font-bold">Kyoto Cổ Kính</span>, <span className="font-bold">Đà Lạt Mộng Mơ</span> &amp; <span className="font-bold">Phú Quốc Đảo Ngọc</span>!
            </p>
            <div className="p-3 bg-paper rounded border border-dashed border-coral/60 flex items-center justify-between">
              <div className="font-mono-data text-xs text-ink/70">
                Mã ưu đãi độc quyền:
              </div>
              <div className="font-mono-data text-base font-bold text-coral bg-coral/10 px-3 py-1 rounded tracking-wider border border-coral/30 select-all">
                VINTAGE2026
              </div>
            </div>
            <p className="text-xs text-ink/60 font-mono-data text-center">
              * Giảm ngay 10% khi xuất vé E-Ticket cho mọi chuyến đi trong hôm nay!
            </p>
          </div>

          {/* Hành động */}
          <div className="space-y-4 pt-1">
            <button
              onClick={handleExplore}
              className="w-full bg-coral hover:bg-coral-dark text-paper font-mono-data text-sm uppercase tracking-widest py-3.5 rounded-ticket font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>🎟 Săn vé hành trình ngay</span>
              <span>→</span>
            </button>

            {/* Checkbox ẩn 24 giờ */}
            <div className="flex items-center justify-center gap-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-mono-data text-xs text-ink/70 hover:text-ink select-none">
                <input
                  type="checkbox"
                  checked={hideFor24h}
                  onChange={(e) => setHideFor24h(e.target.checked)}
                  className="rounded border-ink/30 text-coral focus:ring-coral w-4 h-4 cursor-pointer accent-coral"
                />
                <span>🔕 Không hiển thị lại thông báo này trong 24 giờ tới</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
