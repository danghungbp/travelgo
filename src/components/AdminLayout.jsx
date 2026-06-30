import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/admin", label: "Tổng quan", end: true },
  { to: "/admin/tours", label: "Quản lý tour" },
  { to: "/admin/bookings", label: "Quản lý đơn đặt" },
  { to: "/admin/users", label: "Quản lý người dùng" },
];

export default function AdminLayout() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-[200px_1fr] gap-8">
      <aside className="space-y-1">
        <p className="font-mono-data text-xs uppercase tracking-widest text-gold mb-3">
          Bảng quản trị
        </p>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-ticket text-sm font-medium ${
                isActive
                  ? "bg-ink text-paper"
                  : "text-ink/70 hover:bg-sand-dark"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </aside>
      <section>
        <Outlet />
      </section>
    </div>
  );
}
