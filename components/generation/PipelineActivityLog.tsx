'use client';

import React, { useEffect, useRef } from 'react';
import { Terminal, Check, Loader2, Circle } from 'lucide-react';
import { PipelineLogEntry } from '@/lib/api/types';

interface PipelineActivityLogProps {
  logs: PipelineLogEntry[];
}

export function PipelineActivityLog({ logs }: PipelineActivityLogProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest log
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="rounded-2xl border border-[#1e2230] bg-[#0c0e15] p-4 sm:p-5 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1b1f2e]">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Pipeline Activity
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live Stream
        </span>
      </div>

      <div
        ref={containerRef}
        className="space-y-2.5 overflow-y-auto max-h-56 sm:max-h-64 pr-1 font-mono text-xs scroll-smooth"
      >
        {logs.map((log) => {
          const isDone = log.status === 'completed';
          const isActive = log.status === 'active';
          return (
            <div
              key={log.id}
              className={`flex items-start gap-2.5 py-1 px-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-200 border border-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-slate-500 shrink-0 text-[11px] select-none">
                {log.timestamp}
              </span>

              <span className="shrink-0 mt-0.5">
                {isDone ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : isActive ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-slate-600" />
                )}
              </span>

              <span className={`leading-tight ${isActive ? 'font-semibold text-white' : ''}`}>
                {log.message}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
