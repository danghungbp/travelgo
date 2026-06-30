# Tiến độ Chuyên đề 1 — Đối chiếu với đề cương

**Đề tài:** TravelGo — Website đặt tour du lịch
**Hạn nộp:** 03/07/2026 · **Báo cáo:** 08/07/2026 · **Hôm nay:** 29/06/2026
**⚠️ Còn khoảng 4 ngày tới hạn nộp** — backend, deploy, và toàn bộ tài liệu báo cáo
vẫn chưa làm. Cần ưu tiên gấp theo kế hoạch ở cuối file.

---

## A. Đối chiếu nội dung báo cáo (theo đề bài)

### Câu 1 (1,5đ) — Bài toán và cơ sở lý thuyết (CLO1)
| Mục | Yêu cầu | Trạng thái |
|---|---|---|
| a (0,5đ) | Mô tả bài toán, mục tiêu, đối tượng sử dụng | 🟡 Đã có trong đầu (lĩnh vực: du lịch, mục tiêu: đặt tour online, đối tượng: khách du lịch + admin) nhưng **chưa viết thành văn bản báo cáo** |
| b (0,5đ) | Yêu cầu chức năng / phi chức năng | 🟡 Yêu cầu chức năng đã *hiện thực hoá trong code* (xem mục B); yêu cầu phi chức năng (hiệu năng, bảo mật, khả mở rộng...) **chưa liệt kê chính thức** |
| c (0,5đ) | Cơ sở lý thuyết (3 tầng, REST, Auth, DB design, Cloud) | 🔴 **Chưa viết** — cần trình bày lý thuyết, có thể trích từ kiến trúc đang dùng để minh hoạ thực tế |

### Câu 2 (2,5đ) — Phân tích và thiết kế hệ thống (CLO2)
| Mục | Yêu cầu | Trạng thái |
|---|---|---|
| a (0,5đ) | Use Case Diagram, đặc tả chức năng | 🔴 Chưa vẽ. Actor đã rõ: **User** (xem/đặt/huỷ tour, đánh giá, sửa hồ sơ), **Admin** (CRUD tour, duyệt đơn, xem user) |
| b (1,0đ) | Kiến trúc tổng thể / Frontend / Backend / Database | 🟡 Frontend đã code thật (React+Tailwind). Backend & Database hiện **đang là mock** (`mockApi.js` + localStorage) — kiến trúc 3 tầng *đã thiết kế* nhưng tầng Backend/DB *chưa hiện thực thật* |
| c (0,5đ) | ERD, Data Dictionary | 🟡 5 thực thể đã định hình rõ qua code: `User`, `Tour`, `Booking`, `Review`, `Category` — cần vẽ ERD chính thức + bảng Data Dictionary (kiểu dữ liệu, ràng buộc) |
| d (0,5đ) | Wireframe/Mockup, luồng xử lý chính | 🟢 Đã có **hơn cả wireframe** — UI thật hoàn chỉnh (Home, Tours, TourDetail, Login/Register, Profile, Bookings, Admin). Cần chụp lại làm minh chứng + vẽ luồng xử lý (vd: luồng đặt tour) cho báo cáo |

### Câu 3 (3,0đ) — Xây dựng và đánh giá hệ thống (CLO2)
| Mục | Yêu cầu | Trạng thái |
|---|---|---|
| a (0,5đ) | Frontend hoàn chỉnh, Responsive | 🟢 Đã xây xong toàn bộ trang; responsive cơ bản có nhưng **đang tinh chỉnh lại theo yêu cầu nâng cấp UI mới nhất** (đổ bóng, spacing, mobile menu...) |
| b (0,5đ) | Backend, REST API, Business Logic | 🔴 **Chưa làm.** Mới chỉ mô phỏng bằng `mockApi.js` (chạy hoàn toàn ở trình duyệt). Đã thiết kế sẵn 15+ endpoint dự kiến (ghi rõ trong comment từng hàm) để chuyển sang Express |
| c (0,5đ) | Database, CRUD đầy đủ, dữ liệu mẫu | 🟡 CRUD đầy đủ **trên dữ liệu mock** (localStorage), dữ liệu mẫu có sẵn (8 tour). **Chưa có database thật** (MongoDB/PostgreSQL) |
| d (0,5đ) | Authentication & Authorization | 🟡 Đăng nhập/phân quyền User-Admin đã hoạt động ở tầng frontend (session giả lập). **Chưa có JWT/OAuth2 thật từ backend** |
| e (0,5đ) | Kiểm thử hệ thống (API Testing, Functional Testing) | 🔴 Chưa làm — phải có backend thật trước mới test API được (Postman). Functional testing trên UI có thể làm sớm hơn |
| f (0,5đ) | Đánh giá kết quả (ưu/nhược/hướng phát triển) | 🔴 Chưa viết chính thức, nhưng đã có đủ trải nghiệm thực tế để viết (xem gợi ý ở cuối file) |

### Câu 4 (3,0đ) — Triển khai trên Cloud (CLO3)
| Mục | Yêu cầu | Trạng thái |
|---|---|---|
| a (1,0đ) | Sơ đồ triển khai, luồng dữ liệu, vai trò thành phần | 🟡 Đã có **kế hoạch** (README: Vercel + Render + MongoDB Atlas) nhưng chưa vẽ sơ đồ triển khai chính thức |
| b (1,0đ) | Triển khai thực tế trên Cloud | 🔴 **Chưa làm** — đây là phần rủi ro nhất vì cần cả backend thật trước |
| c (1,0đ) | Minh chứng vận hành (URL, video, hình ảnh) | 🔴 Chưa có — phụ thuộc hoàn toàn vào mục b |

---

## B. Đối chiếu yêu cầu kỹ thuật tối thiểu (mục C đề bài)

| # | Yêu cầu | Trạng thái |
|---|---|---|
| 1 | Kiến trúc 3 tầng rõ ràng | 🟡 Frontend: ✅ · Backend/API: 🔴 chưa có server thật · Database: 🔴 chưa có DB thật |
| 2 | ≥5 chức năng nghiệp vụ | 🟢 Đã có 7: tìm/lọc tour, đặt tour, huỷ đơn, đánh giá, sửa hồ sơ, admin quản lý tour, admin quản lý đơn |
| 3 | Đăng ký / Đăng nhập / Hồ sơ cá nhân | 🟢 Hoạt động đầy đủ (mock session) |
| 4 | Phân quyền User / Administrator | 🟢 Có route-guard `RequireAuth`/`RequireAdmin`; cần backend enforce lại (không chỉ chặn ở frontend) |
| 5 | ≥5 API Endpoint | 🟡 Đã **thiết kế** 15+ endpoint (comment trong `mockApi.js`), **chưa hiện thực** bằng Express thật |
| 6 | ≥5 bảng/collection CSDL | 🟡 Đã **thiết kế** 5 thực thể (`users`, `tours`, `bookings`, `reviews`, `categories`), **chưa tạo DB thật** |
| 7 | Triển khai thành công trên Cloud | 🔴 Chưa làm — *đây là điều kiện bắt buộc để đạt yêu cầu học phần, không có sẽ không đạt* |

---

## C. Sản phẩm nộp — đối chiếu mục D

| Sản phẩm | Trạng thái |
|---|---|
| Báo cáo Word (25-40 trang, A4, Times New Roman 13-14) | 🔴 Chưa viết |
| Báo cáo PDF | 🔴 Chưa có (xuất từ Word) |
| Source code | 🟢 Frontend xong, Backend chưa có |
| File Database Script | 🔴 Chưa có (cần có DB thật trước) |
| API Documentation | 🔴 Chưa có (cần backend thật trước) |
| Video Demo | 🔴 Chưa quay (cần hệ thống chạy trên Cloud trước) |
| Slide báo cáo | 🔴 Chưa làm |

---

## D. Tóm tắt: đã làm gì, còn gì

**Đã xong (~70% phần frontend):**
- Toàn bộ giao diện React + Tailwind: Home, danh sách tour (lọc/sắp xếp), chi tiết tour, đặt tour, huỷ đơn, đánh giá, đăng ký/đăng nhập, hồ sơ cá nhân, khu vực Admin (dashboard, CRUD tour, quản lý đơn, quản lý user)
- Thiết kế UI riêng biệt (concept "vé du lịch"), đang tinh chỉnh thêm độ hoàn thiện
- Lớp `mockApi.js` mô phỏng đúng 1-1 cấu trúc API thật sẽ build → giúp giai đoạn nối backend nhanh hơn vì không cần sửa UI
- Đã thiết kế sẵn (trong đầu/code) 5 thực thể dữ liệu và 15+ endpoint cần có

**Chưa làm (phần nặng và đang là rủi ro chính):**
1. Backend thật (Express) + Database thật (MongoDB Atlas/PostgreSQL)
2. Authentication thật bằng JWT
3. Deploy lên Cloud (frontend + backend + DB)
4. Toàn bộ tài liệu: Use Case Diagram, ERD, Data Dictionary, sơ đồ triển khai, đặc tả chức năng
5. Kiểm thử API + Functional testing có ghi nhận kết quả
6. Báo cáo Word/PDF, Slide, Video demo, API Documentation

---

## E. Đề xuất lộ trình 4 ngày (do hạn nộp rất gần)

| Ngày | Việc cần làm |
|---|---|
| **Ngày 1 (29-30/06)** | Build backend Express tối thiểu + kết nối MongoDB Atlas; chuyển `mockApi.js` → API thật cho các chức năng cốt lõi (auth, tour, booking) |
| **Ngày 2 (01/07)** | Deploy: Backend → Render/Railway, Frontend → Vercel/Netlify, DB → MongoDB Atlas. Test toàn bộ luồng trên môi trường Cloud thật |
| **Ngày 3 (02/07)** | Viết báo cáo Word (dựa theo khung Câu 1-4 ở trên), vẽ Use Case Diagram + ERD + sơ đồ triển khai, làm Data Dictionary, viết phần đánh giá (Câu 3f) |
| **Ngày 4 (03/07)** | Quay video demo trên môi trường Cloud, làm slide báo cáo, xuất PDF, đóng gói nộp Google Classroom trước hạn |

> Nếu muốn, mình có thể bắt đầu ngay với **Ngày 1** — viết backend Express + schema MongoDB dựa trên `mockApi.js` đã có sẵn, để bạn không bị trễ tiến độ.
