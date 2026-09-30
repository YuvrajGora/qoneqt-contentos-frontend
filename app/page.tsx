'use client';

import React, { useState } from 'react';
import { 
  Header, 
  Sidebar 
} from '@/components/layout';
import { 
  CreateContentForm, 
  PipelinePreviewBar 
} from '@/components/content';
import { 
  GenerationWorkspace 
} from '@/components/generation';
import { 
  ReviewWorkspace 
} from '@/components/review';
import { 
  VideoResultPlaceholder 
} from '@/components/video';
import { 
  GenerationRequest, 
  GenerationStatus, 
  GenerationResult,
  PublishResult 
} from '@/lib/api/types';
import { Sparkles, Radio } from 'lucide-react';

interface ActiveJobState {
  jobId: string;
  request: GenerationRequest;
  status: GenerationStatus;
}

export default function ContentStudioPage() {
  const [currentTab, setCurrentTab] = useState<'studio' | 'generation' | 'review' | 'result' | 'feed'>('studio');
  const [activeJob, setActiveJob] = useState<ActiveJobState | null>(null);
  const [activeResult, setActiveResult] = useState<GenerationResult | null>(null);
  const [hasCreatedVideo, setHasCreatedVideo] = useState(false);
  const [publicationResult, setPublicationResult] = useState<PublishResult | null>(null);

  const handleGenerationStarted = (
    jobId: string, 
    request: GenerationRequest, 
    status: GenerationStatus
  ) => {
    setActiveJob({ jobId, request, status });
    setActiveResult(null);
    setHasCreatedVideo(false);
    setPublicationResult(null);
    setCurrentTab('generation');
  };

  const handleReviewContent = (result: GenerationResult) => {
    setActiveResult(result);
    setCurrentTab('review');
  };

  const handleCreateVideo = (updatedResult?: GenerationResult) => {
    if (updatedResult) {
      setActiveResult(updatedResult);
    }
    setHasCreatedVideo(true);
    setCurrentTab('result');
  };

  const handleBackToStudio = () => {
    setCurrentTab('studio');
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col bg-grid-subtle">
      {/* Top Header */}
      <Header onReset={handleBackToStudio} />

      {/* Main Workspace with Sidebar Rail */}
      <div className="flex flex-1">
        {/* Navigation Rail */}
        <Sidebar 
          currentTab={currentTab} 
          onSelectTab={setCurrentTab}
          hasActiveJob={!!activeJob}
          hasResult={!!activeResult}
          hasComposedVideo={hasCreatedVideo || currentTab === 'result'}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto w-full">
          {currentTab === 'studio' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Studio Title & Positioning */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI Content Director</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                  Create something worth watching.
                </h1>
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
                  Turn a topic, idea, or trend into a ready-to-publish video for the Qoneqt Global Feed.
                </p>
              </div>

              {/* Visual Pipeline Progression Ribbon */}
              <PipelinePreviewBar />

              {/* Core Content Form */}
              <CreateContentForm onGenerationStarted={handleGenerationStarted} />
            </div>
          )}

          {currentTab === 'generation' && activeJob && (
            <GenerationWorkspace
              jobId={activeJob.jobId}
              request={activeJob.request}
              initialStatus={activeJob.status}
              onReviewContent={handleReviewContent}
              onBackToStudio={handleBackToStudio}
            />
          )}

          {currentTab === 'review' && activeResult && (
            <ReviewWorkspace
              result={activeResult}
              onCreateVideo={handleCreateVideo}
              onBackToStudio={handleBackToStudio}
            />
          )}

          {currentTab === 'result' && activeResult && (
            <VideoResultPlaceholder
              result={activeResult}
              onBackToReview={() => setCurrentTab('review')}
              onBackToStudio={handleBackToStudio}
              onNavigateToFeed={() => setCurrentTab('feed')}
              onUpdateResult={(updated) => setActiveResult(updated)}
              publicationResult={publicationResult}
              onPublishSuccess={(res) => setPublicationResult(res)}
            />
          )}

          {/* State Fallback Card when a pipeline tab is selected without an active job/result */}
          {((currentTab === 'generation' && !activeJob) ||
            (currentTab === 'review' && !activeResult) ||
            (currentTab === 'result' && !activeResult)) && (
            <div className="rounded-2xl border border-[#1e2230] bg-[#0d1017] p-10 text-center space-y-4 max-w-lg mx-auto animate-fadeIn mt-12">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Sparkles className="h-7 w-7 text-indigo-400" />
              </div>
              <h2 className="text-xl font-bold text-white">No Active Production Job</h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                You are viewing a pipeline stage that requires an active video production job. Start by entering a topic in the Content Studio.
              </p>
              <button
                type="button"
                onClick={handleBackToStudio}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition cursor-pointer"
              >
                Return to Content Studio
              </button>
            </div>
          )}

          {currentTab === 'feed' && (
            <div className="rounded-2xl border border-[#1e2230] bg-[#0d1017] p-8 text-center space-y-5 max-w-xl mx-auto animate-fadeIn">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Radio className="h-7 w-7 text-indigo-400 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Qoneqt Global Feed Integration</h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                  Direct distribution channel to the Qoneqt short-form video discovery network.
                </p>
              </div>

              {publicationResult ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs text-left space-y-2 font-mono">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-sans">Latest Broadcast:</span>
                    <span className="text-emerald-400 font-bold uppercase">{publicationResult.platformStatus}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="font-sans">Publication ID:</span>
                    <span className="text-indigo-400">{publicationResult.publicationId}</span>
                  </div>
                  <div className="text-[11px] font-sans text-slate-400 pt-1 border-t border-[#1a2030]">
                    Algorithmic distribution active across all short-form viewer channels.
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">
                  No video broadcast yet. Create and publish a video in Content Studio to see it listed here.
                </p>
              )}

              <button
                type="button"
                onClick={handleBackToStudio}
                className="mt-2 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition cursor-pointer"
              >
                Return to Content Studio
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
