import { createFileRoute, Link } from "@tanstack/react-router";
import { useDetection } from "@/hooks/useDeepShield";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustScoreBadge } from "@/components/deepshield/TrustScoreBadge";
import { RiskIndicator } from "@/components/deepshield/RiskIndicator";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/deepshield/States";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, ExternalLink, ThumbsUp, ThumbsDown } from "lucide-react";

export const Route = createFileRoute("/dashboard/detections/$id")({
  head: () => ({ meta: [{ title: "Detection — DeepShield" }] }),
  component: DetectionDetail,
});

function DetectionDetail() {
  const { id } = Route.useParams();
  const { data, isLoading, isError } = useDetection(id);

  return (
    <div className="space-y-6">
      <Link
        to="/dashboard/detections"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to detections
      </Link>

      {isLoading ? (
        <Card className="border-border/70 shadow-card">
          <CardContent className="p-6"><LoadingSkeleton rows={6} /></CardContent>
        </Card>
      ) : isError ? (
        <ErrorState description="We couldn't load this detection. The backend may not be connected yet." />
      ) : !data ? (
        <EmptyState title="Detection not found" />
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="border-border/70 shadow-card lg:col-span-2">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle className="truncate text-base">{data.domain}</CardTitle>
                <TrustScoreBadge score={data.trustScore} size="lg" />
              </div>
              <a
                href={data.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 truncate text-xs text-muted-foreground hover:text-foreground"
              >
                {data.url} <ExternalLink className="h-3 w-3" />
              </a>
              <div className="text-xs text-muted-foreground">
                Analyzed {new Date(data.timestamp).toLocaleString()}
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <RiskIndicator label="AI Probability" value={data.aiProbability} />
                <RiskIndicator label="Source Reputation" value={data.sourceReputation} />
                <RiskIndicator label="Scam Risk" value={data.scamRisk} />
                <RiskIndicator label="Phishing Risk" value={data.phishingRisk} />
              </div>

              <div>
                <h3 className="text-sm font-semibold">Why this was flagged</h3>
                {data.reasons && data.reasons.length > 0 ? (
                  <Accordion type="multiple" className="mt-2">
                    {data.reasons.map((r, i) => (
                      <AccordionItem key={i} value={`r-${i}`}>
                        <AccordionTrigger className="text-sm">{r.title}</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                          {r.detail}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <EmptyState title="No explanation available yet" className="mt-3" />
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-border/70 shadow-card">
              <CardHeader><CardTitle className="text-base">Trusted alternatives</CardTitle></CardHeader>
              <CardContent>
                {data.alternatives && data.alternatives.length > 0 ? (
                  <ul className="space-y-3">
                    {data.alternatives.map((a) => (
                      <li key={a.id} className="rounded-lg border border-border p-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium">{a.title}</div>
                            <div className="truncate text-xs text-muted-foreground">{a.domain}</div>
                          </div>
                          <TrustScoreBadge score={a.trustScore} size="sm" />
                        </div>
                        <Button asChild size="sm" variant="outline" className="mt-2 w-full">
                          <a href={a.url} target="_blank" rel="noreferrer">Open link</a>
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState title="No alternatives suggested" />
                )}
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-card">
              <CardHeader><CardTitle className="text-base">Community</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {data.community ? (
                  <>
                    <RiskIndicator label="Agree" value={data.community.agree} />
                    <RiskIndicator label="Disagree" value={data.community.disagree} />
                    <p className="text-xs text-muted-foreground">
                      {data.community.feedbackCount} community responses
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">No community data yet.</p>
                )}
                <div className="flex gap-2 pt-1">
                  <Button size="sm" variant="outline" className="flex-1">
                    <ThumbsUp className="mr-1.5 h-3.5 w-3.5" /> Accurate
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <ThumbsDown className="mr-1.5 h-3.5 w-3.5" /> False positive
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
