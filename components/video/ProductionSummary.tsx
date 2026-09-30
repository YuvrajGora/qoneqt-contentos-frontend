'use client';

import React from 'react';
import { Check, Workflow } from 'lucide-react';

export function ProductionSummary() {
  const stages = [
    { label: 'Story', passed: true },
    { label: 'Storyboard', passed: true },
    { label: 'Visuals', passed: true },
    { label: 'Voice', passed: true },
    { label: 'Captions', passed: true },
    { label: 'Video', passed: true },
    { label: 'Quality', passed: true },
  ];

  return (
    <div className="rounded-2xl border border-[#1e2230] bg-[#0d1017] p-5 space-y-3.5 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Workflow className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Content Pipeline
          </span>
        </div>
        <span className="text-[11px] font-medium text-emerald-400">
          7 of 7 Stages Validated
        </span>
      </div>

      {/* Ribbon of Pipeline Stages */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 text-xs font-semibold text-emerald-300 shadow-sm"
          >
            <Check className="h-3 w-3 text-emerald-400 stroke-[2.5]" />
            <span>{stage.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
