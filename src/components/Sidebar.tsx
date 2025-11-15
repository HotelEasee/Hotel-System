import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

interface AdminData {
  name: string;
  avatar: string;
}

const items = [
  { to: "/admin", label: "Dashboard" },
  { to: "/guests", label: "Guest List" },
  { to: "/rooms", label: "Room List" },
  { to: "/employees", label: "Employee List" },
  { to: "/settings", label: "Settings" },
  { to: "/profile", label: "Profile" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [adminData, setAdminData] = useState<AdminData>(() => {
    const saved = localStorage.getItem("admin");
    return saved ? JSON.parse(saved) : { name: "Admin", avatar: "" };
  });

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

    window.addEventListener("storage", loadAdmin);
    return () => window.removeEventListener("storage", loadAdmin);
  }, [location]);

  const handleHelp = () => navigate("/help");

  const handleLogout = () => {
    if (adminData?.name) {
      sessionStorage.setItem("justLoggedOutUser", adminData.name);
    }
    localStorage.removeItem("admin");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const userInitial =
    adminData?.name && adminData.name.trim() !== ""
      ? adminData.name.trim().charAt(0).toUpperCase()
      : "A";

  return (
    <aside className="sidebar">
      {/* Top Admin Info */}
      <div className="admin-info">
        <div className="admin-profile">
          {adminData.avatar ? (
            <img
              src={adminData.avatar}
              alt={adminData.name}
              className="admin-avatar"
            />
          ) : (
            <div className="admin-initial">{userInitial}</div>
          )}
          <div>
            <h2 className="admin-name">{adminData.name || "Admin"}</h2>
            <p className="admin-role">Administrator</p>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation Links */}
      <nav className="nav-links">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
            style={{color: "#fff"}}
          >
            {it.label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="bottom-section">
        <button onClick={handleHelp} className="btn help-button">
          Help
        </button>
        <button onClick={handleLogout} className="btn logout-button">
          Logout Account
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
