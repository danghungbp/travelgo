import { useEffect, useState } from "react";
import * as api from "../../services/mockApi.js";

const STATUS_LABEL = {
  pending: { label: "Chờ xác nhận", className: "bg-gold-light/50 text-ink" },
  confirmed: { label: "Đã xác nhận", className: "bg-ink text-paper" },
  cancelled: { label: "Đã huỷ", className: "bg-coral/20 text-coral-dark" },
};

function formatVND(n) {
  return n.toLocaleString("vi-VN") + " đ";
}

export default function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("");

  function load() {
    api.getAllBookings().then((list) =>
      setBookings(list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    );
  }

  useEffect(load, []);

  async function setStatus(id, status) {
    await api.updateBookingStatus(id, status);
    load();
  }

  const filtered = filter ? bookings.filter((b) => b.status === filter) : bookings;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Quản lý đơn đặt tour</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-ink/15 rounded-ticket px-3 py-2 text-sm"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="cancelled">Đã huỷ</option>
        </select>
      </div>

      <div className="ticket overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left font-mono-data text-[11px] uppercase tracking-widest text-gold border-b border-ink/10">
              <th className="p-3">Mã đơn</th>
              <th className="p-3">Tour</th>
              <th className="p-3">Ngày khởi hành</th>
              <th className="p-3">Khách</th>
              <th className="p-3">Tổng tiền</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => {
              const status = STATUS_LABEL[b.status];
              return (
                <tr key={b.id} className="border-b border-ink/5">
                  <td className="p-3 font-mono-data text-ink/60">{b.bookingCode}</td>
                  <td className="p-3 font-medium text-ink">{b.tourTitle}</td>
                  <td className="p-3 text-ink/60">{b.departureDate}</td>
                  <td className="p-3 text-ink/60">{b.people}</td>
                  <td className="p-3 font-mono-data text-coral">{formatVND(b.totalPrice)}</td>
                  <td className="p-3">
                    <span
                      className={`font-mono-data text-[11px] uppercase px-2 py-1 rounded-ticket ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2">
                    {b.status !== "confirmed" && (
                      <button
                        onClick={() => setStatus(b.id, "confirmed")}
                        className="text-ink/60 hover:text-coral text-xs underline"
                      >
                        Xác nhận
                      </button>
                    )}
                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => setStatus(b.id, "cancelled")}
                        className="text-ink/60 hover:text-coral text-xs underline"
                      >
                        Huỷ
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="p-6 text-center text-sm text-ink/50">Không có đơn nào.</p>
        )}
      </div>
    </div>
  );
}
