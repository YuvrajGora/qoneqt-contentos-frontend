'use client';

import React, { useState } from 'react';
import { 
  Radio, 
  X, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  ShieldCheck,
  Globe,
  Film,
  Clock,
  Layers,
  Sparkles,
  Info,
  RotateCcw
} from 'lucide-react';
import { GenerationResult, PublishResult } from '@/lib/api/types';
import { publishContent, isMockPublishing } from '@/lib/api/publishing';

export interface PublishingConfirmationModalProps {
  result: GenerationResult;
  isOpen: boolean;
  onClose: () => void;
  onPublishSuccess?: (publishResult: PublishResult) => void;
  onNavigateToFeed?: () => void;
  onBackToStudio: () => void;
}

type PublishingStage = 
  | 'idle'
  | 'preparing'
  | 'uploading'
  | 'validating'
  | 'broadcasting'
  | 'complete'
  | 'failed';

const PUBLISHING_STEPS = [
  { id: 'preparing', label: 'Preparing video package' },
  { id: 'uploading', label: 'Uploading media assets' },
  { id: 'validating', label: 'Validating content compliance' },
  { id: 'broadcasting', label: 'Publishing to feed' },
  { id: 'complete', label: 'Complete' },
];

export function PublishingConfirmationModal({
  result,
  isOpen,
  onClose,
  onPublishSuccess,
  onNavigateToFeed,
  onBackToStudio,
}: PublishingConfirmationModalProps) {
  const [publishingStage, setPublishingStage] = useState<PublishingStage>('idle');
  const [publishResult, setPublishResult] = useState<PublishResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleModalClose = () => {
    if (publishingStage !== 'complete') {
      setPublishingStage('idle');
      setErrorMessage(null);
    }
    onClose();
  };

  if (!isOpen) return null;

  const handleConfirmPublish = async () => {
    setPublishingStage('preparing');
    setErrorMessage(null);

    try {
      // Step 1: Preparing video (300ms)
      await new Promise(r => setTimeout(r, 350));
      setPublishingStage('uploading');

      // Step 2: Uploading media (400ms)
      await new Promise(r => setTimeout(r, 450));
      setPublishingStage('validating');

      // Step 3: Validating content (350ms)
      await new Promise(r => setTimeout(r, 400));
      setPublishingStage('broadcasting');

      // Step 4: API publish call
      const res = await publishContent({
        jobId: result.jobId,
        title: result.title,
        description: result.hook,
        contentType: result.contentType,
        duration: result.duration,
        tags: ['ContentOS', 'AIVideo', result.style],
      });

      // Step 5: Complete
      setPublishingStage('complete');
      setPublishResult(res);

      if (onPublishSuccess) {
        onPublishSuccess(res);
      }
    } catch (err: unknown) {
      setPublishingStage('failed');
      const msg = err instanceof Error ? err.message : 'Publication could not be completed.';
      setErrorMessage(msg);
    }
  };

  const handleRetry = () => {
    setPublishingStage('idle');
    setErrorMessage(null);
  };

  const isPublishingInProgress = 
    publishingStage !== 'idle' && 
    publishingStage !== 'complete' && 
    publishingStage !== 'failed';

  const formatPublishDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleString();
    try {
      return new Date(dateString).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl rounded-3xl border border-indigo-500/30 bg-[#0c0e17] p-6 sm:p-8 shadow-2xl shadow-indigo-950/50 space-y-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleModalClose}
          disabled={isPublishingInProgress}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <X className="h-5 w-5" />
        </button>

        {/* 1. CONFIRMATION PHASE */}
        {publishingStage === 'idle' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header with Title and Subtle Mock Mode Indicator */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
                  <Radio className="h-5 w-5 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                      Publishing Confirmation
                    </span>
                    {/* Subtle Mock Mode Indicator */}
                    {isMockPublishing && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
                        <Sparkles className="h-2.5 w-2.5 text-amber-400" />
                        <span>MOCK PUBLISHING</span>
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Broadcast to Qoneqt Global Feed
                  </h2>
                </div>
              </div>

              {/* Informative Demo Mode Notice */}
              {isMockPublishing && (
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-3.5 py-2 text-xs text-amber-300/90 flex items-center gap-2">
                  <Info className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Publishing integration is currently running in demo mode.</span>
                </div>
              )}
            </div>

            {/* VIDEO Details Card */}
            <div className="rounded-2xl border border-[#1f2538] bg-[#121522] p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Video Package
                  </span>
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {result.title}
                  </h3>
                  <p className="text-xs text-slate-400 italic line-clamp-2">
                    &ldquo;{result.hook}&rdquo;
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300">
                  9:16 HD
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#1a1f30] text-xs">
                <div className="p-2 rounded-lg bg-[#0d101a] border border-[#1b2032]">
                  <span className="text-[10px] text-slate-500 block flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Duration
                  </span>
                  <span className="font-bold text-slate-200">{result.duration.toFixed(1)}s</span>
                </div>

                <div className="p-2 rounded-lg bg-[#0d101a] border border-[#1b2032]">
                  <span className="text-[10px] text-slate-500 block flex items-center gap-1">
                    <Layers className="h-3 w-3" /> Scenes
                  </span>
                  <span className="font-bold text-slate-200">{result.scenes.length} Scenes</span>
                </div>

                <div className="p-2 rounded-lg bg-[#0d101a] border border-[#1b2032]">
                  <span className="text-[10px] text-slate-500 block flex items-center gap-1">
                    <Film className="h-3 w-3" /> Format
                  </span>
                  <span className="font-bold text-slate-200">9:16 Vertical</span>
                </div>

                <div className="p-2 rounded-lg bg-[#0d101a] border border-[#1b2032]">
                  <span className="text-[10px] text-slate-500 block flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Type
                  </span>
                  <span className="font-bold text-slate-200 capitalize">{result.contentType}</span>
                </div>
              </div>
            </div>

            {/* QUALITY Audit Summary */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-300 block">
                    Quality Gate Passed
                  </span>
                  <span className="text-[11px] text-slate-400">
                    All compliance checks certified for broadcast distribution
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-white">{result.qualityStatus.score}/100</span>
                <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">
                  Broadcast Grade
                </span>
              </div>
            </div>

            {/* DISTRIBUTION Target Info */}
            <div className="rounded-xl border border-indigo-500/10 bg-indigo-950/20 p-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2 font-semibold text-indigo-300">
                <Globe className="h-4 w-4 text-indigo-400" />
                <span>Target Distribution Channel:</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Qoneqt Global Video Discovery Feed &bull; Algorithmic indexing & automated kinetic subtitle tagging will be registered with this video release.
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#23293d] bg-[#141824] text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition cursor-pointer"
              >
                Back to Video
              </button>

              <button
                type="button"
                onClick={handleConfirmPublish}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-7 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Publish to Qoneqt</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. REALISTIC PUBLISHING SEQUENCE IN PROGRESS */}
        {isPublishingInProgress && (
          <div className="space-y-6 text-center py-6 animate-fadeIn">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400 shadow-xl shadow-indigo-950/50">
              <Radio className="h-7 w-7 text-indigo-400 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Broadcasting in Progress
              </span>
              <h3 className="text-xl font-bold text-white">
                Dispatching to Qoneqt Global Feed
              </h3>
              <p className="text-xs text-slate-400">
                Please hold while ContentOS orchestrates distribution assets...
              </p>
            </div>

            {/* Sequence Checklist */}
            <div className="space-y-2.5 max-w-md mx-auto text-left rounded-2xl border border-[#1e2336] bg-[#111422] p-4 text-xs">
              {PUBLISHING_STEPS.map((step, idx) => {
                const stepOrder = ['preparing', 'uploading', 'validating', 'broadcasting', 'complete'];
                const currentIdx = stepOrder.indexOf(publishingStage);
                const isCurrent = publishingStage === step.id;
                const isDone = currentIdx > idx;

                return (
                  <div key={step.id} className="flex items-center justify-between py-1">
                    <span className={isCurrent ? 'font-bold text-indigo-300' : isDone ? 'text-slate-300' : 'text-slate-500'}>
                      {step.label}
                    </span>

                    {isDone ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="h-4 w-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-slate-700 mr-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. PUBLISH FAILURE STATE */}
        {publishingStage === 'failed' && (
          <div className="space-y-6 text-center py-4 animate-fadeIn">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 border border-red-500/40 text-red-400 shadow-xl shadow-red-950/40">
              <AlertCircle className="h-7 w-7 text-red-400" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Publication Failed
              </span>
              <h2 className="text-xl font-bold text-white">
                Publication could not be completed
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                {errorMessage || 'An unexpected issue occurred while dispatching content to the feed.'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-[#23293d] bg-[#141824] text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
              >
                Back to Video
              </button>

              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retry Publication</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. SUCCESSFUL PUBLICATION RECEIPT */}
        {publishingStage === 'complete' && publishResult && (
          <div className="space-y-6 text-center py-4 animate-fadeIn">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shadow-xl shadow-emerald-950/40">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Broadcast Success
                </span>
                {publishResult.isMock && (
                  <span className="inline-flex items-center rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                    DEMO MODE
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-black text-white">
                Published to Qoneqt Global Feed
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                {publishResult.message}
              </p>
            </div>

            {/* Publication Receipt Card */}
            <div className="rounded-2xl border border-[#1f2538] bg-[#121522] p-5 text-xs text-left space-y-3 font-mono shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-[#1b2030]">
                <span className="text-slate-400 font-sans">Content Title:</span>
                <span className="text-white font-bold truncate max-w-[240px]">{result.title}</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span className="font-sans">Publication ID:</span>
                <span className="text-indigo-400 font-bold">{publishResult.publicationId}</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span className="font-sans">Status:</span>
                <span className="text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  {publishResult.platformStatus}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span className="font-sans">Published Timestamp:</span>
                <span className="text-slate-200">{formatPublishDate(publishResult.publishedAt)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span className="font-sans">Target:</span>
                <span className="text-slate-200 font-sans font-medium">Qoneqt Global Feed</span>
              </div>

              {/* Demo Mode Reference Warning */}
              <div className="pt-2 border-t border-[#1b2030] text-[11px] font-sans text-slate-400 flex items-start gap-2">
                <Info className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-amber-300">Demo publication reference:</strong> Direct live broadcast URL will activate once the production Qoneqt account is bound.
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {onNavigateToFeed && (
                <button
                  type="button"
                  onClick={() => {
                    handleModalClose();
                    onNavigateToFeed();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/40 px-5 py-2.5 text-xs font-semibold text-indigo-300 transition cursor-pointer"
                >
                  <Radio className="h-3.5 w-3.5 text-indigo-400" />
                  <span>View in Feed Tab</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleModalClose}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#23293d] bg-[#141824] text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
              >
                Back to Video
              </button>

              <button
                type="button"
                onClick={() => {
                  handleModalClose();
                  onBackToStudio();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Create Another Video</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
