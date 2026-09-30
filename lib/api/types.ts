/**
 * Qoneqt ContentOS - Core API and Domain Types
 * 
 * Defines the contract between the frontend UI and the content production pipeline.
 * Designed to seamlessly transition from mock development to real backend integration.
 */

export type ContentType = 
  | 'educational'
  | 'news'
  | 'explainer'
  | 'trending'
  | 'story'
  | 'promotional';

export type ContentStyle = 
  | 'professional'
  | 'energetic'
  | 'cinematic'
  | 'conversational';

export type VideoDuration = 15 | 30 | 45 | 60;

export type PipelineStageId = 
  | 'topic_analysis'
  | 'script_generation'
  | 'scene_planning'
  | 'visual_generation'
  | 'voice_generation'
  | 'video_composition'
  | 'quality_check'
  | 'ready_to_publish';

export interface PipelineStageConfig {
  id: PipelineStageId;
  number: string;
  label: string;
  description: string;
  activeDescription: string;
  logMessage: string;
  estimatedDurationMs: number;
}

export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export type SceneStatus = 'pending' | 'generating' | 'completed' | 'failed';

export interface GenerationRequest {
  topic: string;
  contentType: ContentType;
  duration: VideoDuration;
  style: ContentStyle;
  targetAudience?: string;
  customInstructions?: string;
}

export interface PipelineStageState {
  id: PipelineStageId;
  number: string;
  label: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  startedAt?: string;
  completedAt?: string;
  detail?: string;
}

export interface PipelineLogEntry {
  id: string;
  timestamp: string;
  stageId: PipelineStageId;
  status: 'pending' | 'active' | 'completed' | 'failed';
  message: string;
}

export interface GenerationStatus {
  jobId: string;
  status: JobStatus;
  progress: number; // 0 - 100
  currentStage: PipelineStageId | null;
  currentStageLabel: string;
  completedStages: PipelineStageId[];
  stages: PipelineStageState[];
  activityLogs: PipelineLogEntry[];
  estimatedTimeRemainingSec?: number;
  error?: string | null;
  startedAt: string;
  updatedAt: string;
}

export interface Scene {
  id: string;
  order: number;
  duration: number; // in seconds
  narration: string;
  visualDescription: string;
  status: SceneStatus;
  imageUrl?: string;
  audioUrl?: string;
  captionExcerpt?: string;
  transition?: string;
  isRegenerating?: boolean;
}

export interface QualityCheckItem {
  id: string;
  label: string;
  description: string;
  passed: boolean;
}

export interface QualityCheckStatus {
  passed: boolean;
  score: number; // 0 - 100
  checks: QualityCheckItem[];
  readyForPublishing: boolean;
}

export interface GenerationResult {
  jobId: string;
  topic: string;
  contentType: ContentType;
  style: ContentStyle;
  duration: number; // total duration in seconds
  title: string;
  hook: string;
  script: string;
  scenes: Scene[];
  videoUrl?: string;
  thumbnailUrl?: string;
  qualityStatus: QualityCheckStatus;
  createdAt: string;
  updatedAt: string;
}

export interface RegenerateSceneRequest {
  jobId: string;
  sceneId: string;
  visualPromptModifier?: string;
  narrationModifier?: string;
}

export interface RegenerateSceneResult {
  jobId: string;
  scene: Scene;
  updatedAt: string;
}

export interface PublishRequest {
  jobId: string;
  title: string;
  description: string;
  tags?: string[];
  contentType: ContentType;
  duration: number;
  videoUrl?: string;
  thumbnailUrl?: string;
}

export interface PublishResult {
  success: boolean;
  publicationId: string;
  publishedAt: string;
  qoneqtUrl: string;
  platformStatus: 'live' | 'processing' | 'scheduled';
  message: string;
  isMock?: boolean;
}
