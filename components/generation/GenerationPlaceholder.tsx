'use client';

import React from 'react';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Layers, 
  Activity 
} from 'lucide-react';
import { GenerationRequest, GenerationStatus } from '@/lib/api/types';

interface GenerationPlaceholderProps {
  jobId: string;
  request: GenerationRequest;
  status: GenerationStatus;
  onBackToStudio: () => void;
}

export function GenerationPlaceholder({
  jobId,
  request,
  status,
  onBackToStudio,
}: GenerationPlaceholderProps) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Active Pipeline Status Banner */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-[#0d101d] to-[#0c0e17] p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400">
              <Activity className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Pipeline Active
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
                  Mock API Connected
                </span>
              </div>
              <h2 className="text-lg font-bold text-white mt-0.5">
                Job Dispatched to ContentOS Pipeline
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToStudio}
              className="inline-flex items-center gap-2 rounded-xl border border-[#23293d] bg-[#141824] px-4 py-2 text-xs font-semibold text-slate-300 hover:border-slate-600 hover:text-white transition-all cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Studio</span>
            </button>
          </div>
        </div>

        {/* Telemetry metadata */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1b2030] text-xs">
          <div>
            <span className="text-slate-500 block">Job Identifier</span>
            <span className="font-mono text-slate-200 font-semibold">{jobId}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Initial Status</span>
            <span className="capitalize text-emerald-400 font-medium">{status.status}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Active Stage</span>
            <span className="text-indigo-300 font-medium">{status.currentStageLabel || 'Topic Analysis'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Target Runtime</span>
            <span className="text-slate-200 font-medium">{request.duration} seconds (9:16)</span>
          </div>
        </div>
      </div>

      {/* Dispatched Configuration Payload Card */}
      <div className="rounded-2xl border border-[#1e2230] bg-[#0d1017] p-6 space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Layers className="h-4 w-4 text-indigo-400" />
          <span>Dispatched Request Payload</span>
        </h3>

        <div className="rounded-xl border border-[#1b2030] bg-[#090b11] p-4">
          <span className="text-xs text-slate-400 font-medium block mb-1">Topic / Idea Prompt</span>
          <p className="text-sm font-semibold text-white leading-relaxed">
            &ldquo;{request.topic}&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-[#111420] border border-[#1d2232]">
            <span className="text-slate-500 block">Content Category</span>
            <span className="font-semibold text-slate-200 capitalize mt-0.5 block">
              {request.contentType}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#111420] border border-[#1d2232]">
            <span className="text-slate-500 block">Target Duration</span>
            <span className="font-semibold text-slate-200 mt-0.5 block">
              {request.duration} seconds
            </span>
          </div>

          <div className="p-3 rounded-lg bg-[#111420] border border-[#1d2232]">
            <span className="text-slate-500 block">Aesthetic Tone</span>
            <span className="font-semibold text-slate-200 capitalize mt-0.5 block">
              {request.style}
            </span>
          </div>
        </div>

        {/* Milestone transition notice */}
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4 flex items-start gap-3 text-xs text-slate-300">
          <CheckCircle2 className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-indigo-200">
              Milestone 2 Validation Complete: API abstraction called successfully!
            </p>
            <p className="text-slate-400 mt-1">
              The topic and configurations were verified and ingested by the ContentOS API abstraction layer. In Milestone 3, this placeholder will be upgraded into the live 8-stage interactive pipeline visualizer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
