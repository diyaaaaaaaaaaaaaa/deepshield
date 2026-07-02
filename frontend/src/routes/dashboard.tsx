import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/deepshield/Logo";
import {
  LayoutDashboard,
  Search,
  BarChart3,
  ShieldCheck,
  Users,
  Settings as SettingsIcon,
  UserCircle2,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — DeepShield" },
      { name: "description", content: "Your personal trust and safety dashboard." },
    ],
  }),
  component: DashboardLayout,
});

const items = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/detections", label: "Detections", icon: Search },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/alternatives", label: "Trusted Alternatives", icon: ShieldCheck },
  { to: "/dashboard/community", label: "Community Reports", icon: Users },
  { to: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
  { to: "/dashboard/profile", label: "Profile", icon: UserCircle2 },
];

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-muted/30">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-border/60 bg-sidebar p-4 md:flex">
          <div className="px-2 py-2">
            <Logo />
          </div>
          <nav className="mt-6 flex flex-col gap-0.5" aria-label="Dashboard">
            {items.map((it) => {
              const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
              return (
                <Link
                  key={it.to}
                  to={it.to}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                  )}
                >
                  <it.icon className="h-4 w-4" />
                  {it.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto rounded-xl border border-border/70 bg-card p-4 text-xs">
            <p className="font-medium text-foreground">Get the extension</p>
            <p className="mt-1 text-muted-foreground">
              Real-time protection while you browse.
            </p>
            <Button asChild size="sm" className="mt-3 w-full">
              <Link to="/extension">Install</Link>
            </Button>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border/60 bg-background/80 px-4 backdrop-blur md:px-8">
            <div className="md:hidden">
              <Logo />
            </div>
            <div className="hidden flex-1 md:block">
              <div className="relative max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search detections, domains…"
                  className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:ring-2 focus:ring-ring/40"
                />
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-primary-foreground">
                DS
              </div>
            </div>
          </header>

          <div className="px-4 py-6 md:px-8 md:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
