# TravelGo — Website đặt tour du lịch (Full-Stack)

Dự án đồ án chuyên đề 1: Hệ thống đặt tour du lịch trực tuyến.
Hiện tại dự án đã hoàn thiện 100% kiến trúc **Full-Stack (3-Tier Architecture)** bao gồm Frontend (React/Vite), Backend (Node.js/Express) và Cơ sở dữ liệu (MongoDB Atlas). 

Hệ thống đã được tự động hoá triển khai (CI/CD) thành công lên môi trường Cloud.

---

## 🌍 Demo trực tuyến (Live Demo)
- **Website (Frontend):** [https://travelgo-bice.vercel.app](https://travelgo-bice.vercel.app)
- **API Server (Backend):** [https://travelgo-backend-tbey.onrender.com](https://travelgo-backend-tbey.onrender.com)
- **Tài khoản quản trị viên (Admin):** 
  - Email: `admin@travelgo.vn`
  - Mật khẩu: `admin123`
*(Có thể tự đăng ký tài khoản User mới ngay trên trang Đăng ký)*

---

## 🛠️ Công nghệ sử dụng
- **Frontend:** React (Vite), TailwindCSS, React Router DOM.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Cloud NoSQL Database), Mongoose.
- **Triển khai (Cloud Deployment):** Vercel (Frontend), Render (Backend).

---

## 🚀 Hướng dẫn chạy thử trên máy cá nhân (Local Development)

### 1. Khởi động Backend và Cơ sở dữ liệu
Mở terminal 1, trỏ vào thư mục `server`:
```bash
cd server
npm install
npm run seed  # Chỉ chạy lần đầu để nạp dữ liệu mẫu vào DB
npm run dev
```
*Backend sẽ chạy tại: `http://localhost:5000`*

### 2. Khởi động Frontend (Giao diện)
Mở terminal 2, trỏ vào thư mục gốc `travelgo`:
```bash
npm install
npm run dev
```
*Frontend sẽ chạy tại: `http://localhost:5173`*

---

## 📂 Cấu trúc dự án
```text
travelgo/
│
├── server/                     # [BACKEND - API & DATABASE]
│   ├── config/db.js            # Cấu hình kết nối MongoDB
│   ├── controllers/            # Xử lý logic API (Auth, Tours, Bookings, Reviews, Admin)
│   ├── models/                 # Mongoose Schemas (User, Tour, Booking, Review)
│   ├── routes/                 # Định nghĩa các Endpoints (RESTful API)
│   ├── seed/seeder.js          # Script tự động nạp dữ liệu mẫu
│   └── server.js               # Entry point khởi chạy Express server
│
├── src/                        # [FRONTEND - GIAO DIỆN REACT]
│   ├── components/             # Navbar, Footer, TourCard, E-Ticket 3D...
│   ├── context/AuthContext.jsx # Quản lý phiên đăng nhập toàn cục
│   ├── pages/                  # Các trang Home, Tours, Login, Profile, Admin Dashboard...
│   └── services/mockApi.js     # Hàm fetch gọi API tới Backend
│
├── vercel.json                 # Cấu hình SPA Routing cho Vercel (chống lỗi 404)
└── package.json
```

## ✨ Các tính năng nổi bật
- **Thiết kế UI/UX độc đáo:** Concept "Vé Máy Bay/Sổ thông hành" cổ điển (Vintage Travel Pass) với hiệu ứng 3D đổ bóng, đục lỗ vé.
- **Đầy đủ nghiệp vụ:** Tìm kiếm, lọc tour, đặt chỗ, hủy đơn, viết đánh giá 5 sao.
- **Hệ thống Quản trị (Admin Dashboard):** Quản lý toàn bộ Tour, người dùng và duyệt đơn đặt vé (kèm doanh thu, thống kê).
- **Hoạt động theo chuẩn REST API:** Toàn bộ giao tiếp giữa Frontend và Backend sử dụng HTTP fetch() và JSON.
