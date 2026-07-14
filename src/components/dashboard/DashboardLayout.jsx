import { useState } from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  LayoutDashboard,
  CalendarCheck,
  Activity,
  Settings,
  FileText,
  Plus,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "../../hooks/useTheme.js";

export default function DashboardLayout() {
  const { isLoaded, isSignedIn } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-main)] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="animate-scheduler-pulse">
            <circle cx="16" cy="16" r="12" stroke="var(--color-green-strong)" strokeWidth="2" />
            <circle cx="16" cy="16" r="3" fill="var(--color-green-signal)" />
          </svg>
          <span className="text-sm text-[var(--color-text-secondary)]">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  const navItems = [
    { path: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
    { path: "/dashboard/jobs", label: "Jobs", icon: CalendarCheck },
    { path: "/dashboard/executions", label: "Executions", icon: Activity },
    { path: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-main)] flex">
      {/* Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-[var(--color-border)] bg-[var(--color-bg-elevated)] transition-all ${
          collapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-[var(--color-border)]">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="shrink-0">
              <circle cx="16" cy="16" r="12" stroke="var(--color-green-strong)" strokeWidth="2" />
              <circle cx="16" cy="16" r="3" fill="var(--color-green-signal)" />
              <path d="M16 10v6l3.5 2" stroke="var(--color-green-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {!collapsed && <span className="text-sm font-semibold text-[var(--color-text-main)]">crondom</span>}
          </Link>
        </div>

        {/* New Job button */}
        <div className="p-3">
          <Link
            to="/dashboard/jobs/new"
            className={`flex items-center gap-2 px-3 py-2 bg-[var(--color-text-main)] text-[var(--color-bg-main)] rounded-xl hover:opacity-90 transition-all text-sm font-medium ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <Plus size={16} />
            {!collapsed && "New Job"}
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                  isActive(item)
                    ? "bg-[var(--color-green-strong)]/5 text-[var(--color-green-strong)] font-medium"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)]"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} />
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-[var(--color-border)] p-3 space-y-1">
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)] transition-all ${
              collapsed ? "justify-center" : ""
            }`}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            {!collapsed && (theme === "light" ? "Dark mode" : "Light mode")}
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)] transition-all"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)] flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--color-text-muted)]">
              {navItems.find((n) => isActive(n))?.label || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--color-green-strong)]/5 text-xs text-[var(--color-green-strong)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-green-signal)] animate-scheduler-pulse" />
              Operational
            </div>
            <button className="p-2 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] hover:bg-[var(--color-bg-secondary)] transition-all">
              <User size={16} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
