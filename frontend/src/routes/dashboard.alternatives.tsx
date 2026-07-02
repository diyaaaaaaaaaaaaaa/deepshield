import { createFileRoute } from "@tanstack/react-router";
import { useAlternatives } from "@/hooks/useDeepShield";
import { Card, CardContent } from "@/components/ui/card";
import { TrustScoreBadge } from "@/components/deepshield/TrustScoreBadge";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/deepshield/States";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/dashboard/alternatives")({
  head: () => ({ meta: [{ title: "Trusted Alternatives — DeepShield" }] }),
  component: Alternatives,
});

function Alternatives() {
  const { data, isLoading, isError } = useAlternatives();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Trusted alternatives</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Vetted sources surfaced when DeepShield flags risky content.
        </p>
      </div>
      {isLoading ? (
        <Card className="border-border/70 shadow-card"><CardContent className="p-6"><LoadingSkeleton rows={5} /></CardContent></Card>
      ) : isError ? (
        <ErrorState />
      ) : !data || data.length === 0 ? (
        <EmptyState
          title="No alternatives yet"
          description="When DeepShield flags a page, suggested trusted sources will show up here."
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {data.map((a) => (
            <Card key={a.id} className="border-border/70 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{a.title}</div>
                    <div className="truncate text-xs text-muted-foreground">{a.domain}</div>
                  </div>
                  <TrustScoreBadge score={a.trustScore} size="sm" />
                </div>
                <Button asChild variant="outline" size="sm" className="mt-4 w-full">
                  <a href={a.url} target="_blank" rel="noreferrer">
                    Open link <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
