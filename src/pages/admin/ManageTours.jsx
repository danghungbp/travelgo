import { useEffect, useState } from "react";
import * as api from "../../services/mockApi.js";
import { categories } from "../../data/mockData.js";

const EMPTY = {
  title: "",
  slug: "",
  destination: "",
  region: "domestic",
  category: "beach",
  price: "",
  duration: "",
  departure: "",
  maxPeople: 20,
  description: "",
  highlights: "",
  imageUrl: "",
};

function formatVND(n) {
  return n.toLocaleString("vi-VN") + " đ";
}

export default function ManageTours() {
  const [tours, setTours] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function load() {
    api.getTours({}).then(setTours);
  }

  useEffect(load, []);

  function startCreate() {
    setForm(EMPTY);
    setEditingId(null);
    setShowForm(true);
  }

  function startEdit(t) {
    setForm({
      ...t,
      departure: t.departure.join(", "),
      highlights: t.highlights.join("\n"),
    });
    setEditingId(t.id);
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      maxPeople: Number(form.maxPeople),
      departure: form.departure.split(",").map((s) => s.trim()).filter(Boolean),
      highlights: form.highlights.split("\n").map((s) => s.trim()).filter(Boolean),
      slug:
        form.slug ||
        form.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
    };
    if (editingId) {
      await api.updateTour(editingId, payload);
    } else {
      await api.createTour(payload);
    }
    setShowForm(false);
    load();
  }

  async function handleDelete(id) {
    if (!confirm("Xoá tour này?")) return;
    await api.deleteTour(id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Quản lý tour</h1>
        <button
          onClick={startCreate}
          className="bg-coral text-paper font-mono-data text-xs uppercase tracking-widest px-4 py-2 rounded-ticket"
        >
          + Thêm tour
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="ticket p-5 mb-6 grid sm:grid-cols-2 gap-4">
          <input
            required
            placeholder="Tên tour"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm sm:col-span-2"
          />
          <input
            placeholder="Slug (tự tạo nếu để trống)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Điểm đến"
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm"
          />
          <select
            value={form.region}
            onChange={(e) => setForm({ ...form, region: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm"
          >
            <option value="domestic">Trong nước</option>
            <option value="international">Quốc tế</option>
          </select>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            required
            type="number"
            placeholder="Giá (VND)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm"
          />
          <input
            required
            placeholder="Thời gian (VD: 3 ngày 2 đêm)"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Số khách tối đa"
            value={form.maxPeople}
            onChange={(e) => setForm({ ...form, maxPeople: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm"
          />
          <input
            placeholder="URL Ảnh đại diện (để trống nếu dùng Vintage Poster)"
            value={form.imageUrl || ""}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm sm:col-span-2"
          />
          <input
            placeholder="Các ngày khởi hành, phân cách bằng dấu phẩy"
            value={form.departure}
            onChange={(e) => setForm({ ...form, departure: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm sm:col-span-2"
          />
          <textarea
            placeholder="Mô tả"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm sm:col-span-2"
            rows={2}
          />
          <textarea
            placeholder="Lịch trình — mỗi dòng 1 mục"
            value={form.highlights}
            onChange={(e) => setForm({ ...form, highlights: e.target.value })}
            className="border border-ink/15 rounded-ticket px-3 py-2 text-sm sm:col-span-2"
            rows={3}
          />
          <div className="sm:col-span-2 flex gap-3">
            <button className="bg-ink text-paper font-mono-data text-xs uppercase tracking-widest px-4 py-2 rounded-ticket">
              {editingId ? "Lưu thay đổi" : "Tạo tour"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="font-mono-data text-xs uppercase tracking-widest px-4 py-2 rounded-ticket border border-ink/15"
            >
              Huỷ
            </button>
          </div>
        </form>
      )}

      <div className="ticket overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left font-mono-data text-[11px] uppercase tracking-widest text-gold border-b border-ink/10">
              <th className="p-3">Tên tour</th>
              <th className="p-3">Khu vực</th>
              <th className="p-3">Giá</th>
              <th className="p-3">Đánh giá</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {tours.map((t) => (
              <tr key={t.id} className="border-b border-ink/5">
                <td className="p-3 font-medium text-ink">{t.title}</td>
                <td className="p-3 text-ink/60">
                  {t.region === "domestic" ? "Trong nước" : "Quốc tế"}
                </td>
                <td className="p-3 font-mono-data text-coral">{formatVND(t.price)}</td>
                <td className="p-3 font-mono-data text-ink/60">{t.rating || "—"}</td>
                <td className="p-3 text-right space-x-3">
                  <button onClick={() => startEdit(t)} className="text-ink/60 hover:text-coral text-xs underline">
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="text-ink/60 hover:text-coral text-xs underline">
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
