'use client';

import React, { useState } from 'react';
import { Sparkles, Quote, FileText, ChevronDown, ChevronUp } from 'lucide-react';

interface VideoInformationProps {
  title: string;
  hook: string;
  script: string;
  topic?: string;
}

export function VideoInformation({
  title,
  hook,
  script,
  topic,
}: VideoInformationProps) {
  const [showFullScript, setShowFullScript] = useState(false);

  // Compute a concise summary rather than dumping a huge wall of text
  const scriptSummary = React.useMemo(() => {
    if (!script) return 'High-impact short-form video crafted for maximum audience retention.';
    const sentences = script.split(/(?<=[.?!])\s+/).filter(Boolean);
    if (sentences.length <= 2) return script;
    return `${sentences.slice(0, 2).join(' ')}..`;
  }, [script]);

  return (
    <div className="rounded-2xl border border-[#1e2230] bg-[#0d1017] p-6 space-y-5 shadow-xl">
      {/* Title & Badge */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-indigo-400">
            <Sparkles className="h-3 w-3" />
            <span>Master Video Asset</span>
          </div>

          {topic && (
            <span className="text-xs text-slate-400 font-mono">
              Topic: {topic}
            </span>
          )}
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
          {title}
        </h1>
      </div>

      {/* Hook Callout */}
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-4 relative overflow-hidden">
        <div className="flex items-start gap-3">
          <Quote className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5 rotate-180" />
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              Retention Hook (0.0s – 3.0s)
            </span>
            <p className="text-sm font-medium text-slate-200 italic leading-relaxed">
              &ldquo;{hook}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Concise Script Summary */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-slate-400" />
            <span>Script Synopsis</span>
          </span>

          <button
            type="button"
            onClick={() => setShowFullScript(!showFullScript)}
            className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1 cursor-pointer transition"
          >
            <span>{showFullScript ? 'Collapse script' : 'View full script'}</span>
            {showFullScript ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
        </div>

        <div className="rounded-xl bg-[#111420] border border-[#1b2030] p-3.5 text-xs text-slate-300 leading-relaxed">
          {showFullScript ? (
            <p className="whitespace-pre-line text-slate-300 font-sans">
              {script}
            </p>
          ) : (
            <p className="text-slate-300">
              {scriptSummary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
