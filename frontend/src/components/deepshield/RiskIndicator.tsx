import { cn } from "@/lib/utils";

type Props = {
  value: number | null | undefined;
  label?: string;
  className?: string;
};

export function RiskIndicator({ value, label = "Risk", className }: Props) {
  if (value === null || value === undefined) {
    return (
      <div className={cn("text-xs text-muted-foreground", className)}>
        {label}: No data
      </div>
    );
  }
  const pct = Math.max(0, Math.min(100, value));
  const tone =
    pct >= 70 ? "bg-destructive" : pct >= 40 ? "bg-warning" : "bg-success";
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums text-foreground">
          {Math.round(pct)}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-all", tone)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

