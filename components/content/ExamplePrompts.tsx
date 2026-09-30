'use client';

import React from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { ContentType, ContentStyle, VideoDuration } from '@/lib/api/types';

export interface PromptTemplate {
  topic: string;
  contentType: ContentType;
  duration: VideoDuration;
  style: ContentStyle;
  tag: string;
}

const EXAMPLE_IDEAS: PromptTemplate[] = [
  {
    topic: 'Why AI agents are changing the future of work',
    contentType: 'educational',
    duration: 30,
    style: 'professional',
    tag: 'Hackathon Benchmark',
  },
  {
    topic: '3 quantum computing breakthroughs reshaping cybersecurity in 2026',
    contentType: 'explainer',
    duration: 45,
    style: 'cinematic',
    tag: 'Deep Tech',
  },
  {
    topic: 'Why cybersecurity matters for everyone in the autonomous web era',
    contentType: 'news',
    duration: 30,
    style: 'conversational',
    tag: 'Security & Web3',
  },
  {
    topic: 'The real reason creator economies are pivoting to vertical pipelines',
    contentType: 'trending',
    duration: 15,
    style: 'energetic',
    tag: 'Creator Economy',
  },
];

interface ExamplePromptsProps {
  onSelectPrompt: (template: PromptTemplate) => void;
}

export function ExamplePrompts({ onSelectPrompt }: ExamplePromptsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            One-Click Benchmark Prompts
          </span>
        </div>
        <span className="text-xs text-slate-500">
          Click to load presets
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {EXAMPLE_IDEAS.map((idea) => (
          <button
            key={idea.topic}
            type="button"
            onClick={() => onSelectPrompt(idea)}
            className="group flex flex-col justify-between text-left p-3.5 rounded-xl border border-[#1e2230] bg-[#0d1017] hover:border-indigo-500/50 hover:bg-[#121622] transition-all duration-150"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-medium text-slate-200 group-hover:text-white line-clamp-2">
                &ldquo;{idea.topic}&rdquo;
              </span>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0" />
            </div>

            <div className="mt-2.5 flex items-center gap-2 text-[11px] text-slate-400">
              <span className="rounded bg-indigo-500/10 px-1.5 py-0.5 text-indigo-400 font-medium border border-indigo-500/20">
                {idea.tag}
              </span>
              <span>•</span>
              <span className="capitalize">{idea.contentType}</span>
              <span>•</span>
              <span>{idea.duration}s</span>
              <span>•</span>
              <span className="capitalize">{idea.style}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
