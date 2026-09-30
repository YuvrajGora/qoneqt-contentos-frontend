'use client';

import React from 'react';
import { Layers, Radio, Sparkles } from 'lucide-react';

interface HeaderProps {
  onReset?: () => void;
}

export function Header({ onReset }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1e2230] bg-[#090a0f]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Logo */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-indigo-200 transition-colors">
                Qoneqt ContentOS
              </span>
              <span className="inline-flex items-center rounded-md border border-indigo-500/30 bg-indigo-500/10 px-1.5 py-0.5 text-[11px] font-medium text-indigo-400">
                Pipeline v1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              From idea to publish-ready video
            </p>
          </div>
        </div>

        {/* Global Pipeline Telemetry & Target Indicator */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-full border border-[#1e2230] bg-[#0e111a] px-3 py-1.5 text-xs text-slate-300">
            <Radio className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
            <span className="text-slate-400">Target Feed:</span>
            <span className="font-medium text-slate-200">Qoneqt Global</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-lg border border-[#1e2230] bg-[#121622] px-2.5 py-1 text-xs text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-slate-400">Engine:</span>
            <span className="font-semibold text-indigo-300">FastAPI + LLM Ready</span>
          </div>
        </div>
      </div>
    </header>
  );
}
