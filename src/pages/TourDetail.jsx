import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from "../services/mockApi.js";
import PosterArt from "../components/PosterArt.jsx";
import StarRating from "../components/StarRating.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function formatVND(n) {
  return n.toLocaleString("vi-VN") + " đ";
}

export default function TourDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [tour, setTour] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [departureDate, setDepartureDate] = useState("");
  const [people, setPeople] = useState(2);
  const [note, setNote] = useState("");
  const [booking, setBooking] = useState({ loading: false, error: "", success: "" });

  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewState, setReviewState] = useState({ loading: false, error: "" });
  const [activeBookingModal, setActiveBookingModal] = useState(null);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  useEffect(() => {
    api.getTourBySlug(slug).then((t) => {
      setTour(t);
      setDepartureDate(t.departure[0]);
      api.getReviews(t.id).then(setReviews);
    });
  }, [slug]);

  if (!tour) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="ticket p-12 inline-block">
          <p className="font-mono-data text-sm uppercase tracking-widest text-gold animate-pulse">
            ⏳ Đang in vé &amp; tải thông tin hành trình...
          </p>
        </div>
      </div>
    );
  }

  async function handleBook(e) {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    setBooking({ loading: true, error: "", success: "" });
    try {
      const result = await api.createBooking({
        userId: user.id,
        tourId: tour.id,
        departureDate,
        people: Number(people),
        note,
      });
      setActiveBookingModal(result);
      setPaymentConfirmed(false);
      setBooking({ loading: false, error: "", success: "" });
    } catch (err) {
      setBooking({ loading: false, error: err.message, success: "" });
    }
  }

  async function handleConfirmPayment() {
    if (!activeBookingModal) return;
    try {
      await api.updateBookingStatus(activeBookingModal.id, "confirmed");
      setPaymentConfirmed(true);
    } catch (err) {
      alert("Lỗi xác nhận: " + err.message);
    }
  }

  async function handleReview(e) {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    setReviewState({ loading: true, error: "" });
    try {
      const r = await api.addReview({
        tourId: tour.id,
        userId: user.id,
        userName: user.name,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
      });
      setReviews([r, ...reviews]);
      setReviewForm({ rating: 5, comment: "" });
      setReviewState({ loading: false, error: "" });
    } catch (err) {
      setReviewState({ loading: false, error: err.message });
    }
  }

  return (
    <div className="pb-20">
      {/* Banner PosterArt */}
      <div className="h-80 sm:h-96 relative overflow-hidden bg-ink">
        <PosterArt tour={tour} category={tour.category} className="w-full h-full object-cover opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-10">
        <div className="bg-paper ticket p-6 sm:p-10 grid md:grid-cols-[1.6fr_1fr] gap-10 shadow-poster border border-ink/20">
          {/* Thông tin chính */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-sand px-3 py-1 rounded text-coral font-mono-data text-xs uppercase tracking-widest font-semibold border border-ink/10">
                <span>{tour.region === "domestic" ? "✈ Trong nước" : "🌐 Quốc tế"}</span>
                <span>•</span>
                <span>⏱ {tour.duration}</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-3 leading-tight tracking-tight">
                {tour.title}
              </h1>
              <div className="flex items-center gap-3 mt-3 pb-4 border-b border-ink/10">
                <div className="flex items-center gap-1.5">
                  <StarRating value={tour.rating} />
                  <span className="font-mono-data text-sm font-bold text-ink">
                    {tour.rating || "Chưa có"}
                  </span>
                </div>
                <span className="text-ink/40">|</span>
                <span className="font-mono-data text-sm text-ink/70">
                  {tour.reviewCount} đánh giá từ du khách
                </span>
              </div>
              <p className="text-ink/80 mt-4 leading-relaxed font-body text-base">
                {tour.description}
              </p>
            </div>

            {/* Lịch trình */}
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-ink flex items-center gap-2 border-b border-ink/10 pb-2">
                <span className="text-coral">📋</span> Điểm nhấn hành trình
              </h2>
              <ul className="space-y-3 font-mono-data text-sm text-ink/80 pt-1">
                {tour.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="ticket-perforation pl-4 border-l-2 border-gold py-1.5 bg-sand/40 rounded-r hover:bg-sand transition-colors"
                  >
                    <span className="font-bold text-coral mr-2">#{i + 1}</span> {h}
                  </li>
                ))}
              </ul>
            </div>

            {/* Đánh giá */}
            <div className="space-y-6 pt-4">
              <h2 className="font-display text-2xl font-bold text-ink flex items-center justify-between border-b border-ink/10 pb-2">
                <span>💬 Ý kiến du khách ({reviews.length})</span>
              </h2>
              
              <div className="space-y-4">
                {reviews.length === 0 && (
                  <div className="p-6 text-center bg-sand/30 rounded border border-dashed border-ink/20">
                    <p className="text-sm text-ink/60 font-mono-data">Chưa có lời nhận xét nào cho hành trình này. Hãy là người đầu tiên!</p>
                  </div>
                )}
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 bg-sand/30 rounded border border-ink/10 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm text-ink flex items-center gap-2">
                        <span>👤</span> {r.userName}
                      </p>
                      <StarRating value={r.rating} size={14} />
                    </div>
                    <p className="text-sm text-ink/80 leading-relaxed pl-6">{r.comment}</p>
                  </div>
                ))}
              </div>

              {/* Form nhận xét */}
              <form onSubmit={handleReview} className="ticket p-6 space-y-4 bg-sand/50 border border-ink/15 shadow-sm">
                <p className="font-mono-data text-xs uppercase tracking-widest text-gold font-bold flex items-center gap-1.5">
                  <span>✍</span> Chia sẻ cảm nhận của bạn
                </p>
                <div className="grid sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-mono-data uppercase text-ink/60 mb-1">Mức hài lòng</label>
                    <select
                      value={reviewForm.rating}
                      onChange={(e) => setReviewForm({ ...reviewForm, rating: e.target.value })}
                      className="w-full border border-ink/20 rounded px-3 py-2 text-sm bg-paper font-semibold focus:outline-none focus:ring-2 focus:ring-coral"
                    >
                      {[5, 4, 3, 2, 1].map((n) => (
                        <option key={n} value={n}>
                          {n} sao ({n === 5 ? "Tuyệt vời" : n === 4 ? "Tốt" : "Bình thường"})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-mono-data uppercase text-ink/60 mb-1">Nội dung đánh giá</label>
                    <textarea
                      required
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="Trải nghiệm của bạn về hướng dẫn viên, dịch vụ..."
                      className="w-full border border-ink/20 rounded px-3 py-2 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-coral"
                      rows={2}
                    />
                  </div>
                </div>
                {reviewState.error && (
                  <p className="text-xs text-coral font-mono-data">{reviewState.error}</p>
                )}
                <button
                  disabled={reviewState.loading}
                  className="font-mono-data text-xs uppercase tracking-widest bg-ink hover:bg-ink-light text-paper px-6 py-2.5 rounded-ticket disabled:opacity-50 transition-all font-semibold shadow-xs"
                >
                  {reviewState.loading ? "⏳ Đang xử lý..." : user ? "Gửi đánh giá hành trình" : "🔒 Đăng nhập để gửi nhận xét"}
                </button>
              </form>
            </div>
          </div>

          {/* Form đặt tour — dạng vé giữ chỗ Sticky */}
          <div>
            <form onSubmit={handleBook} className="ticket p-6 sticky top-28 space-y-5 bg-paper border-2 border-ink/20 shadow-poster">
              <div className="flex justify-between items-center border-b border-ink/15 pb-3">
                <span className="font-mono-data text-xs uppercase tracking-widest text-coral font-bold flex items-center gap-1.5">
                  <span>🎟</span> Phiếu giữ chỗ
                </span>
                <span className="font-mono-data text-[11px] text-ink/50 bg-sand px-2 py-0.5 rounded">
                  INSTANT PASS
                </span>
              </div>

              <div>
                <span className="font-mono-data text-[11px] uppercase text-ink/50 block">Đơn giá hành trình</span>
                <p className="font-mono-data text-3xl font-bold text-coral mt-0.5">
                  {formatVND(tour.price)}
                  <span className="text-xs font-body font-normal text-ink/60"> / khách</span>
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="font-mono-data text-[11px] uppercase text-ink/70 font-semibold block mb-1">
                  📅 Ngày khởi hành
                  </label>
                  <select
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full border border-ink/20 rounded-ticket px-3.5 py-2.5 text-sm bg-paper font-medium focus:outline-none focus:ring-2 focus:ring-coral shadow-inner cursor-pointer"
                  >
                    {tour.departure.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-mono-data text-[11px] uppercase text-ink/70 font-semibold block mb-1">
                    👥 Số lượng hành khách (Tối đa {tour.maxPeople})
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={tour.maxPeople}
                    value={people}
                    onChange={(e) => setPeople(e.target.value)}
                    className="w-full border border-ink/20 rounded-ticket px-3.5 py-2.5 text-sm bg-paper font-medium focus:outline-none focus:ring-2 focus:ring-coral shadow-inner"
                  />
                </div>

                <div>
                  <label className="font-mono-data text-[11px] uppercase text-ink/70 font-semibold block mb-1">
                    📝 Yêu cầu đặc biệt (Tuỳ chọn)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Đón tại sân bay, ăn chay..."
                    className="w-full border border-ink/20 rounded-ticket px-3.5 py-2 text-sm bg-paper focus:outline-none focus:ring-2 focus:ring-coral shadow-inner"
                    rows={2}
                  />
                </div>
              </div>

              <div className="border-t-2 border-dashed border-ink/20 pt-4 flex justify-between items-baseline font-mono-data">
                <span className="text-sm text-ink/70 font-semibold">TỔNG TIỀN</span>
                <span className="text-xl font-bold text-coral">
                  {formatVND(tour.price * Number(people || 0))}
                </span>
              </div>

              {booking.error && (
                <div className="p-3 bg-coral/10 border border-coral/30 rounded text-xs text-coral font-mono-data">
                  ⚠️ {booking.error}
                </div>
              )}
              {booking.success && (
                <div className="p-3 bg-gold/20 border border-gold/50 rounded text-xs text-ink font-mono-data font-semibold animate-fadeIn">
                  {booking.success}
                </div>
              )}

              <button
                disabled={booking.loading}
                className="w-full bg-coral hover:bg-coral-dark text-paper font-mono-data text-xs uppercase tracking-widest py-4 rounded-ticket disabled:opacity-50 font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                {booking.loading
                  ? "⏳ Đang xuất vé..."
                  : user
                  ? "✈ Xác nhận đặt giữ chỗ"
                  : "🔒 Đăng nhập để xuất vé"}
              </button>

              <p className="text-[11px] text-center text-ink/50 font-mono-data pt-1">
                Cam kết hoàn tiền theo chính sách nếu huỷ trước 7 ngày.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Thanh toán VietQR */}
      {activeBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-paper ticket p-8 max-w-md w-full shadow-2xl border-2 border-gold relative space-y-6">
            <button
              onClick={() => setActiveBookingModal(null)}
              className="absolute top-4 right-4 text-ink/50 hover:text-coral font-bold text-lg"
            >
              ✕
            </button>

            <div className="text-center border-b border-ink/15 pb-4">
              <span className="font-mono-data text-xs uppercase tracking-widest bg-gold/20 text-ink px-3 py-1 rounded font-bold">
                CỔNG THANH TOÁN VIETQR 24/7
              </span>
              <h3 className="font-display text-2xl font-bold text-ink mt-2">
                Xuất vé hành trình
              </h3>
              <p className="font-mono-data text-sm text-ink/70 mt-1">
                Mã vé: <strong className="text-coral">{activeBookingModal.bookingCode}</strong>
              </p>
            </div>

            {!paymentConfirmed ? (
              <div className="space-y-6">
                <div className="bg-sand/60 p-4 rounded-ticket border border-ink/15 text-center space-y-3">
                  <p className="font-mono-data text-xs uppercase text-ink/60">Quét mã VietQR bằng App Ngân hàng</p>
                  
                  {/* Mô phỏng mã QR bằng SVG */}
                  <div className="w-44 h-44 mx-auto bg-paper p-3 rounded border border-ink/20 shadow-inner flex items-center justify-center relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-ink fill-current">
                      <rect x="10" y="10" width="25" height="25" />
                      <rect x="15" y="15" width="15" height="15" fill="#FAF6EE" />
                      <rect x="18" y="18" width="9" height="9" />
                      
                      <rect x="65" y="10" width="25" height="25" />
                      <rect x="70" y="15" width="15" height="15" fill="#FAF6EE" />
                      <rect x="73" y="18" width="9" height="9" />
                      
                      <rect x="10" y="65" width="25" height="25" />
                      <rect x="15" y="70" width="15" height="15" fill="#FAF6EE" />
                      <rect x="18" y="73" width="9" height="9" />

                      <rect x="42" y="15" width="15" height="8" />
                      <rect x="40" y="30" width="20" height="20" />
                      <rect x="15" y="45" width="15" height="10" />
                      <rect x="70" y="45" width="18" height="15" />
                      <rect x="45" y="60" width="12" height="25" />
                      <rect x="65" y="70" width="20" height="15" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="bg-coral text-paper font-mono-data text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                        VIETQR
                      </span>
                    </div>
                  </div>

                  <div className="font-mono-data text-sm">
                    Số tiền: <strong className="text-xl text-coral">{formatVND(activeBookingModal.totalPrice)}</strong>
                  </div>
                  <p className="text-[11px] font-mono-data text-ink/60">
                    Nội dung CK: <strong className="bg-paper px-2 py-0.5 rounded border border-ink/10 text-ink">{activeBookingModal.bookingCode}</strong>
                  </p>
                </div>

                <button
                  onClick={handleConfirmPayment}
                  className="w-full bg-coral hover:bg-coral-dark text-paper font-mono-data text-xs uppercase tracking-widest py-3.5 rounded-ticket font-bold shadow-md transition-transform active:scale-95"
                >
                  ⚡ Tôi đã chuyển khoản &amp; Xác nhận
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-5 animate-fadeInUp">
                <div className="w-20 h-20 mx-auto rounded-full bg-gold/30 border-2 border-gold flex items-center justify-center text-3xl shadow-inner">
                  🎉
                </div>
                <div>
                  <span className="inline-block border-2 border-coral text-coral font-mono-data font-bold text-sm uppercase px-3 py-1 rounded rotate-[-6deg] shadow-sm mb-3">
                    PAID / VERIFIED
                  </span>
                  <h4 className="font-display text-2xl font-bold text-ink">Xuất vé thành công!</h4>
                  <p className="text-sm text-ink/70 mt-1 font-body">
                    Hành trình của bạn đã được xác nhận. Mời kiểm tra vé điện tử trong ví vé.
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/bookings?open=${activeBookingModal.id}`)}
                  className="w-full bg-ink hover:bg-ink-light text-paper font-mono-data text-xs uppercase tracking-widest py-3.5 rounded-ticket font-bold shadow transition-transform active:scale-95"
                >
                  🎟 Mở Ví Vé của tôi
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
