import { Link, Outlet, useNavigate } from "@tanstack/react-router";
import { hasPermission } from "@pulseboard/shared-core";
import { WorkspaceSwitcher } from "../features/workspace/WorkspaceSwitcher";
import { useSessionStore } from "../store/sessionStore";
import { useEffect, useState } from "react";

const navItems = [
  { to: "/overview", label: "Overview", permission: "overview.view" as const },
  { to: "/users", label: "Users", permission: "users.view" as const },
  { to: "/reports", label: "Reports", permission: "reports.view" as const },
  { to: "/settings", label: "Settings", permission: "settings.view" as const },
];

export function AppShellLayout() {
  const navigate = useNavigate();
  const session = useSessionStore((s) => s.session);
  const setSession = useSessionStore((s) => s.setSession);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <p className="text-sm font-semibold">PulseBoard</p>
        <div className="flex items-center gap-3">
          <button className="rounded-md bg-slate-800 px-2 py-1 text-xs" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <span className="rounded-full bg-indigo-600 px-2 py-1 text-xs">3 notifications</span>
          <WorkspaceSwitcher />
          <button
            className="rounded-md bg-slate-800 px-3 py-1 text-sm"
            onClick={() => {
              setSession(null);
              navigate({ to: "/login" });
            }}
          >
            Sign out
          </button>
        </div>
      </header>
      <div className="grid gap-4 px-4 py-4 md:grid-cols-[220px_1fr]">
        <aside className="space-y-2">
          {navItems
            .filter((item) => hasPermission(session.role, item.permission))
            .map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block rounded-md bg-slate-900 px-3 py-2 text-sm hover:bg-slate-800"
              >
                {item.label}
              </Link>
            ))}
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
