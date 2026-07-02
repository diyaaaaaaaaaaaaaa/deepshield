import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, withText = true }: { className?: string; withText?: boolean }) {
  return (
    <Link
      to="/"
      className={cn("inline-flex items-center gap-2 font-display text-[15px] font-semibold tracking-tight", className)}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        aria-hidden
        className="text-foreground"
      >
        <path
          d="M9 1L1.5 4v5.5C1.5 13.2 4.7 16.2 9 17c4.3-.8 7.5-3.8 7.5-7.5V4L9 1z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M9 1v16" stroke="var(--accent-purple)" strokeWidth="1.4" />
      </svg>
      {withText && <span>DeepShield</span>}
    </Link>
  );
}
