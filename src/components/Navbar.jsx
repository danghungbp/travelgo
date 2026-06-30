import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, isAdmin, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `font-mono-data text-xs uppercase tracking-widest py-2 transition-all duration-200 ${
      isActive
        ? "text-coral font-semibold border-b-2 border-coral"
        : "text-paper/80 hover:text-paper hover:translate-y-[-1px]"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block font-mono-data text-sm uppercase tracking-widest py-3 px-4 rounded-ticket transition-colors ${
      isActive
        ? "bg-ink-light text-coral font-semibold"
        : "text-paper/80 hover:bg-ink-light/50 hover:text-paper"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-ink border-b-2 border-gold shadow-md">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl sm:text-3xl text-paper font-bold tracking-tight transition-transform duration-200 group-hover:scale-[1.02]">
            Travel<span className="text-coral">Go</span>
          </span>
          <span className="hidden sm:inline-block font-mono-data text-[10px] bg-gold/20 text-gold px-2 py-0.5 rounded uppercase tracking-widest border border-gold/40">
            Pass
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass} end>
            Trang chủ
          </NavLink>
          <NavLink to="/tours" className={linkClass}>
            Tour du lịch
          </NavLink>
          {user && (
            <NavLink to="/bookings" className={linkClass}>
              Đơn của tôi
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={linkClass}>
              Quản trị
            </NavLink>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="font-mono-data text-xs text-paper/80 hover:text-paper transition-colors py-1 border-b border-transparent hover:border-paper/40"
              >
                {user.name}
              </Link>
              <button
                onClick={() => {
                  logoutUser();
                  navigate("/");
                }}
                className="font-mono-data text-xs uppercase tracking-widest text-paper bg-coral hover:bg-coral-dark px-4 py-2.5 rounded-ticket shadow-sm hover:shadow transition-all duration-200 active:scale-95"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-mono-data text-xs uppercase tracking-widest text-paper/80 hover:text-paper px-3 py-2 transition-colors"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="font-mono-data text-xs uppercase tracking-widest text-ink font-semibold bg-gold hover:bg-gold-light px-4 py-2.5 rounded-ticket shadow-sm hover:shadow transition-all duration-200 active:scale-95"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-paper p-2 focus:outline-none focus:ring-2 focus:ring-coral rounded-ticket"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ink border-b border-gold/40 px-6 py-5 space-y-3 animate-fadeIn">
          <nav className="space-y-1">
            <NavLink
              to="/"
              className={mobileLinkClass}
              onClick={() => setMobileMenuOpen(false)}
              end
            >
              Trang chủ
            </NavLink>
            <NavLink
              to="/tours"
              className={mobileLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              Tour du lịch
            </NavLink>
            {user && (
              <NavLink
                to="/bookings"
                className={mobileLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Đơn của tôi
              </NavLink>
            )}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={mobileLinkClass}
                onClick={() => setMobileMenuOpen(false)}
              >
                Quản trị
              </NavLink>
            )}
          </nav>

          <div className="pt-4 border-t border-paper/10 flex flex-col gap-3">
            {user ? (
              <div className="flex items-center justify-between px-2">
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono-data text-sm text-gold font-semibold truncate max-w-[180px]"
                >
                  👤 {user.name}
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                    navigate("/");
                  }}
                  className="font-mono-data text-xs uppercase tracking-widest text-paper bg-coral hover:bg-coral-dark px-4 py-2 rounded-ticket"
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center font-mono-data text-xs uppercase tracking-widest text-paper border border-paper/30 py-2.5 rounded-ticket hover:bg-paper/10 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center font-mono-data text-xs uppercase tracking-widest text-ink font-semibold bg-gold hover:bg-gold-light py-2.5 rounded-ticket transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
