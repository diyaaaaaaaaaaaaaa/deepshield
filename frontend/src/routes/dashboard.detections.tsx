import { createFileRoute, Link } from "@tanstack/react-router";
import { useDetections } from "@/hooks/useDeepShield";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrustScoreBadge } from "@/components/deepshield/TrustScoreBadge";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/deepshield/States";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/detections")({
  head: () => ({ meta: [{ title: "Detections — DeepShield" }] }),
  component: Detections,
});

function Detections() {
  const [risk, setRisk] = useState("all");
  const [type, setType] = useState("all");
  const [q, setQ] = useState("");

  const filters: Record<string, string> = {};
  if (risk !== "all") filters.risk = risk;
  if (type !== "all") filters.type = type;
  if (q) filters.q = q;

  const { data, isLoading, isError } = useDetections(filters);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Detections</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every page DeepShield has analyzed across your session history.
        </p>
      </div>

      <Card className="border-border/70 shadow-card">
        <CardContent className="space-y-4 p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search domain or URL"
                className="pl-9"
              />
            </div>
            <Select value={risk} onValueChange={setRisk}>
              <SelectTrigger><SelectValue placeholder="Risk level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All risk levels</SelectItem>
                <SelectItem value="safe">Safe</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="danger">Danger</SelectItem>
              </SelectContent>
            </Select>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue placeholder="Content type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All content types</SelectItem>
                <SelectItem value="article">Article</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="post">Post</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="30">
              <SelectTrigger><SelectValue placeholder="Date range" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <LoadingSkeleton rows={6} />
          ) : isError ? (
            <ErrorState />
          ) : !data || data.length === 0 ? (
            <EmptyState
              title="No detections found"
              description="Try adjusting your filters, or browse the web with the extension installed to begin seeing detections."
            />
          ) : (
            <div className="overflow-hidden rounded-xl border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">AI Probability</TableHead>
                    <TableHead>Trust</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="text-muted-foreground">
                        {new Date(d.timestamp).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{d.domain}</TableCell>
                      <TableCell className="capitalize text-muted-foreground">{d.contentType}</TableCell>
                      <TableCell className="text-right tabular-nums">{Math.round(d.aiProbability)}%</TableCell>
                      <TableCell><TrustScoreBadge score={d.trustScore} size="sm" /></TableCell>
                      <TableCell className="capitalize text-muted-foreground">{d.status}</TableCell>
                      <TableCell className="text-right">
                        <Link
                          to="/dashboard/detections/$id"
                          params={{ id: d.id }}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
