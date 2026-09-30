'use client';

import React, { useState } from 'react';
import { 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Layers, 
  AlertCircle
} from 'lucide-react';
import { Scene } from '@/lib/api/types';
import { regenerateScene } from '@/lib/api/generation';

interface CompactSceneListProps {
  jobId: string;
  scenes: Scene[];
  onSceneUpdated: (updatedScene: Scene) => void;
}

export function CompactSceneList({
  jobId,
  scenes,
  onSceneUpdated,
}: CompactSceneListProps) {
  const [regeneratingSceneId, setRegeneratingSceneId] = useState<string | null>(null);
  const [successSceneId, setSuccessSceneId] = useState<string | null>(null);
  const [errorSceneId, setErrorSceneId] = useState<string | null>(null);

  const handleRegenerate = async (sceneId: string) => {
    setRegeneratingSceneId(sceneId);
    setErrorSceneId(null);
    setSuccessSceneId(null);

    try {
      const res = await regenerateScene({
        jobId,
        sceneId,
      });

      // Update parent scene state
      onSceneUpdated(res.scene);

      setSuccessSceneId(sceneId);
      setTimeout(() => {
        setSuccessSceneId((current) => (current === sceneId ? null : current));
      }, 3500);
    } catch {
      setErrorSceneId(sceneId);
    } finally {
      setRegeneratingSceneId(null);
    }
  };

  return (
    <div className="rounded-2xl border border-[#1e2230] bg-[#0d1017] p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#1b2030] pb-4">
        <div className="flex items-center gap-2.5">
          <Layers className="h-4 w-4 text-indigo-400" />
          <h3 className="text-base font-bold text-white tracking-tight">
            Scenes
          </h3>
          <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-xs font-semibold text-indigo-300">
            {scenes.length} Segments
          </span>
        </div>
        <span className="text-xs text-slate-400">
          Independent scene-level AI re-rendering
        </span>
      </div>

      {/* Compact Scene List */}
      <div className="space-y-2.5">
        {scenes.map((scene) => {
          const isRegen = regeneratingSceneId === scene.id;
          const isSuccess = successSceneId === scene.id;
          const isErr = errorSceneId === scene.id;
          const formattedNumber = String(scene.order).padStart(2, '0');

          return (
            <div
              key={scene.id}
              className={`rounded-xl border p-3.5 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isRegen
                  ? 'border-indigo-500/50 bg-indigo-950/20 ring-1 ring-indigo-500/30'
                  : isSuccess
                  ? 'border-emerald-500/40 bg-emerald-950/20'
                  : isErr
                  ? 'border-red-500/40 bg-red-950/20'
                  : 'border-[#1b2030] bg-[#111420] hover:border-slate-700/70'
              }`}
            >
              {/* Scene Number & Duration & Narration Preview */}
              <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#181d2c] border border-[#272e44] font-mono text-xs font-bold text-indigo-300">
                  {formattedNumber}
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">
                      Scene {formattedNumber}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
                      <Clock className="h-3 w-3 text-slate-500" />
                      {scene.duration.toFixed(1)}s
                    </span>

                    {/* Status Pill */}
                    {isRegen ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                        <RefreshCw className="h-2.5 w-2.5 animate-spin" />
                        <span>Regenerating...</span>
                      </span>
                    ) : isSuccess ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
                        <span>Regenerated</span>
                      </span>
                    ) : isErr ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                        <AlertCircle className="h-2.5 w-2.5 text-red-400" />
                        <span>Failed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        <span>Ready</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 truncate max-w-md sm:max-w-lg">
                    {scene.narration || scene.visualDescription}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-end shrink-0 sm:self-center">
                <button
                  type="button"
                  onClick={() => handleRegenerate(scene.id)}
                  disabled={!!regeneratingSceneId}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${
                    isRegen
                      ? 'bg-indigo-600/30 text-indigo-300 cursor-wait'
                      : 'border border-[#282f45] bg-[#141826] text-slate-300 hover:border-indigo-500/50 hover:bg-indigo-600/15 hover:text-white'
                  }`}
                >
                  <RefreshCw
                    className={`h-3 w-3 ${isRegen ? 'animate-spin text-indigo-400' : 'text-slate-400'}`}
                  />
                  <span>{isRegen ? 'Rendering...' : 'Regenerate'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
