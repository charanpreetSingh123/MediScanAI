import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Upload, Users, FileText, BarChart2, Clock
} from "lucide-react";

const doctorLinks = [
  { to: "#dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "#upload", icon: <Upload size={18} />, label: "Upload Scan" },
  { to: "#patients", icon: <Users size={18} />, label: "Patients" },
  { to: "#reports", icon: <FileText size={18} />, label: "Reports" },
  { to: "#analytics", icon: <BarChart2 size={18} />, label: "Analytics" },
];

const patientLinks = [
  { to: "#dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "#upload", icon: <Upload size={18} />, label: "Upload Scan" },
  { to: "#history", icon: <Clock size={18} />, label: "Scan History" },
];

const Sidebar = ({ role, active, setActive }) => {
  const links = role === "doctor" ? doctorLinks : patientLinks;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-4 flex flex-col gap-1">
      {links.map((link) => (
        <button
          key={link.label}
          onClick={() => setActive(link.label)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition w-full text-left
            ${active === link.label
              ? "bg-blue-50 text-blue-600"
              : "text-slate-600 hover:bg-slate-50"
            }`}
        >
          {link.icon}
          {link.label}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;