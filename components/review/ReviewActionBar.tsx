'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, Clapperboard, Sparkles } from 'lucide-react';

interface ReviewActionBarProps {
  onCreateVideo: () => void;
  onBackToStudio: () => void;
  isSubmitting?: boolean;
}

export function ReviewActionBar({
  onCreateVideo,
  onBackToStudio,
  isSubmitting,
}: ReviewActionBarProps) {
  return (
    <div className="sticky bottom-0 z-30 -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10 py-4 bg-[#090a0f]/95 border-t border-[#1e2230] backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sparkles className="h-4 w-4 text-indigo-400 shrink-0" />
          <span>All scenes inspected. Proceed to FFmpeg composition and audio mastering.</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBackToStudio}
            className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#23293d] bg-[#141824] px-5 py-3 text-xs font-semibold text-slate-300 hover:border-slate-600 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Studio</span>
          </button>

          <button
            type="button"
            onClick={onCreateVideo}
            disabled={isSubmitting}
            className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 px-7 py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-indigo-800 active:scale-[0.98] transition cursor-pointer"
          >
            <Clapperboard className="h-4 w-4" />
            <span>Create Video</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
