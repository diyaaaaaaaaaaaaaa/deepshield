import { createFileRoute } from "@tanstack/react-router";
import { useDetections } from "@/hooks/useDeepShield";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState, ErrorState, LoadingSkeleton } from "@/components/deepshield/States";
import { Button } from "@/components/ui/button";
import { ThumbsDown, ThumbsUp, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/dashboard/community")({
  head: () => ({ meta: [{ title: "Community — DeepShield" }] }),
  component: Community,
});

function Community() {
  const { data, isLoading, isError } = useDetections({ community: "true" });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Community reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Help refine DeepShield by reviewing recent detections.
        </p>
      </div>

      {isLoading ? (
        <LoadingSkeleton rows={4} />
      ) : isError ? (
        <ErrorState />
      ) : !data || data.length === 0 ? (
        <EmptyState
          title="No reports to review"
          description="Once detections come in, you can vote on whether they were accurate."
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {data.map((d) => (
            <Card key={d.id} className="border-border/70 shadow-card">
              <CardHeader>
                <CardTitle className="truncate text-base">{d.domain}</CardTitle>
                <p className="truncate text-xs text-muted-foreground">{d.url}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg bg-success/10 py-2">
                    <div className="font-semibold text-success">
                      {d.community ? `${d.community.agree}%` : "—"}
                    </div>
                    <div className="text-muted-foreground">Agree</div>
                  </div>
                  <div className="rounded-lg bg-destructive/10 py-2">
                    <div className="font-semibold text-destructive">
                      {d.community ? `${d.community.disagree}%` : "—"}
                    </div>
                    <div className="text-muted-foreground">Disagree</div>
                  </div>
                  <div className="rounded-lg bg-muted py-2">
                    <div className="font-semibold">{d.community?.feedbackCount ?? "—"}</div>
                    <div className="text-muted-foreground">Responses</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline"><ThumbsUp className="mr-1.5 h-3.5 w-3.5" />Accurate</Button>
                  <Button size="sm" variant="outline"><ThumbsDown className="mr-1.5 h-3.5 w-3.5" />False positive</Button>
                  <Button size="sm" variant="ghost"><MessageSquare className="mr-1.5 h-3.5 w-3.5" />Feedback</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
