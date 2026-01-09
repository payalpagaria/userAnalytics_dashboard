import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const navItems = [
  { path: "/", icon: "📈", label: "Dashboard" },
  { path: "/sessions", icon: "📋", label: "Sessions" },
  { path: "/heatmap", icon: "🗺️", label: "Heatmap" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">📊</div>
        <span className="brand">CausalFunnel</span>
      </div>

      <nav className="nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-btn ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
