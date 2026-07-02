import { useQuery } from "@tanstack/react-query";
import { DeepShieldAPI } from "@/lib/api/deepshield";

const NO_RETRY = { retry: false, staleTime: 30_000 } as const;

export const useOverview = () =>
  useQuery({ queryKey: ["overview"], queryFn: DeepShieldAPI.getOverview, ...NO_RETRY });

export const useAnalytics = () =>
  useQuery({ queryKey: ["analytics"], queryFn: DeepShieldAPI.getAnalytics, ...NO_RETRY });

export const useDetections = (filters?: Record<string, string>) =>
  useQuery({
    queryKey: ["detections", filters ?? {}],
    queryFn: () => DeepShieldAPI.listDetections(filters),
    ...NO_RETRY,
  });

export const useDetection = (id: string | undefined) =>
  useQuery({
    queryKey: ["detection", id],
    queryFn: () => DeepShieldAPI.getDetection(id!),
    enabled: !!id,
    ...NO_RETRY,
  });

export const useAlternatives = () =>
  useQuery({
    queryKey: ["alternatives"],
    queryFn: DeepShieldAPI.listAlternatives,
    ...NO_RETRY,
  });

export const useSettings = () =>
  useQuery({ queryKey: ["settings"], queryFn: DeepShieldAPI.getSettings, ...NO_RETRY });
