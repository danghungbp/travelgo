import { Link } from "react-router-dom";
import PosterArt from "./PosterArt.jsx";
import StarRating from "./StarRating.jsx";

function formatVND(n) {
  return n.toLocaleString("vi-VN") + " đ";
}

export default function TourCard({ tour }) {
  return (
    <Link
      to={`/tours/${tour.slug}`}
      className="ticket flex flex-col sm:flex-row overflow-hidden hover:-translate-y-1.5 hover:shadow-poster transition-all duration-300 ease-out group bg-paper border border-ink/15"
    >
      <div className="sm:w-48 h-48 sm:h-auto overflow-hidden relative">
        <PosterArt
          tour={tour}
          category={tour.category}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute top-2 left-2 bg-ink/80 backdrop-blur-xs text-paper px-2 py-0.5 rounded text-[10px] font-mono-data uppercase tracking-widest border border-gold/30">
          {tour.category}
        </div>
      </div>
      <div className="flex-1 p-5 ticket-perforation flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono-data uppercase tracking-widest text-coral font-medium">
            <span>{tour.region === "domestic" ? "✈ Trong nước" : "🌐 Quốc tế"}</span>
            <span className="text-ink/60">{tour.duration}</span>
          </div>
          <h3 className="font-display text-xl font-bold text-ink mt-1.5 leading-snug group-hover:text-coral transition-colors duration-200">
            {tour.title}
          </h3>
          <p className="text-sm text-ink/75 mt-1.5 line-clamp-2 leading-relaxed">
            📍 {tour.destination}
          </p>
        </div>
        
        <div className="pt-3 border-t border-dashed border-ink/15 flex items-end justify-between gap-2">
          <div className="flex flex-col">
            <span className="font-mono-data text-[10px] uppercase text-ink/50 tracking-wider">Đánh giá</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <StarRating value={tour.rating} />
              <span className="font-mono-data text-xs font-semibold text-ink/80">
                {tour.rating} <span className="text-ink/50 font-normal">({tour.reviewCount})</span>
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-mono-data text-[10px] uppercase text-ink/50 tracking-wider block">Giá từ</span>
            <p className="font-mono-data text-lg font-bold text-coral leading-none mt-0.5">
              {formatVND(tour.price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
