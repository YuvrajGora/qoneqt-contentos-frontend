'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Layers, 
  Clock, 
  Palette, 
  ArrowLeft 
} from 'lucide-react';
import { GenerationResult } from '@/lib/api/types';

interface ReviewHeaderProps {
  result: GenerationResult;
  onBackToStudio: () => void;
}

export function ReviewHeader({ result, onBackToStudio }: ReviewHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#1b2030]">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Ready for Review</span>
          </span>
          <span className="text-slate-600">•</span>
          <span className="font-mono text-xs text-slate-400">
            {result.jobId}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Review your content
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Inspect the story, scenes and production plan before creating the final video.
        </p>
      </div>

      {/* Configuration Metadata Pills & Action */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-xl border border-[#1d2232] bg-[#0c0e15] px-3 py-1.5 text-xs text-slate-300">
          <Layers className="h-3.5 w-3.5 text-indigo-400" />
          <span className="capitalize">{result.contentType}</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-[#1d2232] bg-[#0c0e15] px-3 py-1.5 text-xs text-slate-300">
          <Clock className="h-3.5 w-3.5 text-indigo-400" />
          <span>{result.duration.toFixed(1)}s</span>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl border border-[#1d2232] bg-[#0c0e15] px-3 py-1.5 text-xs text-slate-300">
          <Palette className="h-3.5 w-3.5 text-indigo-400" />
          <span className="capitalize">{result.style}</span>
        </div>

        <button
          type="button"
          onClick={onBackToStudio}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#23293d] bg-[#141824] px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-600 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Studio</span>
        </button>
      </div>
    </div>
  );
}
