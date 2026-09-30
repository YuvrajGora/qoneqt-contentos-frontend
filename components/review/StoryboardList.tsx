'use client';

import React from 'react';
import { Film } from 'lucide-react';
import { Scene } from '@/lib/api/types';
import { SceneCard } from './SceneCard';

interface StoryboardListProps {
  scenes: Scene[];
  regeneratingSceneId: string | null;
  successSceneId: string | null;
  errorSceneId: string | null;
  onRegenerateScene: (sceneId: string) => void;
  onRetryScene: (sceneId: string) => void;
}

export function StoryboardList({
  scenes,
  regeneratingSceneId,
  successSceneId,
  errorSceneId,
  onRegenerateScene,
  onRetryScene,
}: StoryboardListProps) {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1b2030]">
        <div>
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4 text-indigo-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Storyboard
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Review each scene before final video composition.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e2334] bg-[#0c0e15] px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            <span>{(scenes || []).length} Story Beats Planned</span>
          </span>
        </div>
      </div>

      {/* Scene Cards Stack */}
      <div className="space-y-4">
        {(scenes || []).map((scene) => (
          <SceneCard
            key={scene.id}
            scene={scene}
            isRegenerating={regeneratingSceneId === scene.id}
            isSuccess={successSceneId === scene.id}
            error={errorSceneId === scene.id ? 'Regeneration failed' : null}
            onRegenerate={onRegenerateScene}
            onRetry={onRetryScene}
          />
        ))}
      </div>
    </div>
  );
}
