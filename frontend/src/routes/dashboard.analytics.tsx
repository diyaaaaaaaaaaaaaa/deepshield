import { createFileRoute } from "@tanstack/react-router";
import { useAnalytics } from "@/hooks/useDeepShield";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/deepshield/States";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — DeepShield" }] }),
  component: Analytics,
});

const palette = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function ChartShell({
  title,
  loading,
  error,
  empty,
  children,
}: {
  title: string;
  loading: boolean;
  error: boolean;
  empty: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-border/70 shadow-card">
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent className="h-72">
        {loading ? (
          <LoadingSkeleton rows={5} />
        ) : error ? (
          <ErrorState />
        ) : empty ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height="100%">{children as any}</ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

function Analytics() {
  const { data, isLoading, isError } = useAnalytics();

  const series = data?.aiOverTime ?? [];
  const categories = data?.categories ?? [];
  const trust = data?.trustDistribution ?? [];
  const domains = data?.topDomains ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Trends across the content you've encountered.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartShell
          title="AI content encounters over time"
          loading={isLoading}
          error={isError}
          empty={series.length === 0}
        >
          <AreaChart data={series}>
            <defs>
              <linearGradient id="ai" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
            <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-chart-1)"
              fill="url(#ai)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartShell>

        <ChartShell
          title="Detection categories"
          loading={isLoading}
          error={isError}
          empty={categories.length === 0}
        >
          <PieChart>
            <Pie data={categories} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
              {categories.map((_, i) => (
                <Cell key={i} fill={palette[i % palette.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartShell>

        <ChartShell
          title="Trust score distribution"
          loading={isLoading}
          error={isError}
          empty={trust.length === 0}
        >
          <BarChart data={trust}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
            <YAxis tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
            <Tooltip />
            <Bar dataKey="value" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ChartShell>

        <ChartShell
          title="Most flagged domains"
          loading={isLoading}
          error={isError}
          empty={domains.length === 0}
        >
          <BarChart data={domains} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis type="number" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" />
            <YAxis dataKey="domain" type="category" tick={{ fontSize: 11 }} stroke="var(--color-muted-foreground)" width={120} />
            <Tooltip />
            <Bar dataKey="count" fill="var(--color-chart-1)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ChartShell>
      </div>
    </div>
  );
}
