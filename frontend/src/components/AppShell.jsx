import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppShell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <div
        className={`
          min-h-screen transition-all duration-300
          ${collapsed ? "lg:pl-[84px]" : "lg:pl-[270px]"}
        `}
      >

        <Navbar
          onMenuClick={() => setMobileOpen(true)}
          darkMode={darkMode}
          onToggleTheme={() => setDarkMode(!darkMode)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1700px] mx-auto">
          {children}
        </main>

      </div>
    </div>
  );
}