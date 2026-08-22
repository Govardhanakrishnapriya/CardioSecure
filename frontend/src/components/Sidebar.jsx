import { NavLink, useNavigate } from "react-router-dom";

import {
  HeartPulse,
  LayoutDashboard,
  Activity,
  Brain,
  BarChart3,
  ShieldCheck,
  History,
  Info,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";


const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Prediction",
    path: "/prediction",
    icon: Activity,
  },
  {
    label: "Explainable AI",
    path: "/explainability",
    icon: Brain,
  },
  {
    label: "Model Performance",
    path: "/models",
    icon: BarChart3,
  },
  {
    label: "Prediction History",
    path: "/history",
    icon: History,
  },
];


const bottomItems = [
  {
    label: "About Project",
    path: "/about",
    icon: Info,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];


export default function Sidebar({
  collapsed = false,
  mobileOpen = false,
  onClose,
  onToggle,
}) {

  const navigate = useNavigate();

  const { logout } = useAuth();


  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      )}


      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen
          bg-slate-950 text-white
          border-r border-slate-800
          transition-all duration-300
          flex flex-col

          ${collapsed ? "lg:w-[84px]" : "lg:w-[270px]"}

          ${
            mobileOpen
              ? "translate-x-0 w-[270px]"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Logo */}
        <div
          className={`
            h-[78px] flex items-center
            border-b border-slate-800
            px-5
            ${collapsed ? "lg:justify-center" : ""}
          `}
        >

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 flex-shrink-0">

              <HeartPulse size={22} />

            </div>


            {!collapsed && (
              <div>

                <h1 className="font-bold text-lg tracking-tight">
                  CardioSecure
                </h1>

                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  AI Healthcare
                </p>

              </div>
            )}

          </div>

        </div>


        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-6">

          {!collapsed && (
            <p className="px-3 mb-3 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
              Workspace
            </p>
          )}


          <div className="space-y-1">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  title={collapsed ? item.label : ""}
                  className={({ isActive }) => `
                    group flex items-center gap-3
                    px-3 py-3 rounded-xl
                    text-sm font-medium
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/10"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }

                    ${collapsed ? "lg:justify-center" : ""}
                  `}
                >

                  <Icon
                    size={19}
                    className="flex-shrink-0"
                  />

                  {!collapsed && (
                    <span>{item.label}</span>
                  )}

                </NavLink>
              );

            })}

          </div>


          {!collapsed && (
            <p className="px-3 mt-8 mb-3 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">
              System
            </p>
          )}


          <div className="space-y-1">

            {bottomItems.map((item) => {

              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  title={collapsed ? item.label : ""}
                  className={({ isActive }) => `
                    group flex items-center gap-3
                    px-3 py-3 rounded-xl
                    text-sm font-medium
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-cyan-500 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-900"
                    }

                    ${collapsed ? "lg:justify-center" : ""}
                  `}
                >

                  <Icon size={19} />

                  {!collapsed && (
                    <span>{item.label}</span>
                  )}

                </NavLink>
              );

            })}

          </div>

        </nav>


        {/* Research badge */}
        {!collapsed && (
          <div className="mx-4 mb-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">

            <div className="flex items-center gap-2 mb-2">

              <ShieldCheck
                size={16}
                className="text-cyan-400"
              />

              <span className="text-xs font-semibold">
                AI Research System
              </span>

            </div>

            <p className="text-[11px] leading-5 text-slate-500">
              AI-powered cardiovascular risk prediction
              for research and decision support.
            </p>

          </div>
        )}


        {/* Logout */}
        <div className="p-3 border-t border-slate-800">

          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : ""}
            className={`
              w-full flex items-center gap-3
              px-3 py-3 rounded-xl
              text-sm font-medium
              text-slate-400
              hover:text-red-400
              hover:bg-red-500/10
              transition
              ${collapsed ? "lg:justify-center" : ""}
            `}
          >

            <LogOut size={19} />

            {!collapsed && (
              <span>Logout</span>
            )}

          </button>

        </div>


        {/* Collapse button */}
        <button
          onClick={onToggle}
          className="
            hidden lg:flex
            absolute -right-3 top-[88px]
            w-6 h-6
            rounded-full
            bg-white
            text-slate-700
            border border-slate-200
            shadow-md
            items-center justify-center
            hover:bg-slate-50
          "
        >

          {collapsed ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}

        </button>

      </aside>
    </>
  );
}