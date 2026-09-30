'use client';

import React from 'react';
import { Activity, Cpu } from 'lucide-react';
import { PipelineStageState } from '@/lib/api/types';

interface PipelineDetailPanelProps {
  currentStage: PipelineStageState | null;
  overallProgress: number;
}

export function PipelineDetailPanel({
  currentStage,
  overallProgress,
}: PipelineDetailPanelProps) {
  if (!currentStage) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/30 via-[#0e111a] to-[#0c0e17] p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400">
            <Cpu className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
                Active Pipeline Stage {currentStage.number}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-semibold text-indigo-300 border border-indigo-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping" />
                Processing
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">
              {currentStage.label}
            </h3>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-[#1c2130] pt-2 sm:pt-0">
          <span className="text-[11px] text-slate-400">Total Completion</span>
          <span className="font-mono text-lg font-extrabold text-white">
            {overallProgress}%
          </span>
        </div>
      </div>

      <p className="text-sm text-slate-300 leading-relaxed max-w-2xl bg-[#090b11]/80 rounded-xl p-3 border border-[#1b2030]">
        &ldquo;{currentStage.detail || 'Executing automated video synthesis...'}&rdquo;
      </p>

      {/* Stage Progress Bar */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-indigo-400" />
            <span>Autonomous Pipeline Progression</span>
          </span>
          <span className="font-mono font-medium text-slate-300">
            {overallProgress} / 100%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#181d2a] p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-emerald-400 transition-all duration-300 ease-out"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
