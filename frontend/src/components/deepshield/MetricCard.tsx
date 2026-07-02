import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

type Props = {
  label: string;
  value: number | null | undefined;
  icon: LucideIcon;
  isLoading?: boolean;
  isError?: boolean;
  hint?: string;
  className?: string;
};

export function MetricCard({
  label,
  value,
  icon: Icon,
  isLoading,
  isError,
  hint,
  className,
}: Props) {
  const display = isLoading
    ? "Loading..."
    : isError || value === null || value === undefined
      ? "No data available yet"
      : new Intl.NumberFormat().format(value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden border-border/70 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elegant",
          className,
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {label}
              </p>
              <p
                className={cn(
                  "text-2xl font-semibold tracking-tight text-foreground",
                  (isError || value === null || value === undefined) &&
                    "text-sm font-medium text-muted-foreground",
                )}
              >
                {display}
              </p>
              {hint && (
                <p className="text-xs text-muted-foreground">{hint}</p>
              )}
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
              <Icon className="h-5 w-5" />
            </div>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
