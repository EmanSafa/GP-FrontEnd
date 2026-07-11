import type { WafBlockedResponse } from '@/types/waf.types';

interface AccessDeniedDetailsProps {
  block: WafBlockedResponse;
}

function formatConfidence(confidence: number | undefined): string {
  if (typeof confidence !== 'number') return 'N/A';
  return `${confidence.toFixed(2)}%`;
}

function formatThreatType(attackType: string | undefined): string {
  if (!attackType) return 'UNKNOWN (Pattern Verified)';
  return `${attackType.toUpperCase()} (Pattern Verified)`;
}

export function AccessDeniedDetails({ block }: AccessDeniedDetailsProps) {
  const status = block.blocked ? 'BLOCKED BY PROXY GATEWAY' : 'THREAT FLAGGED BY AI-WAF';

  const rows = [
    { label: 'STATUS', value: status },
    { label: 'THREAT TYPE', value: formatThreatType(block.attack_type) },
    { label: 'CONFIDENCE', value: formatConfidence(block.confidence) },
    { label: 'COUNTERMEASURE', value: 'Connection Dropped Formally' },
  ];

  return (
    <dl className="mt-8 space-y-2 font-mono text-sm tracking-wide text-[#cccccc] sm:text-base">
      {rows.map((row) => (
        <div key={row.label} className="flex gap-2">
          <dt className="shrink-0 uppercase">{row.label}:</dt>
          <dd className="uppercase">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
