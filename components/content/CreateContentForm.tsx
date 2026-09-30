'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Flame, 
  Palette, 
  AlertCircle, 
  Loader2,
  BookOpen,
  Newspaper,
  Compass,
  TrendingUp,
  Bookmark,
  Megaphone
} from 'lucide-react';
import { 
  ContentType, 
  ContentStyle, 
  VideoDuration, 
  GenerationRequest,
  GenerationStatus
} from '@/lib/api/types';
import { generateContent } from '@/lib/api/generation';
import { ExamplePrompts, PromptTemplate } from './ExamplePrompts';

const CONTENT_TYPES: { id: ContentType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'educational', label: 'Educational', icon: BookOpen },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'explainer', label: 'Explainer', icon: Compass },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'story', label: 'Story', icon: Bookmark },
  { id: 'promotional', label: 'Promotional', icon: Megaphone },
];

const DURATION_OPTIONS: { value: VideoDuration; label: string; desc: string }[] = [
  { value: 15, label: '15 sec', desc: 'Ultra-fast hook' },
  { value: 30, label: '30 sec', desc: 'Optimal retention' },
  { value: 45, label: '45 sec', desc: 'In-depth brief' },
  { value: 60, label: '60 sec', desc: 'Full narrative' },
];

const STYLE_OPTIONS: { id: ContentStyle; label: string; desc: string }[] = [
  { id: 'professional', label: 'Professional', desc: 'Authoritative & crisp' },
  { id: 'energetic', label: 'Energetic', desc: 'High tempo & punchy' },
  { id: 'cinematic', label: 'Cinematic', desc: 'Moody & atmospheric' },
  { id: 'conversational', label: 'Conversational', desc: 'Relatable & direct' },
];

interface CreateContentFormProps {
  onGenerationStarted: (jobId: string, request: GenerationRequest, status: GenerationStatus) => void;
}

export function CreateContentForm({ onGenerationStarted }: CreateContentFormProps) {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState<ContentType>('educational');
  const [duration, setDuration] = useState<VideoDuration>(30);
  const [style, setStyle] = useState<ContentStyle>('professional');
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyTemplate = (template: PromptTemplate) => {
    setTopic(template.topic);
    setContentType(template.contentType);
    setDuration(template.duration);
    setStyle(template.style);
    setErrorMessage(null);
  };

  const handleTopicChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTopic(e.target.value);
    if (errorMessage && e.target.value.trim().length > 0) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTopic = topic.trim();
    if (!trimmedTopic) {
      setErrorMessage('Enter a topic or idea to continue.');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const request: GenerationRequest = {
        topic: trimmedTopic,
        contentType,
        duration,
        style,
      };

      // Call clean mock API abstraction (Milestone 1)
      const { jobId, status } = await generateContent(request);

      onGenerationStarted(jobId, request, status);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Failed to initiate video pipeline');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Main Input Textarea */}
      <div className="rounded-2xl border border-[#1e2230] bg-[#0d1017] p-5 sm:p-6 shadow-xl transition-all duration-200 focus-within:border-indigo-500/60 focus-within:ring-1 focus-within:ring-indigo-500/20">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="topic-input" className="block text-sm font-semibold text-slate-100">
            What&apos;s your idea? <span className="text-indigo-400">*</span>
          </label>
          <span className="text-xs text-slate-500 tabular-nums">
            {topic.length} / 500
          </span>
        </div>

        <textarea
          id="topic-input"
          value={topic}
          onChange={handleTopicChange}
          maxLength={500}
          rows={4}
          disabled={isSubmitting}
          placeholder="e.g. Explain why AI agents are changing the future of work"
          className="w-full resize-none bg-transparent text-base sm:text-lg text-slate-100 placeholder:text-slate-500 outline-none leading-relaxed"
        />

        {/* Validation Error Banner */}
        {errorMessage && (
          <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-xs font-medium text-red-400 animate-fadeIn">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Preset Inspirations */}
      <ExamplePrompts onSelectPrompt={handleApplyTemplate} />

      {/* Configuration Grid */}
      <div className="space-y-6 rounded-2xl border border-[#1e2230] bg-[#0d1017] p-5 sm:p-6">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 border-b border-[#1b1f2e] pb-3">
          Content Configuration
        </h3>

        {/* 1. Content Type */}
        <div className="space-y-2.5">
          <label className="block text-xs font-semibold text-slate-200">
            Content Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {CONTENT_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = contentType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setContentType(type.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-150 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200 font-semibold shadow-sm shadow-indigo-500/10'
                      : 'border-[#1e2230] bg-[#121520]/70 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Icon className={`h-4 w-4 mb-1.5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <span className="text-xs">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Duration */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>Target Duration</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {DURATION_OPTIONS.map((item) => {
              const isSelected = duration === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setDuration(item.value)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-150 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200 shadow-sm shadow-indigo-500/10'
                      : 'border-[#1e2230] bg-[#121520]/70 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Style / Tone */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
            <Palette className="h-3.5 w-3.5 text-slate-400" />
            <span>Style & Tone</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {STYLE_OPTIONS.map((item) => {
              const isSelected = style === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setStyle(item.id)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-150 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500/15 text-indigo-200 shadow-sm shadow-indigo-500/10'
                      : 'border-[#1e2230] bg-[#121520]/70 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    {item.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Primary Submit CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Flame className="h-4 w-4 text-amber-400" />
          <span>Produces 9:16 vertical video optimized for the Qoneqt algorithm</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-600 hover:to-indigo-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Initializing Pipeline...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-indigo-200" />
              <span>Generate Video</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
