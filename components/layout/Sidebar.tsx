'use client';

import React from 'react';
import { 
  Sparkles, 
  Activity, 
  FileText, 
  Clapperboard,
  Radio 
} from 'lucide-react';

interface SidebarProps {
  currentTab: 'studio' | 'generation' | 'review' | 'result' | 'feed';
  onSelectTab: (tab: 'studio' | 'generation' | 'review' | 'result' | 'feed') => void;
  hasActiveJob?: boolean;
  hasResult?: boolean;
  hasComposedVideo?: boolean;
}

export function Sidebar({ 
  currentTab, 
  onSelectTab, 
  hasActiveJob,
  hasResult,
  hasComposedVideo,
}: SidebarProps) {
  return (
    <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-[#1e2230] bg-[#090b10] p-4 min-h-[calc(100vh-4rem)]">
      <div className="space-y-6">
        <div>
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Pipeline Navigation
          </span>
          <nav className="mt-2 space-y-1">
            <button
              type="button"
              onClick={() => onSelectTab('studio')}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 cursor-pointer ${
                currentTab === 'studio'
                  ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-[#121520] hover:text-slate-200 border border-transparent'
              }`}
            >
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>Content Studio</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('generation')}
              disabled={!hasActiveJob}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 ${
                currentTab === 'generation'
                  ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 cursor-pointer'
                  : hasActiveJob
                  ? 'text-slate-400 hover:bg-[#121520] hover:text-slate-200 border border-transparent cursor-pointer'
                  : 'text-slate-600 border border-transparent cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4" />
                <span>Pipeline Monitor</span>
              </div>
              {hasActiveJob && (
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('review')}
              disabled={!hasResult}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 ${
                currentTab === 'review'
                  ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 cursor-pointer'
                  : hasResult
                  ? 'text-slate-400 hover:bg-[#121520] hover:text-slate-200 border border-transparent cursor-pointer'
                  : 'text-slate-600 border border-transparent cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4" />
                <span>Content Review</span>
              </div>
              {hasResult && (
                <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  Ready
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('result')}
              disabled={!hasComposedVideo}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 ${
                currentTab === 'result'
                  ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 cursor-pointer'
                  : hasComposedVideo
                  ? 'text-slate-400 hover:bg-[#121520] hover:text-slate-200 border border-transparent cursor-pointer'
                  : 'text-slate-600 border border-transparent cursor-not-allowed opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clapperboard className="h-4 w-4" />
                <span>Video Result</span>
              </div>
              {hasComposedVideo && (
                <span className="text-[10px] bg-indigo-500/15 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">
                  9:16
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onSelectTab('feed')}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-150 cursor-pointer ${
                currentTab === 'feed'
                  ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-[#121520] hover:text-slate-200 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Radio className="h-4 w-4 text-emerald-400" />
                <span>Qoneqt Feed</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">
                Direct
              </span>
            </button>
          </nav>
        </div>

        {/* Pipeline Telemetry Card */}
        <div className="rounded-xl border border-[#1b2030] bg-[#0d1017] p-3.5 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-medium">Pipeline Status</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Online
            </span>
          </div>
          <div className="text-[11px] text-slate-500 leading-tight">
            Autonomous 8-stage video director configured for 9:16 global distribution.
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-[#1b2030] pt-4 space-y-2 text-[11px] text-slate-500">
        <div className="flex items-center justify-between">
          <span>Target Architecture</span>
          <span className="text-slate-300 font-mono">FastAPI + Next</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Backend Link</span>
          <span className="text-indigo-400 font-medium">Mock Mode</span>
        </div>
      </div>
    </aside>
  );
}
