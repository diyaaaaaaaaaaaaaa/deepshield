import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingNav, MarketingFooter } from "@/components/deepshield/MarketingNav";
import { HeroDemoCard } from "@/components/deepshield/HeroDemoCard";
import { motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeepShield — A trust layer for the open internet" },
      {
        name: "description",
        content:
          "DeepShield is a privacy-first browser extension and dashboard that surfaces AI-generated, deceptive, and unsafe content in real time.",
      },
      { property: "og:title", content: "DeepShield — A trust layer for the open internet" },
      {
        property: "og:description",
        content:
          "Detect AI-generated content, scams, and phishing while you browse — without giving up your privacy.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <span className="h-1.5 w-1.5 bg-[var(--accent-purple)]" />
                Trust infrastructure · v0.4 beta
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] text-foreground md:text-[68px]"
              >
                Read the web with{" "}
                <span className="italic text-[var(--accent-purple)]" style={{ fontFamily: "Inter Tight" }}>
                  certainty.
                </span>
              </motion.h1>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:text-base">
                DeepShield is a browser-native trust layer. It detects AI-generated content,
                phishing pages, and manipulative sources as you read — quietly, on-device, with
                a transparent score you can audit.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/extension"
                  className="inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2.5 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90"
                >
                  Install for Chrome
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
                >
                  View the dashboard
                </Link>
                <span className="font-mono text-[11px] text-muted-foreground">
                  Chrome · Arc · Brave · Edge
                </span>
              </div>
            </div>
            <div className="lg:col-span-5" />
          </div>

          <div className="mt-16">
            <HeroDemoCard />
          </div>
        </div>
      </section>

      {/* Trusted by / logos strip */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 px-6 py-6">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            Built with researchers from
          </div>
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-muted-foreground/70">
            <span className="font-display text-base">Stanford HAI</span>
            <span className="font-display text-base">MIT Media Lab</span>
            <span className="font-display text-base">EFF</span>
            <span className="font-display text-base">Mozilla</span>
            <span className="font-display text-base">Internet Archive</span>
          </div>
        </div>
      </section>

      {/* Editorial product sections */}
      <ProductSection
        eyebrow="01 — Detection"
        title="Four signals, one transparent score."
        body="Every page is evaluated by independent models for AI authorship, source reputation, scam patterns, and phishing intent. The score is explainable down to the sentence — nothing is hidden behind a black box."
        bullets={[
          "Token-level AI text classifier with calibrated confidence",
          "Synthetic image and deepfake detection on visible media",
          "Lookalike-domain and credential-harvest heuristics",
          "Real-time signals aggregated from the community",
        ]}
        visual={<DetectionVisual />}
      />

      <ProductSection
        reverse
        eyebrow="02 — Privacy"
        title="Your reading history stays on your machine."
        body="DeepShield runs detection locally where the model permits, and sends only opaque content hashes when it can't. There is no profile, no ad ID, no third-party SDK. You can audit every outbound request from the extension itself."
        bullets={[
          "On-device inference for text classification",
          "Zero-knowledge hashes for server-assisted checks",
          "Open-source extension, reproducible builds",
          "SOC 2 Type II in progress",
        ]}
        visual={<PrivacyVisual />}
      />

      <ProductSection
        eyebrow="03 — Dashboard"
        title="An archive of what you almost believed."
        body="Every flagged page is recorded to your private dashboard. Review the evidence, see how the score was assembled, and follow vetted alternatives when a source isn't holding up."
        bullets={[
          "Detection history with full evidence trail",
          "Trend analytics across domains and topics",
          "Curated trusted alternatives for risky sources",
          "Shareable reports for newsrooms and researchers",
        ]}
        visual={<DashboardVisual />}
      />

      {/* How it works */}
      <section id="how" className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                The pipeline
              </div>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                From raw page to <br />explained decision.
              </h2>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                Five steps run on every page you open. Latency stays under 200ms because most of
                the work happens in your browser.
              </p>
            </div>
            <ol className="md:col-span-8">
              {[
                ["Capture", "The extension reads visible DOM, metadata, and provenance signals."],
                ["Classify", "Independent models inspect text, images, and links in isolation."],
                ["Fuse", "A calibrated scorer combines signals into a single trust value."],
                ["Surface", "Inline indicators appear in-page without interrupting flow."],
                ["Archive", "Decisions are recorded to your dashboard for later audit."],
              ].map(([title, desc], i) => (
                <li key={title} className="grid grid-cols-[80px_1fr] gap-6 border-t border-border py-6 last:border-b">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-display text-lg font-semibold tracking-tight">{title}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-border bg-background">
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <div className="mb-12 max-w-2xl">
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Pricing</div>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Free during beta. <span className="text-muted-foreground">Honest after.</span>
            </h2>
          </div>
          <div className="grid border border-border md:grid-cols-3">
            {[
              {
                name: "Personal",
                price: "Free",
                note: "For everyone, indefinitely.",
                features: ["All detection models", "Browser extension", "Personal dashboard", "Community signals"],
                cta: "Install extension",
              },
              {
                name: "Pro",
                price: "$8",
                period: "/ month",
                note: "For researchers and journalists.",
                features: ["Advanced analytics", "Priority models", "Custom thresholds", "Exportable reports"],
                cta: "Start free trial",
                accent: true,
              },
              {
                name: "Team",
                price: "Custom",
                note: "Newsrooms, classrooms, enterprises.",
                features: ["SSO + roles", "Shared policies", "Audit logs", "Dedicated support"],
                cta: "Talk to us",
              },
            ].map((p, i) => (
              <div
                key={p.name}
                className={
                  "relative flex flex-col p-7 " +
                  (i < 2 ? "md:border-r border-border " : "") +
                  (p.accent ? "bg-muted/40" : "")
                }
              >
                {p.accent && (
                  <span className="absolute right-5 top-5 font-mono text-[10px] uppercase tracking-widest text-[var(--accent-purple)]">
                    Recommended
                  </span>
                )}
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{p.name}</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold tracking-tight">{p.price}</span>
                  {p.period && <span className="text-sm text-muted-foreground">{p.period}</span>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.note}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-foreground" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/auth/signup"
                  className={
                    "mt-8 inline-flex items-center justify-center px-4 py-2.5 text-[13px] font-medium transition-colors " +
                    (p.accent
                      ? "border border-foreground bg-foreground text-background hover:bg-foreground/90"
                      : "border border-border bg-background text-foreground hover:bg-muted")
                  }
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing statement */}
      <section className="border-b border-border bg-foreground text-background">
        <div className="mx-auto max-w-[1200px] px-6 py-24">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <div className="font-mono text-[11px] uppercase tracking-widest text-background/60">
                Our mission
              </div>
              <p className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                Helping you navigate an internet where not everything is what it seems.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                to="/extension"
                className="inline-flex items-center gap-2 border border-background bg-background px-4 py-2.5 text-[13px] font-medium text-foreground transition-opacity hover:opacity-90"
              >
                Install DeepShield <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}

function ProductSection({
  eyebrow,
  title,
  body,
  bullets,
  visual,
  reverse,
}: {
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <section id="product" className="border-b border-border bg-background">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-6 py-24 md:grid-cols-12 md:gap-16">
        <div className={"md:col-span-5 " + (reverse ? "md:order-2" : "")}>
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{eyebrow}</div>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight md:text-[40px]">
            {title}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
          <ul className="mt-6 space-y-2.5 text-sm">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5 border-t border-border pt-2.5 first:border-t-0 first:pt-0">
                <span className="mt-1.5 h-1 w-1 bg-foreground" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={"md:col-span-7 " + (reverse ? "md:order-1" : "")}>{visual}</div>
      </div>
    </section>
  );
}

function DetectionVisual() {
  const rows = [
    { label: "AI text probability", val: 87, tone: "danger" },
    { label: "Synthetic image score", val: 64, tone: "warn" },
    { label: "Source reputation", val: 22, tone: "danger" },
    { label: "Phishing signals", val: 4, tone: "ok" },
  ] as const;
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          signal breakdown
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">news.example.com</span>
      </div>
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[1fr_120px_56px] items-center gap-4 px-5 py-4">
            <span className="text-sm">{r.label}</span>
            <div className="h-px bg-border">
              <div
                className={
                  "h-px " +
                  (r.tone === "danger" ? "bg-destructive" : r.tone === "warn" ? "bg-warning" : "bg-success")
                }
                style={{ width: `${r.val}%` }}
              />
            </div>
            <span className="text-right font-mono text-xs tabular-nums">{r.val}%</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 border-t border-border">
        <div className="border-r border-border p-5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Trust score</div>
          <div className="mt-1 font-display text-3xl font-semibold tabular-nums">23</div>
        </div>
        <div className="p-5">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Verdict</div>
          <div className="mt-1 font-display text-sm font-semibold text-destructive">Likely AI-generated</div>
        </div>
      </div>
    </div>
  );
}

function PrivacyVisual() {
  return (
    <div className="border border-border bg-card">
      <div className="border-b border-border px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        outbound network · last 60s
      </div>
      <div className="grid-lines p-6">
        <pre className="overflow-x-auto font-mono text-[12px] leading-6 text-foreground">
{`POST  api.deepshield.io/v1/hash      200  18ms
GET   api.deepshield.io/v1/reputation 200  42ms
—     telemetry                       —    disabled
—     analytics                       —    disabled
—     third-party cookies             —    blocked`}
        </pre>
      </div>
      <div className="grid grid-cols-3 border-t border-border text-center">
        {[
          ["0", "trackers"],
          ["0", "PII fields"],
          ["100%", "on-device"],
        ].map(([n, l]) => (
          <div key={l} className="border-r border-border p-4 last:border-r-0">
            <div className="font-display text-2xl font-semibold tabular-nums">{n}</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardVisual() {
  const items = [
    ["09:42", "news.example.com", "23", "danger"],
    ["09:18", "blog.medium-source.io", "61", "warn"],
    ["08:55", "research.stanford.edu", "94", "ok"],
    ["08:31", "shop-deal-now.xyz", "8", "danger"],
    ["07:12", "nytimes.com", "91", "ok"],
  ] as const;
  return (
    <div className="border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          detection log
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">today</span>
      </div>
      <table className="w-full text-sm">
        <tbody>
          {items.map(([t, url, score, tone]) => (
            <tr key={t} className="border-b border-border last:border-b-0">
              <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{t}</td>
              <td className="px-2 py-3 truncate">{url}</td>
              <td className="px-5 py-3 text-right">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs">
                  <span
                    className={
                      "h-1.5 w-1.5 " +
                      (tone === "ok" ? "bg-success" : tone === "warn" ? "bg-warning" : "bg-destructive")
                    }
                  />
                  {score}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
