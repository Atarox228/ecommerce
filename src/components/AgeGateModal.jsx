import { useEffect, useRef } from 'react';

function AgeGateModal({
  badge,
  title,
  description,
  adultPrompt,
  adultAction,
  minorPrompt,
  minorAction,
  onAdultAccess,
  onMinorAccess,
}) {
  const adultButtonRef = useRef(null);

  useEffect(() => {
    adultButtonRef.current?.focus();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 p-6 text-white shadow-[0_30px_80px_rgba(15,23,42,0.55)] sm:p-8"
      >
        <div className="mb-6 space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80">{badge}</p>
          <h2 id="age-gate-title" className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="text-sm leading-6 text-slate-300 sm:text-base">{description}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            ref={adultButtonRef}
            type="button"
            className="group rounded-2xl border border-emerald-400/25 bg-emerald-400 px-4 py-4 text-left text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            onClick={onAdultAccess}
          >
            <span className="block text-sm font-semibold uppercase tracking-wide text-slate-700">{adultPrompt}</span>
            <span className="mt-1 block text-2xl font-black tracking-tight">{adultAction}</span>
          </button>

          <button
            type="button"
            className="group rounded-2xl border border-rose-400/25 bg-rose-500 px-4 py-4 text-left text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-rose-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            onClick={onMinorAccess}
          >
            <span className="block text-sm font-semibold uppercase tracking-wide text-rose-100/90">{minorPrompt}</span>
            <span className="mt-1 block text-2xl font-black tracking-tight">{minorAction}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgeGateModal;