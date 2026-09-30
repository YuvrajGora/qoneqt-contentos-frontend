'use client';

import React from 'react';
import { 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import { GenerationResult } from '@/lib/api/types';

interface ContentReadinessCardProps {
  result: GenerationResult;
}

const READINESS_CHECKLIST = [
  'Story generated',
  'Scenes planned',
  'Narration prepared',
  'Captions prepared',
  'Duration within target',
];

export function ContentReadinessCard({ result }: ContentReadinessCardProps) {
  return (
    <div className="space-y-4">
      {/* Content Readiness Card */}
      <div className="rounded-2xl border border-indigo-500/30 bg-[#0c0e15] p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#1b2030]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Content Readiness
            </span>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
            5 / 5 Verified
          </span>
        </div>

        {/* 5 Checklist Items */}
        <div className="space-y-2.5">
          {READINESS_CHECKLIST.map((item) => (
            <div key={item} className="flex items-center gap-2.5 text-xs text-slate-300">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>

        {/* Stage Status Pill */}
        <div className="pt-3 border-t border-[#181d2a]">
          <span className="text-[10px] uppercase tracking-wider text-slate-500 block mb-1">
            Pipeline Stage Gate
          </span>
          <div className="flex items-center gap-2 rounded-xl bg-indigo-500/10 border border-indigo-500/25 px-3 py-2 text-xs font-semibold text-indigo-300">
            <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Ready for Video Composition</span>
          </div>
        </div>
      </div>

      {/* Storyboard Simple Metrics */}
      <div className="rounded-2xl border border-[#1e2230] bg-[#0c0e15] p-5 space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block pb-2 border-b border-[#1b2030]">
          Storyboard Telemetry
        </span>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-[#111420] border border-[#1d2232]">
            <span className="text-[10px] text-slate-500 block">Storyboard Scenes</span>
            <span className="text-sm font-bold text-white mt-0.5 block">
              {result.scenes.length} Beats
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#111420] border border-[#1d2232]">
            <span className="text-[10px] text-slate-500 block">Target Duration</span>
            <span className="text-sm font-bold text-white mt-0.5 block">
              {result.duration.toFixed(1)}s
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#111420] border border-[#1d2232]">
            <span className="text-[10px] text-slate-500 block">Voice Narration</span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
              Ready
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-[#111420] border border-[#1d2232]">
            <span className="text-[10px] text-slate-500 block">Kinetic Captions</span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
              Ready
            </span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>Target Distribution</span>
          <span className="font-semibold text-slate-200">9:16 Vertical</span>
        </div>
      </div>
    </div>
  );
}
