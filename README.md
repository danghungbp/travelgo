# TravelGo — Website đặt tour du lịch (Chuyên đề 1)

Khung giao diện + thao tác (frontend-only, dữ liệu mock lưu ở localStorage qua
`src/services/mockApi.js`) cho đồ án Chuyên đề 1. Giai đoạn 2 sẽ nối backend
thật (Node.js + Express + MongoDB Atlas) và deploy lên Cloud.

## Chạy thử trên máy

```bash
cd travelgo
npm install
npm run dev
```

Mở http://localhost:5173

Tài khoản admin demo: `admin@travelgo.vn` / `admin123`
(Tự đăng ký tài khoản user mới ngay trên trang Đăng ký.)

## Cấu trúc project

```
src/
  data/mockData.js        # dữ liệu mẫu: 8 tour, 5 danh mục
  services/mockApi.js      # "giả lập" toàn bộ REST API — mỗi hàm có comment
                            # ghi rõ endpoint thật tương ứng (vd: POST /api/auth/login)
  context/AuthContext.jsx  # quản lý session đăng nhập toàn site
  components/              # Navbar, Footer, TourCard, PosterArt (minh hoạ SVG), ...
  pages/                   # Home, Tours, TourDetail, Login, Register, Profile, MyBookings
  pages/admin/             # Dashboard, ManageTours, ManageBookings, ManageUsers
```

Vì `mockApi.js` được viết với chữ ký hàm giống 1-1 với API thật (cùng tên,
cùng input/output), khi có backend thật chỉ cần thay nội dung từng hàm bằng
`fetch()`/`axios` gọi server — toàn bộ UI giữ nguyên, không phải sửa lại.

## Đáp ứng yêu cầu kỹ thuật tối thiểu của đề (mục C)

- Kiến trúc 3 tầng: Frontend (React) tách biệt hoàn toàn khỏi tầng dữ liệu
  qua `mockApi.js` (sẽ thay bằng Backend/API + Database thật ở giai đoạn 2).
- ≥5 chức năng nghiệp vụ: tìm/lọc tour, đặt tour, huỷ đơn, viết đánh giá,
  quản lý hồ sơ, quản trị tour/đơn/người dùng.
- Đăng ký / Đăng nhập / Quản lý hồ sơ cá nhân: có (`Register.jsx`,
  `Login.jsx`, `Profile.jsx`).
- Phân quyền User / Administrator: có (`RequireAdmin`, route `/admin/*`).
- ≥5 API endpoint dự kiến: xem comment đầu mỗi nhóm hàm trong `mockApi.js`
  (auth, tours, bookings, reviews, admin — tổng cộng 15+ endpoint).
- ≥5 bảng dữ liệu: `users`, `tours`, `bookings`, `reviews`, và
  `project/category` tham chiếu (categories) — khi lên MongoDB sẽ là
  5 collection: `users`, `tours`, `bookings`, `reviews`, `categories`.

## Kế hoạch giai đoạn 2 — Backend + Deploy Cloud

**Backend (Node.js + Express + MongoDB Atlas):**
1. Tạo project Express, kết nối MongoDB Atlas qua Mongoose.
2. Định nghĩa schema: `User`, `Tour`, `Booking`, `Review`.
3. Viết lại từng hàm trong `mockApi.js` thành route Express tương ứng
   (đã ghi sẵn đường dẫn endpoint trong comment).
4. Auth bằng JWT: `POST /api/auth/register`, `POST /api/auth/login`,
   middleware `verifyToken` + `requireAdmin`.
5. Test API bằng Postman/Thunder Client trước khi nối frontend.

**Nối frontend với backend thật:**
- Thay nội dung các hàm trong `mockApi.js` bằng `fetch(`${API_URL}/...`)`.
- Lưu JWT token vào `localStorage`, gắn header `Authorization: Bearer <token>`.

**Deploy lên Cloud (miễn phí, dễ làm cho sinh viên):**
- Database: MongoDB Atlas (free tier M0).
- Backend: Render hoặc Railway (deploy từ GitHub repo Express).
- Frontend: Vercel hoặc Netlify (deploy từ GitHub repo React, build command
  `npm run build`, output `dist`).
- Cấu hình biến môi trường `VITE_API_URL` trên Vercel trỏ tới URL backend.

## Build production

```bash
npm run build   # xuất ra thư mục dist/, sẵn sàng deploy lên Vercel/Netlify
npm run preview
```
