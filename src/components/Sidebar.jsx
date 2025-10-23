import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const items = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/guests", label: "Guest List" },
  { to: "/rooms", label: "Room List" },
  { to: "/employees", label: "Employee List" },
  { to: "/settings", label: "Settings" },
  { to: "/profile", label: "Profile"},
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // State to store current admin info
  const [adminData, setAdminData] = useState(() => {
    const saved = localStorage.getItem("admin");
    return saved ? JSON.parse(saved) : { name: "Admin", avatar: "" };
  });

  // ✅ Refresh admin info whenever location changes or data in localStorage updates
  useEffect(() => {
    const loadAdmin = () => {
      const saved = localStorage.getItem("admin");
      if (saved) {
        setAdminData(JSON.parse(saved));
      } else {
        setAdminData({ name: "Admin", avatar: "" });
      }
    };

    loadAdmin();

    // 🔹 Listen for changes triggered by Settings.jsx or login page
    window.addEventListener("storage", loadAdmin);
    return () => window.removeEventListener("storage", loadAdmin);
  }, [location]);

  // 🔹 Handlers for Help and Logout
  const handleHelp = () => navigate("/help");

  const handleLogout = () => {
    if (adminData?.name) {
      sessionStorage.setItem("justLoggedOutUser", adminData.name);
    }
    localStorage.removeItem("admin");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // 🔹 Initial letter fallback if no avatar
  const userInitial =
    adminData?.name && adminData.name.trim() !== ""
      ? adminData.name.trim().charAt(0).toUpperCase()
      : "A";

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 p-6 flex flex-col">
      {/* --- Top Admin Info --- */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          {adminData.avatar ? (
            <img
              src={adminData.avatar}
              alt={adminData.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-700"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-lg font-bold">
              {userInitial}
            </div>
          )}
          <div>
            <h2 className="text-sm font-semibold">
              {adminData.name || "Admin"}
            </h2>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
      </div>

      {/* --- Sidebar Navigation Links --- */}
      <nav className="flex-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `block py-3 px-3 rounded mb-1 text-sm transition-colors ${
                isActive
                  ? "bg-slate-800 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {it.label}
          </NavLink>
        ))}
      </nav>

      {/* --- Bottom Section --- */}
      <div className="mt-6 border-t border-slate-800 pt-4">
        <button
          onClick={handleHelp}
          className="text-sm text-slate-400 block mb-3 hover:text-slate-200 transition"
        >
          Help
        </button>
        <button
          onClick={handleLogout}
          className="text-sm text-rose-400 hover:text-rose-300 transition"
        >
          Logout Account
        </button>
      </div>
    </aside>
  );
}
