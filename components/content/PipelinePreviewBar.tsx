'use client';

import React from 'react';
import { 
  Lightbulb, 
  FileText, 
  Film, 
  Sparkles, 
  Mic, 
  Clapperboard, 
  CheckCircle2, 
  Share2, 
  ChevronRight 
} from 'lucide-react';

interface StagePreviewItem {
  label: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PIPELINE_STEPS: StagePreviewItem[] = [
  { label: 'Idea', subtext: 'Intent Analysis', icon: Lightbulb },
  { label: 'Script', subtext: 'Hook & Narrative', icon: FileText },
  { label: 'Scenes', subtext: 'Storyboard Beat', icon: Film },
  { label: 'Visuals', subtext: 'Cinematic Gen', icon: Sparkles },
  { label: 'Voice', subtext: 'Studio Audio', icon: Mic },
  { label: 'Video', subtext: 'FFmpeg Stitch', icon: Clapperboard },
  { label: 'Quality', subtext: 'Format QC', icon: CheckCircle2 },
  { label: 'Publish', subtext: 'Global Feed', icon: Share2 },
];

export function PipelinePreviewBar() {
  return (
    <div className="w-full rounded-2xl border border-[#1e2230] bg-[#0c0e15]/70 p-4 sm:p-5 backdrop-blur-sm shadow-inner">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-[#1b1f2e]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Automated Content Pipeline
          </span>
        </div>
        <p className="text-xs text-slate-400">
          Orchestrated 8-stage autonomous pipeline for the Qoneqt Global Feed
        </p>
      </div>

      <div className="grid grid-cols-2 xs:grid-cols-4 md:grid-cols-8 gap-2">
        {PIPELINE_STEPS.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === PIPELINE_STEPS.length - 1;
          return (
            <div 
              key={step.label}
              className="group relative flex flex-col items-center text-center p-2 rounded-xl bg-[#111420]/60 border border-[#1c2130] hover:border-indigo-500/40 hover:bg-[#141826] transition-all duration-150"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#181d2c] border border-[#242b3e] text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="mt-1.5 text-xs font-semibold text-slate-200">
                {step.label}
              </span>
              <span className="text-[10px] text-slate-500 tracking-tight">
                {step.subtext}
              </span>

              {!isLast && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-slate-600">
                  <ChevronRight className="h-3 w-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
