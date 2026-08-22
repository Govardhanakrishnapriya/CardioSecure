import {
  Menu,
  Bell,
  Search,
  Sun,
  Moon,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Navbar({
  onMenuClick,
  darkMode,
  onToggleTheme,
}) {
  const { user } = useAuth();

  return (
    <header className="h-[78px] bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-3 w-[300px] lg:w-[380px] px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200">

          <Search
            size={17}
            className="text-slate-400"
          />

          <input
            type="text"
            placeholder="Search dashboard..."
            className="bg-transparent outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
          />

          <span className="text-[10px] text-slate-400 border border-slate-200 rounded px-1.5 py-1">
            Ctrl K
          </span>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Privacy status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100">

          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

          <ShieldCheck
            size={15}
            className="text-emerald-600"
          />

          <span className="text-xs font-semibold text-emerald-700">
            Privacy Active
          </span>

        </div>

        {/* Theme */}
        <button
          onClick={onToggleTheme}
          className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition"
        >
          {darkMode ? (
            <Sun size={18} />
          ) : (
            <Moon size={18} />
          )}
        </button>

        {/* Notifications */}
        <button className="relative w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition">

          <Bell size={18} />

          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-cyan-500 border-2 border-white" />

        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-2 sm:pl-3 sm:border-l border-slate-200">

          <div className="hidden sm:block text-right">

            <p className="text-sm font-semibold text-slate-800">
              {user?.name || "Research User"}
            </p>

            <p className="text-[11px] text-slate-400">
              {user?.role || "Researcher"}
            </p>

          </div>

          <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center font-semibold text-sm">
            {(user?.name || "R")
              .charAt(0)
              .toUpperCase()}
          </div>

        </div>

      </div>

    </header>
  );
}