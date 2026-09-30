'use client';

import React from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  Check,
  X
} from 'lucide-react';
import { QualityCheckStatus } from '@/lib/api/types';

interface BroadcastQualityCheckProps {
  qualityStatus: QualityCheckStatus;
}

export function BroadcastQualityCheck({ qualityStatus }: BroadcastQualityCheckProps) {
  // Use qualityStatus from GenerationResult directly
  const { score, checks, passed, readyForPublishing } = qualityStatus;

  // Determine overall status
  const allPassed = passed && readyForPublishing && checks.every(c => c.passed);
  const statusLabel = allPassed ? 'READY TO PUBLISH' : 'NEEDS ATTENTION';

  // Standard checklist mapping fallback if check items require friendly labeling
  const displayChecks = checks.map(c => {
    let friendlyLabel = c.label;
    if (c.id === 'qc-video') friendlyLabel = 'Video generated';
    else if (c.id === 'qc-audio') friendlyLabel = 'Audio generated';
    else if (c.id === 'qc-captions') friendlyLabel = 'Captions generated';
    else if (c.id === 'qc-scenes') friendlyLabel = 'All scenes completed';
    else if (c.id === 'qc-duration') friendlyLabel = 'Duration valid';
    else if (c.id === 'qc-ready') friendlyLabel = 'Broadcast compliance';

    return {
      ...c,
      displayLabel: friendlyLabel,
    };
  });

  return (
    <div className="rounded-2xl border border-[#1e2230] bg-[#0d1017] p-6 space-y-6 shadow-xl">
      {/* Header with Title and Overall Status Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1b2030] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Broadcast Quality Check
            </h2>
            <p className="text-xs text-slate-400">
              Automated compliance and broadcast verification audit
            </p>
          </div>
        </div>

        {/* Status Pill & Score */}
        <div className="flex items-center gap-3">
          {/* Score Box */}
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-2xl font-black text-white">{score}</span>
              <span className="text-xs text-slate-500 font-semibold">/ 100</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
              Broadcast Grade
            </span>
          </div>

          {/* Readiness Badge */}
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold border shadow-sm ${
              allPassed
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}
          >
            {allPassed ? (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{statusLabel}</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
                <span>{statusLabel}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Individual Checks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {displayChecks.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl border p-3.5 transition flex items-start gap-3 ${
              item.passed
                ? 'border-[#1b2030] bg-[#111420]/70 hover:border-emerald-500/30'
                : 'border-red-500/30 bg-red-950/10'
            }`}
          >
            <div
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                item.passed
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {item.passed ? (
                <Check className="h-3 w-3 stroke-[2.5]" />
              ) : (
                <X className="h-3 w-3 stroke-[2.5]" />
              )}
            </div>

            <div className="space-y-0.5 min-w-0">
              <span className="text-xs font-semibold text-slate-200 block truncate">
                {item.displayLabel}
              </span>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Feedback Footer */}
      {!allPassed && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 flex items-center gap-3 text-xs text-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
          <span>
            Some broadcast parameters require attention before publishing can be completed.
          </span>
        </div>
      )}
    </div>
  );
}
