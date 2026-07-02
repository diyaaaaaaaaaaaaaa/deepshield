import { createFileRoute } from "@tanstack/react-router";
import { MetricCard } from "@/components/deepshield/MetricCard";
import { useOverview, useDetections } from "@/hooks/useDeepShield";
import {
  FileText,
  Bot,
  Link as LinkIcon,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { EmptyState, LoadingSkeleton } from "@/components/deepshield/States";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustScoreBadge } from "@/components/deepshield/TrustScoreBadge";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Overview — DeepShield" }] }),
  component: Overview,
});

function Overview() {
  const overview = useOverview();
  const recent = useDetections();

  const data = overview.data;
  const cards = [
    { key: "articlesScanned", label: "Articles Scanned", icon: FileText, value: data?.articlesScanned ?? null },
    { key: "aiDetected", label: "AI Content Detected", icon: Bot, value: data?.aiDetected ?? null },
    { key: "suspiciousLinks", label: "Suspicious Links Found", icon: LinkIcon, value: data?.suspiciousLinks ?? null },
    { key: "scams", label: "Potential Scams Detected", icon: AlertTriangle, value: data?.scams ?? null },
    { key: "alternativesOpened", label: "Trusted Alternatives Opened", icon: ShieldCheck, value: data?.alternativesOpened ?? null },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A real-time snapshot of what DeepShield has surfaced for you.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((c) => (
          <MetricCard
            key={c.key}
            label={c.label}
            value={c.value}
            icon={c.icon}
            isLoading={overview.isLoading}
            isError={overview.isError}
          />
        ))}
      </div>

      <Card className="border-border/70 shadow-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent detections</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.isLoading ? (
            <LoadingSkeleton rows={4} />
          ) : recent.isError || !recent.data || recent.data.length === 0 ? (
            <EmptyState
              title="No detections yet"
              description="Once the extension starts seeing content, your most recent items will appear here."
            />
          ) : (
            <ul className="divide-y divide-border">
              {recent.data.slice(0, 6).map((d) => (
                <li key={d.id} className="flex items-center justify-between py-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{d.domain}</div>
                    <div className="truncate text-xs text-muted-foreground">{d.url}</div>
                  </div>
                  <TrustScoreBadge score={d.trustScore} />
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
