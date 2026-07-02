// Centralized API layer for DeepShield.
// All endpoints are placeholders — wire to real backend later.
// Functions return typed promises; queries currently return empty data
// so the UI renders proper loading/empty states with no fabricated values.

export type Detection = {
  id: string;
  domain: string;
  url: string;
  timestamp: string;
  contentType: "article" | "image" | "video" | "post" | "email";
  aiProbability: number; // 0-100
  trustScore: number; // 0-100
  scamRisk: number;
  phishingRisk: number;
  sourceReputation: number;
  status: "safe" | "warning" | "danger";
  reasons?: { title: string; detail: string }[];
  alternatives?: AlternativeSource[];
  community?: { agree: number; disagree: number; feedbackCount: number };
};

export type AlternativeSource = {
  id: string;
  title: string;
  domain: string;
  url: string;
  trustScore: number;
};

export type OverviewMetric = {
  key: string;
  label: string;
  value: number | null;
};

export type DashboardOverview = {
  articlesScanned: number | null;
  aiDetected: number | null;
  suspiciousLinks: number | null;
  scams: number | null;
  alternativesOpened: number | null;
};

export type TimeSeriesPoint = { date: string; value: number };
export type CategoryBreakdown = { name: string; value: number };
export type DomainFlagged = { domain: string; count: number };

export type AnalyticsData = {
  aiOverTime: TimeSeriesPoint[];
  categories: CategoryBreakdown[];
  trustDistribution: CategoryBreakdown[];
  topDomains: DomainFlagged[];
};

export type UserSettings = {
  threshold: number;
  detectionTypes: {
    aiText: boolean;
    aiImage: boolean;
    scam: boolean;
    phishing: boolean;
    sourceReputation: boolean;
    community: boolean;
  };
  displayMode: "minimal" | "standard" | "detailed";
  notifications: {
    browser: boolean;
    email: boolean;
    weekly: boolean;
  };
};

const API_BASE = import.meta.env.VITE_DEEPSHIELD_API_URL ?? "";

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE) {
    // No backend wired yet — surface a typed "not connected" signal so the
    // UI can render empty/loading states rather than fabricated values.
    throw new Error("NO_BACKEND");
  }
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return (await res.json()) as T;
}

export const DeepShieldAPI = {
  getOverview: () => apiFetch<DashboardOverview>("/dashboard/overview"),
  getAnalytics: () => apiFetch<AnalyticsData>("/dashboard/analytics"),
  listDetections: (params?: Record<string, string>) =>
    apiFetch<Detection[]>(
      `/detections${params ? `?${new URLSearchParams(params).toString()}` : ""}`,
    ),
  getDetection: (id: string) => apiFetch<Detection>(`/detections/${id}`),
  listAlternatives: () => apiFetch<AlternativeSource[]>("/alternatives"),
  getSettings: () => apiFetch<UserSettings>("/settings"),
  updateSettings: (patch: Partial<UserSettings>) =>
    apiFetch<UserSettings>("/settings", {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),
  submitFeedback: (detectionId: string, vote: "agree" | "disagree", note?: string) =>
    apiFetch<{ ok: true }>(`/detections/${detectionId}/feedback`, {
      method: "POST",
      body: JSON.stringify({ vote, note }),
    }),
};
