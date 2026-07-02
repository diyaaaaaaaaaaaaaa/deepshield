import { motion } from "motion/react";
import { Lock, MoreHorizontal, ArrowLeft, ArrowRight, RotateCw } from "lucide-react";

export function HeroDemoCard() {
  return (
    <div className="relative">
      <div className="absolute -left-px top-12 hidden h-px w-24 bg-border lg:block" />
      <div className="border border-border bg-card">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2">
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full border border-border" />
            <span className="h-2.5 w-2.5 rounded-full border border-border" />
            <span className="h-2.5 w-2.5 rounded-full border border-border" />
          </div>
          <div className="ml-2 flex items-center gap-1 text-muted-foreground">
            <ArrowLeft className="h-3.5 w-3.5" />
            <ArrowRight className="h-3.5 w-3.5 opacity-40" />
            <RotateCw className="h-3.5 w-3.5" />
          </div>
          <div className="ml-1 flex flex-1 items-center gap-1.5 border border-border bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground">
            <Lock className="h-3 w-3" />
            <span className="truncate">news.example.com/article/breaking</span>
          </div>
          <div className="flex items-center gap-1">
            <DeepShieldChip />
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Page body */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 border-b border-border p-6 md:col-span-8 md:border-b-0 md:border-r">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              The Daily Wire · 4 min read
            </div>
            <h3 className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight">
              Breaking: anonymous source claims sweeping market shift overnight
            </h3>
            <div className="mt-4 space-y-2">
              <div className="h-2 w-full bg-muted" />
              <div className="h-2 w-[92%] bg-muted" />
              <div className="h-2 w-[78%] bg-muted" />
            </div>
            <div className="mt-5 flex items-center gap-2 border border-destructive/40 bg-destructive/[0.04] px-3 py-2">
              <span className="h-1.5 w-1.5 bg-destructive" />
              <span className="text-[12px] text-foreground">
                DeepShield flagged this page · likely AI-generated · unverified source
              </span>
            </div>
          </div>

          {/* Side panel - extension popup attached */}
          <div className="col-span-12 bg-background p-5 md:col-span-4">
            <div className="flex items-center justify-between">
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Page analysis
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">live</span>
            </div>

            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-semibold tracking-tight tabular-nums">23</span>
                <span className="text-xs text-muted-foreground">/ 100 trust</span>
              </div>
              <div className="mt-3 h-px w-full bg-border">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "23%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-px bg-destructive"
                />
              </div>
            </div>

            <dl className="mt-5 divide-y divide-border border-y border-border text-[12px]">
              <Row k="AI text probability" v="87%" tone="danger" />
              <Row k="Source reputation" v="Low" tone="danger" />
              <Row k="Phishing signals" v="None" tone="ok" />
              <Row k="Community reports" v="14" tone="warn" />
            </dl>

            <button className="mt-5 w-full border border-foreground bg-foreground px-3 py-2 text-[12px] font-medium text-background">
              View full report →
            </button>
          </div>
        </div>
      </div>

      <p className="mt-3 font-mono text-[11px] text-muted-foreground">
        ↑ Live preview · the extension renders inside every page you read
      </p>
    </div>
  );
}

function DeepShieldChip() {
  return (
    <span className="inline-flex items-center gap-1.5 border border-destructive/40 bg-destructive/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-destructive">
      <span className="h-1.5 w-1.5 bg-destructive" /> 23
    </span>
  );
}

function Row({ k, v, tone }: { k: string; v: string; tone: "ok" | "warn" | "danger" }) {
  const dot = tone === "ok" ? "bg-success" : tone === "warn" ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
        <span className={`h-1.5 w-1.5 ${dot}`} />
        {v}
      </span>
    </div>
  );
}
