import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  title = "No data available yet",
  description,
  icon,
  action,
  className,
}: {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center",
        className,
      )}
    >
      <div className="mb-3 grid h-11 w-11 place-items-center rounded-full bg-background text-muted-foreground shadow-soft">
        {icon ?? <Inbox className="h-5 w-5" />}
      </div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = "Couldn't load data",
  description = "We'll retry automatically. Check your connection or try again later.",
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border border-destructive/20 bg-destructive/5 px-5 py-4 text-sm",
        className,
      )}
    >
      <div className="font-semibold text-destructive">{title}</div>
      <p className="mt-1 text-destructive/80">{description}</p>
    </div>
  );
}

export function LoadingSkeleton({
  rows = 3,
  className,
}: {
  rows?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-4 w-full animate-pulse rounded-md bg-muted"
          style={{ width: `${85 - i * 8}%` }}
        />
      ))}
    </div>
  );
}
