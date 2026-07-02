import { cn } from "@/lib/utils";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

type Props = {
  score: number | null | undefined;
  size?: "sm" | "md" | "lg";
  className?: string;
};

function tier(score: number) {
  if (score >= 75) return { label: "Trusted", tone: "success", Icon: ShieldCheck };
  if (score >= 45) return { label: "Mixed", tone: "warning", Icon: ShieldAlert };
  return { label: "Risky", tone: "danger", Icon: ShieldX };
}

export function TrustScoreBadge({ score, size = "md", className }: Props) {
  if (score === null || score === undefined) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground",
          className,
        )}
      >
        — No data
      </span>
    );
  }
  const t = tier(score);
  const palette =
    t.tone === "success"
      ? "bg-success/10 text-success border-success/20"
      : t.tone === "warning"
        ? "bg-warning/15 text-warning-foreground border-warning/30"
        : "bg-destructive/10 text-destructive border-destructive/20";
  const sizing =
    size === "lg"
      ? "px-3.5 py-1.5 text-sm"
      : size === "sm"
        ? "px-2 py-0.5 text-[11px]"
        : "px-2.5 py-1 text-xs";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium",
        palette,
        sizing,
        className,
      )}
    >
      <t.Icon className="h-3.5 w-3.5" aria-hidden />
      {t.label} · {Math.round(score)}
    </span>
  );
}
