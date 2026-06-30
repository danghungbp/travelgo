import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { RequireAuth, RequireAdmin } from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Tours from "./pages/Tours.jsx";
import TourDetail from "./pages/TourDetail.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import MyBookings from "./pages/MyBookings.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminLayout from "./components/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import ManageTours from "./pages/admin/ManageTours.jsx";
import ManageBookings from "./pages/admin/ManageBookings.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:slug" element={<TourDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/bookings"
            element={
              <RequireAuth>
                <MyBookings />
              </RequireAuth>
            }
          />

          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="tours" element={<ManageTours />} />
            <Route path="bookings" element={<ManageBookings />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
