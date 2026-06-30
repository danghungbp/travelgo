import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [state, setState] = useState({ loading: false, error: "" });

  async function handleSubmit(e) {
    e.preventDefault();
    setState({ loading: true, error: "" });
    try {
      await registerUser(form);
      navigate("/");
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
          Tạo tài khoản mới
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="font-mono-data text-[11px] uppercase text-ink/50">Họ tên</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-ink/15 rounded-ticket px-3 py-2 text-sm mt-1"
            />
          </div>
          <div>
            <label className="font-mono-data text-[11px] uppercase text-ink/50">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-ink/15 rounded-ticket px-3 py-2 text-sm mt-1"
            />
          </div>
          <div>
            <label className="font-mono-data text-[11px] uppercase text-ink/50">
              Số điện thoại
            </label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-ink/15 rounded-ticket px-3 py-2 text-sm mt-1"
            />
          </div>
          <div>
            <label className="font-mono-data text-[11px] uppercase text-ink/50">
              Mật khẩu
            </label>
            <input
              type="password"
              required
              minLength={4}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-ink/15 rounded-ticket px-3 py-2 text-sm mt-1"
            />
          </div>

          {state.error && <p className="text-sm text-coral">{state.error}</p>}

          <button
            disabled={state.loading}
            className="w-full bg-ink text-paper font-mono-data text-xs uppercase tracking-widest py-3 rounded-ticket disabled:opacity-50"
          >
            {state.loading ? "Đang tạo..." : "Đăng ký"}
          </button>
        </form>

        <p className="text-sm text-ink/60 mt-5">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-coral font-medium">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
