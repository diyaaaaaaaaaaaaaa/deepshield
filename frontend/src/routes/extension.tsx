import { createFileRoute, Link } from "@tanstack/react-router";
import { Logo } from "@/components/deepshield/Logo";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Settings, ChevronRight, Pin } from "lucide-react";

export const Route = createFileRoute("/extension")({
  head: () => ({ meta: [{ title: "Extension popup — DeepShield" }] }),
  component: ExtensionDemo,
});

function ExtensionDemo() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-dvh bg-muted/40">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              The extension
            </div>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              A real browser surface. Not a marketing mockup.
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              The popup lives in your toolbar and renders the same evidence you see in the
              dashboard — score, signals, source verdict, and links to vetted alternatives.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2.5 text-[13px] font-medium text-background"
              >
                Add to Chrome
              </a>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 text-[13px] font-medium text-foreground hover:bg-muted"
              >
                Open dashboard <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-2 border border-border bg-card">
              {[
                ["Manifest", "v3"],
                ["Permissions", "activeTab"],
                ["Inference", "on-device"],
                ["Size", "1.4 MB"],
              ].map(([k, v], i) => (
                <div
                  key={k}
                  className={
                    "p-4 " +
                    (i % 2 === 0 ? "border-r " : "") +
                    (i < 2 ? "border-b " : "") +
                    "border-border"
                  }
                >
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="mt-1 font-display text-base">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:col-span-7">
            {/* Toolbar mock */}
            <div className="ml-auto w-full max-w-[440px]">
              <div className="relative">
                <div className="flex items-center justify-end gap-1 border-b border-border bg-background px-3 py-2">
                  <div className="mr-auto flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                    <span className="h-2 w-2 rounded-full border border-border" />
                    <span className="h-2 w-2 rounded-full border border-border" />
                    <span className="h-2 w-2 rounded-full border border-border" />
                  </div>
                  <div className="flex items-center gap-1.5 border border-border bg-muted px-1.5 py-0.5">
                    <Pin className="h-3 w-3 text-muted-foreground" />
                    <span className="font-mono text-[10px] text-muted-foreground">extensions</span>
                  </div>
                  <span className="ml-1 inline-flex items-center gap-1 border border-destructive/40 bg-destructive/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-destructive">
                    <span className="h-1.5 w-1.5 bg-destructive" /> 23
                  </span>
                </div>

                {/* Pointer */}
                <div className="absolute right-[18px] top-[34px] h-2 w-2 rotate-45 border-l border-t border-border bg-background" />

                {/* Popup */}
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-1 w-[400px] border border-border bg-background"
                  role="dialog"
                  aria-label="DeepShield extension popup"
                >
                  <header className="flex items-center justify-between border-b border-border px-4 py-3">
                    <Logo />
                    <button aria-label="Settings" className="text-muted-foreground hover:text-foreground">
                      <Settings className="h-4 w-4" />
                    </button>
                  </header>

                  <div className="px-4 pt-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Current page
                    </div>
                    <div className="mt-1 truncate font-mono text-[12px]">news.example.com/article/breaking</div>
                  </div>

                  {loading ? (
                    <div className="m-4 border border-border bg-muted/40 px-4 py-6 text-center font-mono text-[11px] text-muted-foreground">
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse bg-[var(--accent-purple)]" />
                      analyzing page…
                    </div>
                  ) : (
                    <>
                      <div className="border-t border-border px-4 pb-4 pt-4">
                        <div className="flex items-baseline justify-between">
                          <div>
                            <div className="font-display text-4xl font-semibold tabular-nums leading-none">23</div>
                            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                              trust score · 0–100
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1.5 border border-destructive/40 bg-destructive/[0.06] px-2 py-1 font-mono text-[10px] text-destructive">
                            <span className="h-1.5 w-1.5 bg-destructive" />
                            high risk
                          </span>
                        </div>
                        <div className="mt-3 h-px w-full bg-border">
                          <div className="h-px bg-destructive" style={{ width: "23%" }} />
                        </div>
                      </div>

                      <dl className="divide-y divide-border border-t border-border px-4 text-[12px]">
                        <Row k="AI text probability" v="87%" tone="danger" />
                        <Row k="Synthetic media" v="64%" tone="warn" />
                        <Row k="Source reputation" v="Low" tone="danger" />
                        <Row k="Phishing signals" v="None" tone="ok" />
                        <Row k="Community reports" v="14" tone="warn" />
                      </dl>

                      <div className="grid grid-cols-2 border-t border-border">
                        <button className="border-r border-border px-3 py-2.5 text-[12px] hover:bg-muted">
                          Trusted alternatives
                        </button>
                        <button className="px-3 py-2.5 text-[12px] hover:bg-muted">
                          Full report
                        </button>
                      </div>
                      <button className="block w-full border-t border-border bg-foreground px-3 py-2.5 text-[12px] font-medium text-background">
                        Continue to page →
                      </button>
                    </>
                  )}

                  <footer className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[10px] text-muted-foreground">
                    <span>on-device · v0.4.2</span>
                    <Link to="/dashboard" className="hover:text-foreground">
                      open dashboard ↗
                    </Link>
                  </footer>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Link to="/" className="font-mono text-[11px] text-muted-foreground hover:text-foreground">
            ← back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, tone }: { k: string; v: string; tone: "ok" | "warn" | "danger" }) {
  const dot = tone === "ok" ? "bg-success" : tone === "warn" ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="text-muted-foreground">{k}</span>
      <span className="inline-flex items-center gap-1.5 font-medium">
        <span className={`h-1.5 w-1.5 ${dot}`} />
        {v}
      </span>
    </div>
  );
}
