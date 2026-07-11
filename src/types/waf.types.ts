export interface WafBlockedResponse {
  success?: boolean;
  blocked?: boolean;
  attack_type?: string;
  confidence?: number;
  detection_method?: string;
  message?: string;
}

export function isWafBlockedResponse(data: unknown): data is WafBlockedResponse {
  if (!data || typeof data !== 'object') return false;
  const payload = data as Record<string, unknown>;
  return payload.blocked === true || payload.detection_method === 'ai_model';
}
