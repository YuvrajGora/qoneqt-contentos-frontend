'use client';

import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Film, 
  ShieldCheck,
  Video
} from 'lucide-react';
import { GenerationResult } from '@/lib/api/types';

interface GenerationCompletionCardProps {
  result: GenerationResult;
  onReviewContent: () => void;
  onBackToStudio: () => void;
}

export function GenerationCompletionCard({
  result,
  onReviewContent,
  onBackToStudio,
}: GenerationCompletionCardProps) {
  return (
    <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-[#0b1418] via-[#0b0f17] to-[#090b10] p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-fadeIn">
      {/* Subtle top success banner glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-3/4 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      {/* Header status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1b2230]">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                ✓ Content Ready
              </span>
              <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300 border border-emerald-500/30">
                100% Pipeline Verified
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              Your video has passed the ContentOS pipeline.
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBackToStudio}
            className="inline-flex items-center gap-2 rounded-xl border border-[#23293d] bg-[#141824] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:border-slate-600 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Studio</span>
          </button>
        </div>
      </div>

      {/* Generated Content Summary */}
      <div className="mt-6 space-y-5">
        {/* Title & Hook Card */}
        <div className="rounded-xl border border-[#1e2436] bg-[#0c101a] p-5 space-y-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Generated Video Title
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {result.title}
            </h3>
          </div>

          <div className="pt-3 border-t border-[#181f2f]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
              Opening Hook & Narrative Anchor
            </span>
            <p className="text-sm text-slate-200 italic leading-relaxed">
              &ldquo;{result.hook}&rdquo;
            </p>
          </div>
        </div>

        {/* Storyboard & Quality Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0e121e] border border-[#1d2334]">
            <span className="text-slate-400 block mb-1 flex items-center gap-1.5">
              <Film className="h-3.5 w-3.5 text-indigo-400" />
              Storyboard
            </span>
            <span className="text-base font-bold text-white">
              {result.scenes.length} Scenes
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e121e] border border-[#1d2334]">
            <span className="text-slate-400 block mb-1 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              Runtime
            </span>
            <span className="text-base font-bold text-white">
              {result.duration.toFixed(1)}s (9:16)
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e121e] border border-[#1d2334]">
            <span className="text-slate-400 block mb-1 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Quality Check
            </span>
            <span className="text-base font-bold text-emerald-400">
              {result.qualityStatus.score}/100 Passed
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0e121e] border border-[#1d2334]">
            <span className="text-slate-400 block mb-1 flex items-center gap-1.5">
              <Video className="h-3.5 w-3.5 text-indigo-400" />
              Aspect Ratio
            </span>
            <span className="text-base font-bold text-white">
              1080x1920 @ 60fps
            </span>
          </div>
        </div>

        {/* Primary Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1b2230]">
          <span className="text-xs text-slate-400">
            All 8 stages compiled. Ready to review scene storyboard and script.
          </span>

          <button
            type="button"
            onClick={onReviewContent}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700 active:scale-[0.98] transition cursor-pointer"
          >
            <span>Review Content</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
