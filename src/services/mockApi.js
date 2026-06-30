// mockApi.js (Chuyển tiếp sang Backend Express API thật)
// Mọi hàm ở đây đều giữ nguyên signature và props trả về như trước,
// đảm bảo toàn bộ UI React không cần chỉnh sửa bất kỳ dòng code nào.

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const KEYS = {
  SESSION: "tg_session",
};

function getSessionUserId() {
  try {
    const raw = localStorage.getItem(KEYS.SESSION);
    return raw ? JSON.parse(raw).userId : null;
  } catch {
    return null;
  }
}

async function request(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  const userId = getSessionUserId();
  if (userId) {
    headers["x-user-id"] = userId;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Lỗi kết nối máy chủ API" }));
    throw new Error(errorData.message || "Đã xảy ra lỗi API");
  }
  return res.json();
}

/* ---------------------------- AUTH -------------------------------- */

export async function register({ name, email, password, phone }) {
  const user = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, phone }),
  });
  localStorage.setItem(KEYS.SESSION, JSON.stringify({ userId: user.id }));
  return user;
}

export async function login({ email, password }) {
  const user = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  localStorage.setItem(KEYS.SESSION, JSON.stringify({ userId: user.id }));
  return user;
}

export function logout() {
  localStorage.removeItem(KEYS.SESSION);
}

export async function getCurrentUser() {
  const userId = getSessionUserId();
  if (!userId) return null;
  return await request(`/auth/me?userId=${userId}`).catch(() => null);
}

export async function updateProfile(userId, updates) {
  return await request(`/auth/profile/${userId}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

/* ---------------------------- TOURS --------------------------------- */

export async function getTours({ region, category, q } = {}) {
  const params = new URLSearchParams();
  if (region) params.append("region", region);
  if (category) params.append("category", category);
  if (q) params.append("q", q);
  return await request(`/tours?${params.toString()}`);
}

export async function getTourBySlug(slug) {
  return await request(`/tours/${slug}`);
}

export async function createTour(payload) {
  return await request("/tours", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateTour(id, updates) {
  return await request(`/tours/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteTour(id) {
  return await request(`/tours/${id}`, {
    method: "DELETE",
  });
}

/* -------------------------- BOOKINGS --------------------------------- */

export async function createBooking({ userId, tourId, departureDate, people, note }) {
  return await request("/bookings", {
    method: "POST",
    body: JSON.stringify({ userId, tourId, departureDate, people, note }),
  });
}

export async function getMyBookings(userId) {
  return await request(`/bookings/me?userId=${userId}`);
}

export async function getAllBookings() {
  return await request("/bookings");
}

export async function updateBookingStatus(id, status) {
  return await request(`/bookings/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

/* --------------------------- REVIEWS --------------------------------- */

export async function getReviews(tourId) {
  return await request(`/tours/${tourId}/reviews`);
}

export async function addReview({ tourId, userId, userName, rating, comment }) {
  return await request(`/tours/${tourId}/reviews`, {
    method: "POST",
    body: JSON.stringify({ userId, userName, rating, comment }),
  });
}

/* ---------------------------- ADMIN ----------------------------------- */

export async function getAllUsers() {
  return await request("/admin/users");
}

export async function getStats() {
  return await request("/admin/stats");
}
