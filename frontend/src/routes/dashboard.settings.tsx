import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useDeepShield";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { UserSettings } from "@/lib/api/deepshield";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — DeepShield" }] }),
  component: Settings,
});

const DEFAULTS: UserSettings = {
  threshold: 70,
  detectionTypes: {
    aiText: true,
    aiImage: true,
    scam: true,
    phishing: true,
    sourceReputation: true,
    community: true,
  },
  displayMode: "standard",
  notifications: { browser: true, email: false, weekly: true },
};

function Settings() {
  const { data, isLoading } = useSettings();
  const [s, setS] = useState<UserSettings>(DEFAULTS);

  useEffect(() => {
    if (data) setS(data);
  }, [data]);

  const save = () => {
    toast.success("Settings saved", {
      description: "Preferences will sync once the backend is connected.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Tune how DeepShield analyzes and alerts. {isLoading && "Loading…"}
        </p>
      </div>

      <Card className="border-border/70 shadow-card">
        <CardHeader><CardTitle className="text-base">Detection threshold</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current threshold</span>
            <span className="font-semibold tabular-nums">{s.threshold}%</span>
          </div>
          <Slider
            value={[s.threshold]}
            min={0}
            max={100}
            step={1}
            onValueChange={(v) => setS({ ...s, threshold: v[0] })}
          />
          <p className="text-xs text-muted-foreground">
            DeepShield will warn on content scoring at or above this AI / risk probability.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/70 shadow-card">
        <CardHeader><CardTitle className="text-base">Detection types</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ["aiText", "AI Text Detection"],
              ["aiImage", "AI Image Detection"],
              ["scam", "Scam Detection"],
              ["phishing", "Phishing Detection"],
              ["sourceReputation", "Source Reputation Analysis"],
              ["community", "Community Signals"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 rounded-lg border border-border p-3">
              <Checkbox
                checked={s.detectionTypes[key]}
                onCheckedChange={(v) =>
                  setS({ ...s, detectionTypes: { ...s.detectionTypes, [key]: !!v } })
                }
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/70 shadow-card">
        <CardHeader><CardTitle className="text-base">Display preferences</CardTitle></CardHeader>
        <CardContent>
          <RadioGroup
            value={s.displayMode}
            onValueChange={(v) => setS({ ...s, displayMode: v as UserSettings["displayMode"] })}
            className="grid gap-2 sm:grid-cols-3"
          >
            {(["minimal", "standard", "detailed"] as const).map((m) => (
              <label key={m} className="flex items-center gap-2 rounded-lg border border-border p-3">
                <RadioGroupItem value={m} id={`dm-${m}`} />
                <Label htmlFor={`dm-${m}`} className="capitalize">{m}</Label>
              </label>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="border-border/70 shadow-card">
        <CardHeader><CardTitle className="text-base">Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {(
            [
              ["browser", "Browser notifications"],
              ["email", "Email alerts"],
              ["weekly", "Weekly digest reports"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="text-sm">{label}</span>
              <Switch
                checked={s.notifications[key]}
                onCheckedChange={(v) =>
                  setS({ ...s, notifications: { ...s.notifications, [key]: v } })
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={save} className="shadow-elegant">Save changes</Button>
      </div>
    </div>
  );
}
