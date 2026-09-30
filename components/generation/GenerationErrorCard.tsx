'use client';

import React from 'react';
import { AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react';

interface GenerationErrorCardProps {
  error: string;
  onRetry: () => void;
  onBackToStudio: () => void;
}

export function GenerationErrorCard({
  error,
  onRetry,
  onBackToStudio,
}: GenerationErrorCardProps) {
  return (
    <div className="rounded-2xl border border-red-500/40 bg-gradient-to-b from-red-950/20 via-[#100d11] to-[#0a0a0f] p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            Generation couldn&apos;t be completed.
          </h2>
          <p className="text-xs text-red-300 mt-1">
            One of the pipeline stages failed. You can retry the generation.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs font-mono text-red-400">
        {error || 'Unknown error occurred while synthesizing pipeline.'}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700 transition cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Retry Generation</span>
        </button>

        <button
          type="button"
          onClick={onBackToStudio}
          className="inline-flex items-center gap-2 rounded-xl border border-[#23293d] bg-[#141824] px-5 py-2.5 text-xs font-semibold text-slate-300 hover:border-slate-600 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Studio</span>
        </button>
      </div>
    </div>
  );
}
