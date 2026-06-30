import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-5 py-24 text-center">
      <p className="font-mono-data text-coral text-sm">Lỗi 404</p>
      <h1 className="font-display text-3xl font-semibold text-ink mt-2">
        Chuyến bay này không tồn tại
      </h1>
      <p className="text-ink/60 mt-2">Trang bạn tìm không có trên hệ thống TravelGo.</p>
      <Link
        to="/"
        className="inline-block mt-6 bg-ink text-paper font-mono-data text-xs uppercase tracking-widest px-5 py-3 rounded-ticket"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
