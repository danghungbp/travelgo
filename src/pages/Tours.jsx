import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as api from "../services/mockApi.js";
import { categories } from "../data/mockData.js";
import TourCard from "../components/TourCard.jsx";

export default function Tours() {
  const [params, setParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("rating");

  const region = params.get("region") || "";
  const category = params.get("category") || "";
  const q = params.get("q") || "";

  useEffect(() => {
    setLoading(true);
    api.getTours({ region, category, q }).then((list) => {
      setTours(list);
      setLoading(false);
    });
  }, [region, category, q]);

  function updateParam(key, value) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }

  const sorted = [...tours].sort((a, b) =>
    sort === "price-asc"
      ? a.price - b.price
      : sort === "price-desc"
      ? b.price - a.price
      : b.rating - a.rating
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
      {/* Header */}
      <div className="border-b border-ink/15 pb-6">
        <div className="inline-flex items-center gap-2 font-mono-data text-xs uppercase tracking-widest text-coral font-semibold mb-1">
          <span>Khám phá mọi điểm đến</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
          Danh mục Hành trình
        </h1>
        <p className="text-ink/70 mt-2 font-mono-data text-sm flex items-center gap-2">
          {loading ? (
            <span className="animate-pulse">⏳ Đang tìm kiếm chuyến đi phù hợp...</span>
          ) : (
            <span>★ Tìm thấy <strong className="text-coral">{sorted.length}</strong> hành trình sẵn sàng khởi hành</span>
          )}
        </p>
      </div>

      <div className="grid md:grid-cols-[240px_1fr] gap-10 items-start">
        {/* Bộ lọc Sidebar */}
        <aside className="space-y-8 ticket p-6 bg-paper sticky top-24 border border-ink/15 shadow-ticket">
          <div>
            <p className="font-mono-data text-xs uppercase tracking-widest text-gold font-bold mb-3 flex items-center gap-1.5 border-b border-ink/10 pb-2">
              <span>✈</span> Khu vực
            </p>
            <div className="space-y-1.5">
              {[
                { id: "", label: "Tất cả khu vực" },
                { id: "domestic", label: "Trong nước" },
                { id: "international", label: "Quốc tế" },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => updateParam("region", r.id)}
                  className={`block w-full text-left px-3.5 py-2 rounded-ticket text-sm font-medium transition-all duration-200 ${
                    region === r.id
                      ? "bg-ink text-paper shadow-sm font-semibold translate-x-1"
                      : "text-ink/75 hover:bg-sand hover:text-ink hover:translate-x-0.5"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono-data text-xs uppercase tracking-widest text-gold font-bold mb-3 flex items-center gap-1.5 border-b border-ink/10 pb-2">
              <span>🏷</span> Danh mục
            </p>
            <div className="space-y-1.5">
              <button
                onClick={() => updateParam("category", "")}
                className={`block w-full text-left px-3.5 py-2 rounded-ticket text-sm font-medium transition-all duration-200 ${
                  category === ""
                    ? "bg-ink text-paper shadow-sm font-semibold translate-x-1"
                    : "text-ink/75 hover:bg-sand hover:text-ink hover:translate-x-0.5"
                }`}
              >
                Tất cả trải nghiệm
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => updateParam("category", c.id)}
                  className={`block w-full text-left px-3.5 py-2 rounded-ticket text-sm font-medium transition-all duration-200 ${
                    category === c.id
                      ? "bg-ink text-paper shadow-sm font-semibold translate-x-1"
                      : "text-ink/75 hover:bg-sand hover:text-ink hover:translate-x-0.5"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono-data text-xs uppercase tracking-widest text-gold font-bold mb-3 flex items-center gap-1.5 border-b border-ink/10 pb-2">
              <span>⚡</span> Sắp xếp theo
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-ink/20 rounded-ticket px-3.5 py-2.5 text-sm bg-paper text-ink font-medium focus:outline-none focus:ring-2 focus:ring-coral shadow-inner cursor-pointer"
            >
              <option value="rating">★ Đánh giá cao nhất</option>
              <option value="price-asc">⬆ Giá từ thấp đến cao</option>
              <option value="price-desc">⬇ Giá từ cao đến thấp</option>
            </select>
          </div>
        </aside>

        {/* Kết quả */}
        <div>
          {!loading && sorted.length === 0 && (
            <div className="ticket p-12 text-center border-2 border-dashed border-ink/20 bg-sand/30">
              <div className="text-4xl mb-3">📭</div>
              <p className="font-display text-xl font-bold text-ink">
                Không tìm thấy chuyến đi nào khớp yêu cầu.
              </p>
              <p className="text-sm text-ink/70 mt-2 font-body max-w-md mx-auto">
                Thử xoá bớt từ khoá tìm kiếm hoặc thay đổi khu vực, danh mục ở bảng bên trái.
              </p>
              <button
                onClick={() => setParams({})}
                className="mt-6 font-mono-data text-xs uppercase tracking-widest bg-coral hover:bg-coral-dark text-paper px-5 py-2.5 rounded-ticket shadow-sm transition-transform active:scale-95"
              >
                Đặt lại toàn bộ bộ lọc
              </button>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-8">
            {sorted.map((t) => (
              <TourCard key={t.id} tour={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
