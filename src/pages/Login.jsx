import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [state, setState] = useState({ loading: false, error: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setState({ loading: true, error: "" });
    try {
      await loginUser(form);
      navigate(location.state?.from || "/");
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  }

  return (
    <div className="max-w-md mx-auto px-5 py-16">
      <div className="ticket p-7">
        <p className="font-mono-data text-xs uppercase tracking-widest text-coral">
          Boarding Pass
        </p>
        <h1 className="font-display text-2xl font-semibold text-ink mt-1">
          Đăng nhập TravelGo
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="font-mono-data text-[11px] uppercase text-ink/50">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-ink/15 rounded-ticket px-3 py-2 text-sm mt-1"
              placeholder="ban@vidu.com"
            />
          </div>
          <div>
            <label className="font-mono-data text-[11px] uppercase text-ink/50">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-ink/15 rounded-ticket px-3 py-2 text-sm mt-1"
              placeholder="••••••••"
            />
          </div>

          {state.error && <p className="text-sm text-coral">{state.error}</p>}

          <button
            disabled={state.loading}
            className="w-full bg-ink text-paper font-mono-data text-xs uppercase tracking-widest py-3 rounded-ticket disabled:opacity-50"
          >
            {state.loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <p className="text-sm text-ink/60 mt-5">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-coral font-medium">
            Đăng ký ngay
          </Link>
        </p>
        <p className="text-xs text-ink/40 mt-3 font-mono-data">
          Demo admin: admin@travelgo.vn / admin123
        </p>
      </div>
    </div>
  );
}
