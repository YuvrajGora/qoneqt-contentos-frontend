/**
 * Qoneqt ContentOS - Generation API Client
 * 
 * Abstraction layer between UI components and backend pipeline.
 * Defaults to high-fidelity mock pipeline, immediately swappable with
 * teammate's real FastAPI/Express backend when ready.
 */

import {
  GenerationRequest,
  GenerationStatus,
  GenerationResult,
  RegenerateSceneRequest,
  RegenerateSceneResult,
  PipelineLogEntry,
} from './types';
import {
  createMockJob,
  getMockJobStatus,
  getMockJobResult,
  updateMockJobStatus,
  mockRegenerateScene,
  PIPELINE_STAGES,
} from './mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

function formatTimestamp(): string {
  const now = new Date();
  return now.toTimeString().split(' ')[0]; // "HH:MM:SS"
}

/**
 * Initiates video content generation from a prompt/topic request
 */
export async function generateContent(request: GenerationRequest): Promise<{ jobId: string; status: GenerationStatus }> {
  if (USE_MOCK) {
    const { jobId, status } = createMockJob(request);
    return { jobId, status };
  }

  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Generation API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return { jobId: data.job_id || data.jobId, status: data.status };
}

/**
 * Polls the current status and stage progression of a generation job
 */
export async function getGenerationStatus(jobId: string): Promise<GenerationStatus> {
  if (USE_MOCK) {
    const status = getMockJobStatus(jobId);
    if (!status) {
      throw new Error(`Mock job with ID "${jobId}" not found`);
    }
    return status;
  }

  const response = await fetch(`${API_BASE_URL}/status/${jobId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Status API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches the finalized generation result, complete with scenes and quality score
 */
export async function getGenerationResult(jobId: string): Promise<GenerationResult> {
  if (USE_MOCK) {
    const result = getMockJobResult(jobId);
    if (!result) {
      throw new Error(`Mock job result with ID "${jobId}" not found`);
    }
    return result;
  }

  const response = await fetch(`${API_BASE_URL}/result/${jobId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Result API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Regenerates an individual scene without having to rerun the entire pipeline
 */
export async function regenerateScene(request: RegenerateSceneRequest): Promise<RegenerateSceneResult> {
  if (USE_MOCK) {
    return mockRegenerateScene(request);
  }

  const response = await fetch(`${API_BASE_URL}/regenerate-scene`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Regenerate scene API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Helper to drive the mock asynchronous pipeline lifecycle step-by-step
 * Progresses through all 8 stages, updates activity logs with runtime timestamps,
 * and calls onComplete when the final stage finishes.
 */
export function startMockPipelineSimulation(
  jobId: string,
  onUpdate: (status: GenerationStatus) => void,
  onComplete: (result: GenerationResult) => void,
  onError?: (err: Error) => void
): () => void {
  let isCancelled = false;
  let currentStageIndex = 0;
  const activityLogs: PipelineLogEntry[] = [
    {
      id: `log_init_${Date.now()}`,
      timestamp: formatTimestamp(),
      stageId: 'topic_analysis',
      status: 'active',
      message: 'Ingesting prompt and starting ContentOS autonomous director',
    },
  ];

  async function step() {
    if (isCancelled) return;

    try {
      const stageConfig = PIPELINE_STAGES[currentStageIndex];
      const isLastStage = currentStageIndex === PIPELINE_STAGES.length - 1;
      
      const progressPercent = Math.min(
        100,
        Math.round(((currentStageIndex + 1) / PIPELINE_STAGES.length) * 100)
      );

      const completedStageIds = PIPELINE_STAGES.slice(0, currentStageIndex).map(s => s.id);

      const updatedStages = PIPELINE_STAGES.map((s, idx) => {
        let stageStatus: 'pending' | 'active' | 'completed' | 'failed' = 'pending';
        if (idx < currentStageIndex) stageStatus = 'completed';
        else if (idx === currentStageIndex) stageStatus = 'active';
        return {
          id: s.id,
          number: s.number,
          label: s.label,
          status: stageStatus,
          detail: idx === currentStageIndex ? s.activeDescription : s.description,
        };
      });

      // Append active stage to activity log
      activityLogs.push({
        id: `log_${stageConfig.id}_${Date.now()}`,
        timestamp: formatTimestamp(),
        stageId: stageConfig.id,
        status: 'active',
        message: stageConfig.logMessage,
      });

      const updatedStatus = updateMockJobStatus(jobId, {
        status: 'processing',
        progress: progressPercent,
        currentStage: stageConfig.id,
        currentStageLabel: stageConfig.label,
        completedStages: completedStageIds,
        stages: updatedStages,
        activityLogs: [...activityLogs],
        estimatedTimeRemainingSec: Math.max(
          1,
          Math.round(
            PIPELINE_STAGES.slice(currentStageIndex).reduce((acc, s) => acc + s.estimatedDurationMs, 0) / 1000
          )
        ),
      });

      if (updatedStatus) {
        onUpdate(updatedStatus);
      }

      // Wait for simulated latency of this specific pipeline stage
      await new Promise(r => setTimeout(r, stageConfig.estimatedDurationMs));

      if (isCancelled) return;

      // Update the log item to completed
      const lastLog = activityLogs[activityLogs.length - 1];
      if (lastLog) {
        lastLog.status = 'completed';
      }

      if (isLastStage) {
        // Mark all 8 stages completed
        const finalStages = PIPELINE_STAGES.map(s => ({
          id: s.id,
          number: s.number,
          label: s.label,
          status: 'completed' as const,
          detail: s.description,
        }));

        activityLogs.push({
          id: `log_complete_${Date.now()}`,
          timestamp: formatTimestamp(),
          stageId: 'ready_to_publish',
          status: 'completed',
          message: 'Video pipeline complete. Quality verified and ready for review.',
        });

        const finalStatus = updateMockJobStatus(jobId, {
          status: 'completed',
          progress: 100,
          currentStage: null,
          currentStageLabel: 'Ready to Publish',
          completedStages: PIPELINE_STAGES.map(s => s.id),
          stages: finalStages,
          activityLogs: [...activityLogs],
          estimatedTimeRemainingSec: 0,
        });

        if (finalStatus) {
          onUpdate(finalStatus);
        }

        const result = getMockJobResult(jobId);
        if (result) {
          onComplete(result);
        }
      } else {
        currentStageIndex++;
        step();
      }
    } catch (err) {
      if (!isCancelled && onError) {
        onError(err instanceof Error ? err : new Error(String(err)));
      }
    }
  }

  // Start initial step
  step();

  return () => {
    isCancelled = true;
  };
}
