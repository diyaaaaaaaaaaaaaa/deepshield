import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/deepshield/Logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/#product", label: "Product" },
  { to: "/#how", label: "How it works" },
  { to: "/#pricing", label: "Pricing" },
  { to: "/dashboard", label: "Dashboard" },
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="hidden items-center gap-1 md:flex">
          <Link
            to="/auth/signin"
            className="px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            to="/extension"
            className="border border-foreground bg-foreground px-3.5 py-1.5 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Install extension
          </Link>
        </div>
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-[1200px] flex-col px-6 py-3">
            {links.map((l) => (
              <a
                key={l.to}
                href={l.to}
                className="py-2.5 text-sm text-foreground/80"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Link to="/auth/signin" className="flex-1 border border-border px-3 py-2 text-center text-[13px]">
                Sign in
              </Link>
              <Link
                to="/extension"
                className="flex-1 border border-foreground bg-foreground px-3 py-2 text-center text-[13px] text-background"
              >
                Install extension
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A trust layer for the open internet. Built for people who read carefully.
            </p>
          </div>
          <div>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Product</div>
            <ul className="space-y-2 text-sm">
              <li><a href="/#product" className="hover:text-foreground text-muted-foreground">Detection</a></li>
              <li><a href="/extension" className="hover:text-foreground text-muted-foreground">Extension</a></li>
              <li><a href="/dashboard" className="hover:text-foreground text-muted-foreground">Dashboard</a></li>
              <li><a href="/#pricing" className="hover:text-foreground text-muted-foreground">Pricing</a></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Company</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-foreground text-muted-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground text-muted-foreground">Terms</a></li>
              <li><a href="#" className="hover:text-foreground text-muted-foreground">Security</a></li>
              <li><a href="#" className="hover:text-foreground text-muted-foreground">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} DeepShield, Inc.</p>
          <p className="font-mono">v0.4.2 · build {new Date().toISOString().slice(0, 10)}</p>
        </div>
      </div>
    </footer>
  );
}
