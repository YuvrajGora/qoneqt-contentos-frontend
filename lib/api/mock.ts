import {
  GenerationRequest,
  GenerationStatus,
  GenerationResult,
  Scene,
  PipelineStageConfig,
  QualityCheckStatus,
  PublishRequest,
  PublishResult,
  RegenerateSceneRequest,
  RegenerateSceneResult,
  PipelineLogEntry,
} from './types';

export const PIPELINE_STAGES: PipelineStageConfig[] = [
  {
    id: 'topic_analysis',
    number: '01',
    label: 'Topic Analysis',
    description: 'Understanding the topic, audience and content intent.',
    activeDescription: 'Analyzing intent, audience profile, and hook mechanics from the prompt.',
    logMessage: 'Topic analyzed and intent vectors synthesized',
    estimatedDurationMs: 1500,
  },
  {
    id: 'script_generation',
    number: '02',
    label: 'Script Generation',
    description: 'Creating the hook, narrative structure and voiceover.',
    activeDescription: 'Synthesizing viral structure, dynamic hook, and high-retention pacing.',
    logMessage: 'Hook and viral narrative structure created',
    estimatedDurationMs: 1800,
  },
  {
    id: 'scene_planning',
    number: '03',
    label: 'Scene Planning',
    description: 'Breaking the story into visually engaging scenes.',
    activeDescription: 'Breaking the generated story into short-form visual scenes.',
    logMessage: 'Scene plan created: 5 dynamic storyboard beats',
    estimatedDurationMs: 1700,
  },
  {
    id: 'visual_generation',
    number: '04',
    label: 'Visual Generation',
    description: 'Preparing visual assets for each scene.',
    activeDescription: 'Generating cinematic keyframes and contextual AI visuals.',
    logMessage: 'Visual keyframe assets rendered and verified',
    estimatedDurationMs: 2400,
  },
  {
    id: 'voice_generation',
    number: '05',
    label: 'Voice Generation',
    description: 'Generating natural narration for the video.',
    activeDescription: 'Synthesizing studio-grade narration with emotional cadence.',
    logMessage: 'Voice narration mastered at -14 LUFS target',
    estimatedDurationMs: 1900,
  },
  {
    id: 'video_composition',
    number: '06',
    label: 'Video Composition',
    description: 'Combining visuals, narration, captions and transitions.',
    activeDescription: 'Rendering 9:16 vertical stream with kinetic captions and motion cuts.',
    logMessage: 'FFmpeg composite rendered with kinetic captions',
    estimatedDurationMs: 2500,
  },
  {
    id: 'quality_check',
    number: '07',
    label: 'Quality Check',
    description: 'Validating video, audio, scenes, captions and duration.',
    activeDescription: 'Validating aspect ratio, audio loudness, audio-text sync, and pacing.',
    logMessage: 'Quality checks passed: Score 98/100 broadcast grade',
    estimatedDurationMs: 1800,
  },
  {
    id: 'ready_to_publish',
    number: '08',
    label: 'Ready to Publish',
    description: 'Your video has passed the production pipeline.',
    activeDescription: 'Finalizing distribution payload for the Qoneqt Global Feed.',
    logMessage: 'Ready to publish to Qoneqt Global Feed',
    estimatedDurationMs: 1400,
  },
];

// In-memory store for mock jobs to persist through user flow in current session
const mockJobsStore = new Map<string, {
  request: GenerationRequest;
  status: GenerationStatus;
  result: GenerationResult;
}>();

function formatCurrentTimestamp(): string {
  const now = new Date();
  return now.toTimeString().split(' ')[0]; // "HH:MM:SS"
}

function generateMockScenes(request: GenerationRequest): Scene[] {
  const duration = request.duration;
  // Determine number of scenes based on duration (roughly 4-6 seconds per scene)
  const sceneCount = duration === 15 ? 3 : duration === 30 ? 5 : duration === 45 ? 7 : 8;
  const avgSceneDuration = Number((duration / sceneCount).toFixed(1));

  const scenes: Scene[] = [
    {
      id: 'scene-01',
      order: 1,
      duration: avgSceneDuration,
      narration: `Here is the truth nobody tells you about ${request.topic.toLowerCase() || 'AI agents'}: everything is changing faster than you think.`,
      visualDescription: 'Dramatic macro shot of neon neural networks converging into an intuitive glass tablet interface in an executive studio.',
      status: 'completed',
      captionExcerpt: 'Here is the truth nobody tells you...',
      transition: 'Quick zoom cut with lens blur',
    },
    {
      id: 'scene-02',
      order: 2,
      duration: avgSceneDuration,
      narration: `Instead of isolated chatbots answering questions, autonomous systems now collaborate in real-time pipelines.`,
      visualDescription: 'Isometric holographic visualization displaying multi-agent nodes communicating with glowing data streams.',
      status: 'completed',
      captionExcerpt: 'Autonomous systems collaborate in real-time pipelines...',
      transition: 'Cross dissolve with kinetic swipe',
    },
    {
      id: 'scene-03',
      order: 3,
      duration: avgSceneDuration,
      narration: `One plans the architecture, another generates the visuals, while a third orchestrates the delivery in seconds.`,
      visualDescription: 'Split three-way modern minimalist workspace showing simultaneous autonomous execution and real-time output.',
      status: 'completed',
      captionExcerpt: 'One plans, another generates, a third orchestrates...',
      transition: 'Vertical whip pan',
    },
  ];

  if (sceneCount >= 4) {
    scenes.push({
      id: 'scene-04',
      order: 4,
      duration: avgSceneDuration,
      narration: `The friction between raw imagination and broadcast-grade production has essentially evaporated.`,
      visualDescription: 'Ultra-sleek high-framerate timeline UI rendering 4K vertical video assets with glowing audio waveforms.',
      status: 'completed',
      captionExcerpt: 'The friction has essentially evaporated...',
      transition: 'Match cut to timeline',
    });
  }

  if (sceneCount >= 5) {
    scenes.push({
      id: 'scene-05',
      order: 5,
      duration: avgSceneDuration,
      narration: `The creators and operators who leverage repeatable pipelines today will dominate the global feed tomorrow.`,
      visualDescription: 'Dynamic low-angle cinematic shot of a modern creator in a dark ambient studio illuminated by multi-screen displays.',
      status: 'completed',
      captionExcerpt: 'Leverage repeatable pipelines today...',
      transition: 'Subtle push-in fade',
    });
  }

  if (sceneCount >= 6) {
    scenes.push({
      id: 'scene-06',
      order: 6,
      duration: avgSceneDuration,
      narration: `Scalability is no longer about human headcount; it is about autonomous orchestration.`,
      visualDescription: 'Floating glass cards visualizing global distribution metrics and instantaneous audience engagement graphs.',
      status: 'completed',
      captionExcerpt: 'Scalability is about orchestration...',
      transition: 'Glitch dissolve',
    });
  }

  if (sceneCount >= 7) {
    scenes.push({
      id: 'scene-07',
      order: 7,
      duration: avgSceneDuration,
      narration: `Ready to turn your next idea into publishable content in under a minute?`,
      visualDescription: 'Gleaming Qoneqt ContentOS interface with a single vibrant button pulse reading "Publish to Global Feed".',
      status: 'completed',
      captionExcerpt: 'Turn ideas into publishable content in seconds...',
      transition: 'Smooth scale down to feed preview',
    });
  }

  return scenes;
}

function generateMockResult(jobId: string, request: GenerationRequest): GenerationResult {
  const scenes = generateMockScenes(request);
  const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);

  const qualityStatus: QualityCheckStatus = {
    passed: true,
    score: 98,
    readyForPublishing: true,
    checks: [
      {
        id: 'qc-video',
        label: 'Video Composition',
        description: 'Native 9:16 vertical render, 1080x1920 @ 60fps',
        passed: true,
      },
      {
        id: 'qc-audio',
        label: 'Voice & Sound Design',
        description: 'Studio mastering, -14 LUFS target loudness, zero clipping',
        passed: true,
      },
      {
        id: 'qc-captions',
        label: 'Captions Synchronized',
        description: 'Kinetic subtitles word-level sync accuracy > 99.4%',
        passed: true,
      },
      {
        id: 'qc-scenes',
        label: 'All Scenes Completed',
        description: `${scenes.length} of ${scenes.length} storyboard segments rendered with consistent style`,
        passed: true,
      },
      {
        id: 'qc-duration',
        label: 'Duration Validated',
        description: `Total runtime of ${totalDuration.toFixed(1)}s fits within requested ${request.duration}s envelope`,
        passed: true,
      },
      {
        id: 'qc-ready',
        label: 'Ready for Publishing',
        description: 'Compliant with Qoneqt Global Feed distribution requirements',
        passed: true,
      },
    ],
  };

  const title = request.topic.length > 5 
    ? `${request.topic.charAt(0).toUpperCase() + request.topic.slice(1)}: The Complete Breakdown`
    : 'Why Autonomous Pipelines Are Changing Everything';

  const hook = `Here is the truth nobody tells you about ${request.topic.toLowerCase() || 'this breakthrough'}: it will transform everything faster than you think.`;

  const script = scenes.map(s => s.narration).join('\n\n');

  return {
    jobId,
    topic: request.topic,
    contentType: request.contentType,
    style: request.style,
    duration: totalDuration,
    title,
    hook,
    script,
    scenes,
    videoUrl: '', // Polished CSS/SVG animated mock video player component
    thumbnailUrl: '',
    qualityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function createMockJob(request: GenerationRequest): { jobId: string; status: GenerationStatus; result: GenerationResult } {
  const jobId = `job_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
  
  const initialStages = PIPELINE_STAGES.map((stage, index) => ({
    id: stage.id,
    number: stage.number,
    label: stage.label,
    status: (index === 0 ? 'active' : 'pending') as 'pending' | 'active' | 'completed' | 'failed',
    startedAt: index === 0 ? new Date().toISOString() : undefined,
    detail: stage.description,
  }));

  const initialLog: PipelineLogEntry = {
    id: `log_init_${Date.now()}`,
    timestamp: formatCurrentTimestamp(),
    stageId: 'topic_analysis',
    status: 'active',
    message: 'Analyzing topic and initializing ContentOS pipeline',
  };

  const status: GenerationStatus = {
    jobId,
    status: 'processing',
    progress: 8,
    currentStage: 'topic_analysis',
    currentStageLabel: 'Topic Analysis',
    completedStages: [],
    stages: initialStages,
    activityLogs: [initialLog],
    estimatedTimeRemainingSec: Math.round(PIPELINE_STAGES.reduce((acc, s) => acc + s.estimatedDurationMs, 0) / 1000),
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const result = generateMockResult(jobId, request);

  mockJobsStore.set(jobId, { request, status, result });

  return { jobId, status, result };
}

export function getMockJobStatus(jobId: string): GenerationStatus | null {
  const entry = mockJobsStore.get(jobId);
  return entry ? entry.status : null;
}

export function getMockJobResult(jobId: string): GenerationResult | null {
  const entry = mockJobsStore.get(jobId);
  return entry ? entry.result : null;
}

export function updateMockJobStatus(jobId: string, partial: Partial<GenerationStatus>): GenerationStatus | null {
  const entry = mockJobsStore.get(jobId);
  if (!entry) return null;
  entry.status = { ...entry.status, ...partial, updatedAt: new Date().toISOString() };
  return entry.status;
}

export async function mockRegenerateScene(request: RegenerateSceneRequest): Promise<RegenerateSceneResult> {
  const entry = mockJobsStore.get(request.jobId);
  
  // Simulate AI pipeline regenerating single scene visuals and narration
  await new Promise(resolve => setTimeout(resolve, 1800));

  const variations = [
    {
      narration: `Here is the revised perspective: intelligent agents don't just speed up tasks, they reinvent workflows from scratch.`,
      visualDescription: 'Close-up dynamic angle on an ultra-minimalist workstation with interactive multi-agent control dials.',
    },
    {
      narration: `Notice the precision: automated synthesis produces broadcast-ready content while preserving creative director control.`,
      visualDescription: 'Futuristic control room with glowing architectural telemetry and high-contrast vertical screen previews.',
    },
    {
      narration: `The breakthrough is instantaneous iteration. Change one beat, and the entire downstream pipeline reconciles automatically.`,
      visualDescription: 'Kinetic wireframe transition illustrating instant scene re-rendering and acoustic voice recalculation.',
    },
  ];

  const randomVariation = variations[Math.floor(Math.random() * variations.length)];

  const updatedScene: Scene = {
    id: request.sceneId,
    order: entry ? (entry.result.scenes.find(s => s.id === request.sceneId)?.order ?? 1) : 1,
    duration: entry ? (entry.result.scenes.find(s => s.id === request.sceneId)?.duration ?? 5) : 5,
    narration: request.narrationModifier || randomVariation.narration,
    visualDescription: request.visualPromptModifier || randomVariation.visualDescription,
    status: 'completed',
    captionExcerpt: randomVariation.narration.substring(0, 35) + '...',
    transition: 'Regenerated seamless hard cut',
    isRegenerating: false,
  };

  if (entry) {
    entry.result.scenes = entry.result.scenes.map(s => s.id === request.sceneId ? updatedScene : s);
    entry.result.script = entry.result.scenes.map(s => s.narration).join('\n\n');
    entry.result.updatedAt = new Date().toISOString();
  }

  return {
    jobId: request.jobId,
    scene: updatedScene,
    updatedAt: new Date().toISOString(),
  };
}

export async function mockPublishContent(request: PublishRequest): Promise<PublishResult> {
  // Simulate publishing latency to Qoneqt Global Feed
  await new Promise(resolve => setTimeout(resolve, 1500));

  const publicationId = `qnqt_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;

  return {
    success: true,
    publicationId,
    publishedAt: new Date().toISOString(),
    qoneqtUrl: `https://qoneqt.com/feed/video/${publicationId}`,
    platformStatus: 'live',
    message: `Successfully broadcasted "${request.title}" to the Qoneqt Global Feed with algorithmic tagging active.`,
    isMock: true,
  };
}
