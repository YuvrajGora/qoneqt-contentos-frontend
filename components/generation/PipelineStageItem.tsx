'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import { PipelineStageState } from '@/lib/api/types';

interface PipelineStageItemProps {
  stage: PipelineStageState;
  isActive: boolean;
  isCompleted: boolean;
  isPending: boolean;
  isFailed: boolean;
}

export function PipelineStageItem({
  stage,
  isActive,
  isCompleted,
  isPending,
  isFailed,
}: PipelineStageItemProps) {
  return (
    <div
      className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all duration-200 ${
        isActive
          ? 'border-indigo-500/70 bg-gradient-to-r from-indigo-950/40 via-[#101424] to-[#0d101d] shadow-md shadow-indigo-500/10'
          : isCompleted
          ? 'border-emerald-500/20 bg-[#0d1218]/60 hover:bg-[#0f151e]'
          : isFailed
          ? 'border-red-500/40 bg-red-950/20'
          : 'border-[#1b2030] bg-[#0c0e15]/40 opacity-70 hover:opacity-90'
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Status Indicator Icon */}
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
          {isCompleted ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          ) : isActive ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/20 border border-indigo-500/50 text-indigo-400">
              <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
            </div>
          ) : isFailed ? (
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/20 border border-red-500/50 text-red-400">
              <AlertCircle className="h-4 w-4" />
            </div>
          ) : (
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-700/60 text-slate-600">
              <Circle className="h-3.5 w-3.5" />
            </div>
          )}
        </div>

        {/* Stage Number & Title */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`font-mono text-xs font-semibold ${
                isActive ? 'text-indigo-400' : isCompleted ? 'text-emerald-400' : 'text-slate-500'
              }`}
            >
              {stage.number}
            </span>
            <span
              className={`text-sm font-semibold truncate ${
                isActive ? 'text-white font-bold' : isCompleted ? 'text-slate-200' : 'text-slate-400'
              }`}
            >
              {stage.label}
            </span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
            {stage.detail}
          </p>
        </div>
      </div>

      {/* Status Pill on the Right */}
      <div className="shrink-0 ml-3">
        {isCompleted && (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
            ✓ Done
          </span>
        )}
        {isActive && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/15 px-2 py-0.5 text-[11px] font-semibold text-indigo-300 border border-indigo-500/40">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-ping" />
            Active
          </span>
        )}
        {isPending && (
          <span className="text-[11px] text-slate-600 font-medium">
            Queued
          </span>
        )}
        {isFailed && (
          <span className="inline-flex items-center rounded-md bg-red-500/10 px-2 py-0.5 text-[11px] font-medium text-red-400 border border-red-500/20">
            Failed
          </span>
        )}
      </div>
    </div>
  );
}
