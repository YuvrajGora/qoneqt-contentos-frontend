'use client';

import React from 'react';
import { 
  RotateCcw, 
  Clock, 
  Film, 
  Mic, 
  Subtitles, 
  MoveRight, 
  CheckCircle2, 
  Loader2, 
  AlertCircle,
  Video
} from 'lucide-react';
import { Scene } from '@/lib/api/types';

interface SceneCardProps {
  scene: Scene;
  isRegenerating: boolean;
  isSuccess: boolean;
  error?: string | null;
  onRegenerate: (sceneId: string) => void;
  onRetry: (sceneId: string) => void;
}

export function SceneCard({
  scene,
  isRegenerating,
  isSuccess,
  error,
  onRegenerate,
  onRetry,
}: SceneCardProps) {
  const sceneNumber = `SCENE ${String(scene.order).padStart(2, '0')}`;

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isRegenerating
          ? 'border-indigo-500/80 bg-[#0d101e] shadow-xl shadow-indigo-500/10'
          : isSuccess
          ? 'border-emerald-500/80 bg-[#0c1417] shadow-xl shadow-emerald-500/10'
          : error
          ? 'border-red-500/60 bg-[#120b0e]'
          : 'border-[#1e2230] bg-[#0c0e15] hover:border-[#2b3248]'
      }`}
    >
      {/* Top Header Row of the Card */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 border-b border-[#181d2a] bg-[#090b11]">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-xs font-extrabold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
            {sceneNumber}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
            <Clock className="h-3 w-3 text-slate-500" />
            <span>{scene.duration.toFixed(1)}s</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Badge */}
          {isRegenerating ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-2.5 py-1 text-[11px] font-semibold text-indigo-300 border border-indigo-500/40">
              <Loader2 className="h-3 w-3 animate-spin text-indigo-400" />
              <span>Regenerating scene...</span>
            </span>
          ) : isSuccess ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/30 animate-fadeIn">
              <CheckCircle2 className="h-3 w-3" />
              <span>Scene regenerated</span>
            </span>
          ) : error ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-red-500/15 px-2.5 py-1 text-[11px] font-semibold text-red-400 border border-red-500/30">
              <AlertCircle className="h-3 w-3" />
              <span>Regeneration failed</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/60 px-2.5 py-0.5 text-[11px] font-medium text-slate-300 border border-slate-700/50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Ready
            </span>
          )}

          {/* Regenerate Action Button */}
          {error ? (
            <button
              type="button"
              onClick={() => onRetry(scene.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Retry</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onRegenerate(scene.id)}
              disabled={isRegenerating}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#262c3e] bg-[#121622] px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-indigo-500/50 hover:text-white active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
              <RotateCcw className={`h-3 w-3 text-indigo-400 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>Regenerate Scene</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Card Content (Visual Preview Frame + Story Details) */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Column: Visual Preview Frame (5 Cols) */}
        <div className="md:col-span-5 flex flex-col">
          <div className="relative aspect-[16/10] sm:aspect-[9/10] w-full rounded-xl border border-[#1f2638] bg-gradient-to-br from-[#0e121c] via-[#090b10] to-[#0d1017] p-4 flex flex-col justify-between overflow-hidden shadow-inner group">
            {/* Visual Header tags */}
            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1 rounded bg-[#090a0f]/80 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-300 border border-indigo-500/20 backdrop-blur-sm">
                <Video className="h-2.5 w-2.5" />
                9:16 Frame
              </span>
              <span className="text-[10px] text-slate-400 font-mono bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                Beat #{scene.order}
              </span>
            </div>

            {/* Center Visual Mock Illustration */}
            <div className="my-auto text-center space-y-2 py-3 z-10">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-105 transition-transform duration-200">
                <Film className="h-5 w-5" />
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-3 px-2 font-medium leading-relaxed italic">
                &ldquo;{scene.visualDescription}&rdquo;
              </p>
            </div>

            {/* Bottom Visual Telemetry */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 z-10 pt-2 border-t border-[#181d2a]">
              <span>Camera: {scene.transition || 'Dynamic Push-in'}</span>
              <span className="text-emerald-400 font-medium">Framing OK</span>
            </div>

            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />
          </div>
        </div>

        {/* Right Column: Narration, Visual Description & Captions (7 Cols) */}
        <div className="md:col-span-7 space-y-3.5 flex flex-col justify-between">
          {/* Narration */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Mic className="h-3 w-3" />
              Voiceover Narration
            </span>
            <div className="rounded-xl border border-[#1b2030] bg-[#080a0f] p-3">
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                &ldquo;{scene.narration}&rdquo;
              </p>
            </div>
          </div>

          {/* Visual Description Details */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Film className="h-3 w-3 text-slate-400" />
              Visual Prompt Guidance
            </span>
            <p className="text-xs text-slate-300 bg-[#090b11] p-2.5 rounded-lg border border-[#171c2a] leading-relaxed">
              {scene.visualDescription}
            </p>
          </div>

          {/* Caption & Transition Pill Row */}
          <div className="pt-2 border-t border-[#181d2a] grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-lg bg-[#0e111a] border border-[#1b2030] flex items-center gap-2">
              <Subtitles className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 block">
                  Kinetic Caption
                </span>
                <span className="text-[11px] text-slate-300 truncate block">
                  {scene.captionExcerpt || scene.narration.substring(0, 30) + '...'}
                </span>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-[#0e111a] border border-[#1b2030] flex items-center gap-2">
              <MoveRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 block">
                  Transition Effect
                </span>
                <span className="text-[11px] text-slate-300 truncate block">
                  {scene.transition || 'Smooth Dissolve'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
