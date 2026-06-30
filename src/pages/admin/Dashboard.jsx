import { useEffect, useState } from "react";
import * as api from "../../services/mockApi.js";

function formatVND(n) {
  return n.toLocaleString("vi-VN") + " đ";
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.getStats().then(setStats);
  }, []);

  if (!stats) return <p className="text-ink/60">Đang tải...</p>;

  const cards = [
    { label: "Tổng số tour", value: stats.totalTours },
    { label: "Người dùng", value: stats.totalUsers },
    { label: "Đơn đặt tour", value: stats.totalBookings },
    { label: "Đơn chờ xác nhận", value: stats.pendingBookings },
    { label: "Doanh thu (đã xác nhận)", value: formatVND(stats.revenue) },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink mb-6">Tổng quan</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="ticket p-5">
            <p className="font-mono-data text-[11px] uppercase tracking-widest text-gold">
              {c.label}
            </p>
            <p className="font-display text-2xl font-semibold text-ink mt-2">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
