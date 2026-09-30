'use client';

import React from 'react';
import { GenerationResult, PublishResult } from '@/lib/api/types';
import { VideoResultWorkspace } from './VideoResultWorkspace';

export interface VideoResultPlaceholderProps {
  result: GenerationResult;
  onBackToReview: () => void;
  onBackToStudio: () => void;
  onNavigateToFeed?: () => void;
  onUpdateResult?: (updated: GenerationResult) => void;
  publicationResult?: PublishResult | null;
  onPublishSuccess?: (published: PublishResult) => void;
}

/**
 * Backwards-compatible export bridging the previous placeholder to the full VideoResultWorkspace
 */
export function VideoResultPlaceholder(props: VideoResultPlaceholderProps) {
  return <VideoResultWorkspace {...props} />;
}
