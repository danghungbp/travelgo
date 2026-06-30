import { useEffect, useState } from "react";
import * as api from "../../services/mockApi.js";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.getAllUsers().then(setUsers);
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink mb-6">Quản lý người dùng</h1>
      <div className="ticket overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left font-mono-data text-[11px] uppercase tracking-widest text-gold border-b border-ink/10">
              <th className="p-3">Họ tên</th>
              <th className="p-3">Email</th>
              <th className="p-3">SĐT</th>
              <th className="p-3">Vai trò</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-ink/5">
                <td className="p-3 font-medium text-ink">{u.name}</td>
                <td className="p-3 text-ink/60 font-mono-data">{u.email}</td>
                <td className="p-3 text-ink/60">{u.phone || "—"}</td>
                <td className="p-3">
                  <span
                    className={`font-mono-data text-[11px] uppercase px-2 py-1 rounded-ticket ${
                      u.role === "admin" ? "bg-ink text-paper" : "bg-sand-dark text-ink/70"
                    }`}
                  >
                    {u.role === "admin" ? "Admin" : "User"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
