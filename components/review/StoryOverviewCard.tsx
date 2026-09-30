'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Quote, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check 
} from 'lucide-react';
import { Scene } from '@/lib/api/types';

interface StoryOverviewCardProps {
  title: string;
  hook: string;
  scenes: Scene[];
}

export function StoryOverviewCard({ title, hook, scenes }: StoryOverviewCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const fullScript = scenes.map((s) => s.narration).join('\n\n');

  const handleCopyScript = () => {
    navigator.clipboard.writeText(fullScript);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-[#1e2230] bg-[#0c0e15] p-5 sm:p-6 space-y-5 shadow-xl">
      {/* Title & Hook Header */}
      <div className="space-y-3 pb-5 border-b border-[#181d2c]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Generated Video Title
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {title}
          </h2>
        </div>

        {/* Opening Hook Quote Card */}
        <div className="rounded-xl border border-indigo-500/25 bg-gradient-to-r from-indigo-950/30 via-[#0e111a] to-[#0c0e15] p-4 flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Quote className="h-4 w-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-0.5">
              Opening Retention Hook
            </span>
            <p className="text-sm text-slate-100 font-medium italic leading-relaxed">
              &ldquo;{hook}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Script Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Full Synthesized Script
            </span>
            <span className="text-[11px] text-slate-500">
              ({scenes.length} scene beats)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyScript}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#222738] bg-[#121622] px-2.5 py-1 text-[11px] text-slate-400 hover:text-white transition cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Script</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition cursor-pointer p-1"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Formatted Script Flow */}
        {isExpanded && (
          <div className="space-y-3 pt-1">
            {scenes.map((scene, idx) => (
              <div 
                key={scene.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#080a0f] border border-[#171b28] hover:border-[#22283a] transition-colors"
              >
                <span className="shrink-0 font-mono text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {scene.narration}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
