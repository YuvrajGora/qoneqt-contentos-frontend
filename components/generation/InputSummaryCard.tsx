'use client';

import React from 'react';
import { Layers, Clock, Palette, Sparkles } from 'lucide-react';
import { GenerationRequest, GenerationStatus } from '@/lib/api/types';

interface InputSummaryCardProps {
  request: GenerationRequest;
  status: GenerationStatus;
  estimatedScenesCount?: number;
}

export function InputSummaryCard({
  request,
  status,
  estimatedScenesCount = 5,
}: InputSummaryCardProps) {
  return (
    <div className="rounded-2xl border border-[#1e2230] bg-[#0c0e15] p-5 space-y-4">
      {/* Source Idea */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-indigo-400" />
          Source Idea
        </span>
        <div className="rounded-xl border border-[#1d2232] bg-[#080a0f] p-3 text-sm font-semibold text-slate-100 leading-snug">
          &ldquo;{request.topic}&rdquo;
        </div>
      </div>

      {/* Configuration Tags */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-2.5 py-1 font-medium text-indigo-300 capitalize">
          <Layers className="h-3 w-3" />
          {request.contentType}
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg border border-slate-700/60 bg-slate-800/40 px-2.5 py-1 font-medium text-slate-300">
          <Clock className="h-3 w-3" />
          {request.duration} sec
        </span>
        <span className="inline-flex items-center gap-1 rounded-lg border border-slate-700/60 bg-slate-800/40 px-2.5 py-1 font-medium text-slate-300 capitalize">
          <Palette className="h-3 w-3" />
          {request.style}
        </span>
      </div>

      {/* Pipeline Metrics */}
      <div className="pt-2 border-t border-[#1a1f2e] grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-lg bg-[#111420] border border-[#1a2030]">
          <span className="text-slate-500 block text-[10px] uppercase tracking-wider">
            Storyboard Scenes
          </span>
          <span className="text-sm font-bold text-white mt-0.5 block">
            {estimatedScenesCount} Beats
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#111420] border border-[#1a2030]">
          <span className="text-slate-500 block text-[10px] uppercase tracking-wider">
            Target Aspect Ratio
          </span>
          <span className="text-sm font-bold text-white mt-0.5 block">
            9:16 Vertical
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#111420] border border-[#1a2030]">
          <span className="text-slate-500 block text-[10px] uppercase tracking-wider">
            Pipeline Stages
          </span>
          <span className="text-sm font-bold text-white mt-0.5 block">
            {status.stages.length} Stages
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#111420] border border-[#1a2030]">
          <span className="text-slate-500 block text-[10px] uppercase tracking-wider">
            Job Status
          </span>
          <span className={`text-sm font-bold mt-0.5 block capitalize ${
            status.status === 'completed' ? 'text-emerald-400' : 'text-indigo-400'
          }`}>
            {status.status === 'completed' ? 'Complete' : 'Processing'}
          </span>
        </div>
      </div>
    </div>
  );
}
