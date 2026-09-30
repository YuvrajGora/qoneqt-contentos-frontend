'use client';

import React, { useState } from 'react';
import { GenerationResult, Scene } from '@/lib/api/types';
import { regenerateScene } from '@/lib/api/generation';
import { ReviewHeader } from './ReviewHeader';
import { StoryOverviewCard } from './StoryOverviewCard';
import { StoryboardList } from './StoryboardList';
import { ContentReadinessCard } from './ContentReadinessCard';
import { ReviewActionBar } from './ReviewActionBar';

interface ReviewWorkspaceProps {
  result: GenerationResult;
  onCreateVideo: (updatedResult?: GenerationResult) => void;
  onBackToStudio: () => void;
}

export function ReviewWorkspace({
  result,
  onCreateVideo,
  onBackToStudio,
}: ReviewWorkspaceProps) {
  // Local state for scenes allowing single-scene update
  const [scenes, setScenes] = useState<Scene[]>(result.scenes);
  const [regeneratingSceneId, setRegeneratingSceneId] = useState<string | null>(null);
  const [successSceneId, setSuccessSceneId] = useState<string | null>(null);
  const [errorSceneId, setErrorSceneId] = useState<string | null>(null);

  const handleRegenerateScene = async (sceneId: string) => {
    setRegeneratingSceneId(sceneId);
    setErrorSceneId(null);
    setSuccessSceneId(null);

    try {
      // Call existing API client abstraction
      const res = await regenerateScene({
        jobId: result.jobId,
        sceneId,
      });

      // Update only the targeted scene; keep all other scenes untouched
      setScenes((prev) =>
        prev.map((s) => (s.id === sceneId ? res.scene : s))
      );

      setSuccessSceneId(sceneId);
      // Auto-clear success pill after 3.5 seconds
      setTimeout(() => {
        setSuccessSceneId((current) => (current === sceneId ? null : current));
      }, 3500);
    } catch {
      setErrorSceneId(sceneId);
    } finally {
      setRegeneratingSceneId(null);
    }
  };

  const handleRetryScene = (sceneId: string) => {
    handleRegenerateScene(sceneId);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Top Header */}
      <ReviewHeader result={result} onBackToStudio={onBackToStudio} />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Story Overview & Storyboard Stack (8 Cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Story Overview */}
          <StoryOverviewCard
            title={result.title}
            hook={result.hook}
            scenes={scenes}
          />

          {/* Storyboard List */}
          <StoryboardList
            scenes={scenes}
            regeneratingSceneId={regeneratingSceneId}
            successSceneId={successSceneId}
            errorSceneId={errorSceneId}
            onRegenerateScene={handleRegenerateScene}
            onRetryScene={handleRetryScene}
          />
        </div>

        {/* Right Column: Content Readiness & Metrics Telemetry (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <ContentReadinessCard result={result} />
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <ReviewActionBar
        onCreateVideo={() => onCreateVideo({ ...result, scenes })}
        onBackToStudio={onBackToStudio}
        isSubmitting={!!regeneratingSceneId}
      />
    </div>
  );
}
