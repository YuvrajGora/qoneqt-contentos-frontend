'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Radio, 
  AlertCircle, 
  PlusCircle,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { GenerationResult, Scene, PublishResult } from '@/lib/api/types';
import { VideoPlayer } from './VideoPlayer';
import { VideoInformation } from './VideoInformation';
import { VideoMetadataCards } from './VideoMetadataCards';
import { BroadcastQualityCheck } from './BroadcastQualityCheck';
import { ProductionSummary } from './ProductionSummary';
import { CompactSceneList } from './CompactSceneList';
import { PublishingConfirmationModal, PublicationReceiptCard } from '@/components/publishing';

export interface VideoResultWorkspaceProps {
  result: GenerationResult;
  onBackToReview: () => void;
  onBackToStudio: () => void;
  onNavigateToFeed?: () => void;
  onUpdateResult?: (updated: GenerationResult) => void;
  publicationResult?: PublishResult | null;
  onPublishSuccess?: (published: PublishResult) => void;
}

export function VideoResultWorkspace({
  result,
  onBackToReview,
  onBackToStudio,
  onNavigateToFeed,
  onUpdateResult,
  publicationResult,
  onPublishSuccess,
}: VideoResultWorkspaceProps) {
  const [scenes, setScenes] = useState<Scene[]>(result.scenes);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [publishedData, setPublishedData] = useState<PublishResult | null>(publicationResult || null);

  const handlePublishSuccess = (res: PublishResult) => {
    setPublishedData(res);
    if (onPublishSuccess) {
      onPublishSuccess(res);
    }
  };

  // Quality readiness check
  const isQualityReady = 
    result.qualityStatus.passed && 
    result.qualityStatus.readyForPublishing && 
    result.qualityStatus.checks.every(c => c.passed);

  // Handle scene-level regeneration update
  const handleSceneUpdated = (updatedScene: Scene) => {
    const updatedScenes = scenes.map((s) => (s.id === updatedScene.id ? updatedScene : s));
    setScenes(updatedScenes);

    if (onUpdateResult) {
      onUpdateResult({
        ...result,
        scenes: updatedScenes,
        script: updatedScenes.map(s => s.narration).join('\n\n'),
      });
    }
  };

  const handleCopyShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-24">
      {/* Top Header & Navigation Ribbon */}
      <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-[#0d101d] to-[#090b12] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                Milestone 6 Publishing
              </span>
              {publishedData ? (
                <>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    <span>PUBLISHED TO FEED</span>
                  </span>
                  {publishedData.isMock && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                      DEMO MODE
                    </span>
                  )}
                </>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Production Complete</span>
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Final Video Production Workspace
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              {publishedData 
                ? 'This video has been successfully published to the Qoneqt Global Feed.' 
                : 'Your content has been transformed into a broadcast-ready 9:16 vertical video package.'}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onBackToReview}
              className="inline-flex items-center gap-2 rounded-xl border border-[#23293d] bg-[#141824] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:border-slate-600 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Review</span>
            </button>

            <button
              type="button"
              onClick={onBackToStudio}
              className="inline-flex items-center gap-2 rounded-xl border border-[#23293d] bg-[#141824] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:border-slate-600 hover:text-white transition cursor-pointer"
            >
              <PlusCircle className="h-3.5 w-3.5 text-indigo-400" />
              <span>Create Another</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Dominated by the 9:16 Vertical Video Player (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-4 lg:sticky lg:top-6">
          <div className="w-full">
            <VideoPlayer
              videoUrl={result.videoUrl}
              thumbnailUrl={result.thumbnailUrl}
              duration={result.duration}
              scenes={scenes}
              title={result.title}
            />
          </div>

          {/* Auxiliary video player actions */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[390px] flex items-center justify-between px-2 text-xs text-slate-400">
            <span className="font-mono text-[11px] text-slate-500 truncate max-w-[180px]">
              ID: {result.jobId}
            </span>

            <button
              type="button"
              onClick={handleCopyShare}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-indigo-400 transition cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Link!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share Asset</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Metadata, Quality Check, Pipeline & Scene Access (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Publication Receipt Card if already published */}
          {publishedData && (
            <PublicationReceiptCard
              publication={publishedData}
              title={result.title}
              onViewReceipt={() => setIsPublishModalOpen(true)}
              onBackToStudio={onBackToStudio}
            />
          )}

          {/* 1. Title, Hook & Script Summary */}
          <VideoInformation
            title={result.title}
            hook={result.hook}
            script={result.script}
            topic={result.topic}
          />

          {/* 2. Compact Video Metadata Cards */}
          <VideoMetadataCards
            duration={result.duration}
            sceneCount={scenes.length}
            contentType={result.contentType}
            style={result.style}
            status={publishedData ? 'Published' : 'Ready'}
          />

          {/* 3. Broadcast Quality Check Panel */}
          <BroadcastQualityCheck qualityStatus={result.qualityStatus} />

          {/* 4. Content Pipeline Production Summary */}
          <ProductionSummary />

          {/* 5. Compact Scene Access with Regeneration */}
          <CompactSceneList
            jobId={result.jobId}
            scenes={scenes}
            onSceneUpdated={handleSceneUpdated}
          />
        </div>
      </div>

      {/* Primary Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#1e2230] bg-[#090b12]/95 backdrop-blur-lg px-4 py-3.5 shadow-2xl">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left Context Info */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToReview}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#23293d] bg-[#141824] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:border-slate-600 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Review</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <span>Quality:</span>
              <span className="font-bold text-emerald-400">
                {result.qualityStatus.score}/100 Broadcast Grade
              </span>
            </div>
          </div>

          {/* Right Action: Publish CTA vs Already Published State */}
          {publishedData ? (
            /* Already Published State */
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2.5 text-xs font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Published to Qoneqt</span>
              </div>

              <button
                type="button"
                onClick={() => setIsPublishModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#23293d] bg-[#141824] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition cursor-pointer"
              >
                <span>View Receipt</span>
              </button>

              <button
                type="button"
                onClick={onBackToStudio}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 px-6 py-2.5 text-xs font-bold text-white shadow-lg transition cursor-pointer"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span>Create Another</span>
              </button>
            </div>
          ) : (
            /* Ready to Publish CTA */
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {!isQualityReady && (
                <span className="text-xs text-amber-400 flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Fix quality checks before publishing</span>
                </span>
              )}

              <button
                type="button"
                onClick={() => setIsPublishModalOpen(true)}
                disabled={!isQualityReady}
                title={isQualityReady ? 'Publish video to Qoneqt Global Feed' : 'Quality checks must pass to publish'}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3 text-sm font-bold text-white shadow-xl transition-all cursor-pointer ${
                  isQualityReady
                    ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <Radio className="h-4 w-4 animate-pulse" />
                <span>Publish to Qoneqt</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Publishing Confirmation Experience Modal */}
      <PublishingConfirmationModal
        result={{ ...result, scenes }}
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublishSuccess={handlePublishSuccess}
        onNavigateToFeed={onNavigateToFeed}
        onBackToStudio={onBackToStudio}
      />
    </div>
  );
}
