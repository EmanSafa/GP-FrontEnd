import { useEffect } from 'react';
import { useWafBlockStore } from '@/store/wafBlockStore';
import { AccessDeniedDetails } from './AccessDeniedDetails';

export function AccessDeniedPage() {
  const block = useWafBlockStore((state) => state.block);
  const clearBlock = useWafBlockStore((state) => state.clearBlock);

  useEffect(() => {
    if (!block) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') clearBlock();
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [block, clearBlock]);

  if (!block) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black p-4 sm:p-8"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="waf-access-denied-title"
    >
      <div
        className="w-full max-w-3xl rounded-2xl border-2 border-dotted border-[#ff0033] px-6 py-10 text-center shadow-[0_0_28px_rgba(255,0,51,0.45)] sm:px-14 sm:py-14"
        style={{
          boxShadow: '0 0 28px rgba(255, 0, 51, 0.45), inset 0 0 24px rgba(255, 0, 51, 0.08)',
        }}
      >
        <h1
          id="waf-access-denied-title"
          className="font-mono text-4xl font-bold tracking-widest text-[#ff0033] drop-shadow-[0_0_12px_rgba(255,0,51,0.7)] sm:text-5xl"
        >
          ACCESS DENIED
        </h1>

        <div className="mx-auto mt-6 inline-block bg-[#ff0033] px-4 py-2 sm:px-6">
          <p className="font-mono text-xs font-bold tracking-wide text-black uppercase sm:text-sm">
            SECURITY THREAT DETECTED BY AI-WAF
          </p>
        </div>

        <div className="mx-auto max-w-md text-left">
          <AccessDeniedDetails block={block} />
        </div>

        <button
          type="button"
          onClick={clearBlock}
          className="mt-10 font-mono text-xs tracking-widest text-[#ff0033]/underline-offset-4 hover:underline"
        >
          [ ACKNOWLEDGE ]
        </button>
      </div>
    </div>
  );
}
