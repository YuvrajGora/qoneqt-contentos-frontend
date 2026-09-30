'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { 
  GenerationRequest, 
  GenerationStatus, 
  GenerationResult,
} from '@/lib/api/types';
import { 
  startMockPipelineSimulation 
} from '@/lib/api/generation';
import { PipelineStageItem } from './PipelineStageItem';
import { PipelineDetailPanel } from './PipelineDetailPanel';
import { PipelineActivityLog } from './PipelineActivityLog';
import { InputSummaryCard } from './InputSummaryCard';
import { GenerationCompletionCard } from './GenerationCompletionCard';
import { GenerationErrorCard } from './GenerationErrorCard';

interface GenerationWorkspaceProps {
  jobId: string;
  request: GenerationRequest;
  initialStatus: GenerationStatus;
  onReviewContent: (result: GenerationResult) => void;
  onBackToStudio: () => void;
}

export function GenerationWorkspace({
  jobId,
  request,
  initialStatus,
  onReviewContent,
  onBackToStudio,
}: GenerationWorkspaceProps) {
  const [status, setStatus] = useState<GenerationStatus>(initialStatus);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const simulationAbortRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Trigger simulation via clean API client abstraction
    simulationAbortRef.current = startMockPipelineSimulation(
      jobId,
      (updatedStatus) => {
        setStatus(updatedStatus);
      },
      (completedResult) => {
        setResult(completedResult);
      },
      (err) => {
        setError(err.message || 'Pipeline synthesis failed');
      }
    );

    return () => {
      simulationAbortRef.current?.();
      simulationAbortRef.current = null;
    };
  }, [jobId]);

  const handleRetry = () => {
    setError(null);
    setResult(null);
    simulationAbortRef.current?.();
    simulationAbortRef.current = startMockPipelineSimulation(
      jobId,
      (updatedStatus) => setStatus(updatedStatus),
      (completedResult) => setResult(completedResult),
      (err) => setError(err.message || 'Pipeline synthesis failed')
    );
  };

  const isComplete = status.status === 'completed' && !!result;
  const activeStage = status.stages.find((s) => s.status === 'active') || null;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1b2030]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
              Qoneqt ContentOS
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-400">Generation Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-0.5">
            Autonomous Video Director
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
              Active Job
            </span>
            <span className="font-mono text-xs font-semibold text-slate-300">
              {jobId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isComplete ? (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Ready to Review</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-semibold text-indigo-300">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" />
                <span>Generating ({status.progress}%)</span>
              </span>
            )}

            <button
              type="button"
              onClick={onBackToStudio}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#23293d] bg-[#141824] px-3.5 py-2 text-xs font-medium text-slate-400 hover:border-slate-600 hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <GenerationErrorCard
          error={error}
          onRetry={handleRetry}
          onBackToStudio={onBackToStudio}
        />
      )}

      {/* Completion state card */}
      {isComplete && result && (
        <GenerationCompletionCard
          result={result}
          onReviewContent={() => onReviewContent(result)}
          onBackToStudio={onBackToStudio}
        />
      )}

      {/* Active Pipeline Progression View */}
      {!error && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Active Stage & 8-Stage Pipeline (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Active Stage Detail Banner (Only when still generating) */}
            {!isComplete && (
              <PipelineDetailPanel
                currentStage={activeStage}
                overallProgress={status.progress}
              />
            )}

            {/* 8 Pipeline Stages List */}
            <div className="rounded-2xl border border-[#1e2230] bg-[#0d1017] p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1b1f2e]">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ContentOS Pipeline Stages
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {status.completedStages.length} / {status.stages.length} Completed
                </span>
              </div>

              <div className="space-y-2">
                {status.stages.map((stage) => (
                  <PipelineStageItem
                    key={stage.id}
                    stage={stage}
                    isActive={stage.status === 'active'}
                    isCompleted={stage.status === 'completed'}
                    isPending={stage.status === 'pending'}
                    isFailed={stage.status === 'failed'}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Source Idea, Telemetry, and Activity Log (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Input Summary */}
            <InputSummaryCard
              request={request}
              status={status}
              estimatedScenesCount={
                request.duration === 15 ? 3 : request.duration === 30 ? 5 : request.duration === 45 ? 7 : 8
              }
            />

            {/* Live Activity Log */}
            <PipelineActivityLog logs={status.activityLogs || []} />
          </div>
        </div>
      )}
    </div>
  );
}
