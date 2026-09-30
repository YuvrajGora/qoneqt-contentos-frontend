'use client';

import React from 'react';
import { GenerationResult } from '@/lib/api/types';
import { ReviewWorkspace } from './ReviewWorkspace';

export interface ReviewPlaceholderProps {
  result: GenerationResult;
  onCreateVideo?: (updatedResult?: GenerationResult) => void;
  onBackToStudio: () => void;
  onBackToGeneration?: () => void;
}

/**
 * Backward-compatible bridge to the full ReviewWorkspace
 */
export function ReviewPlaceholder({
  result,
  onCreateVideo = () => {},
  onBackToStudio,
}: ReviewPlaceholderProps) {
  return (
    <ReviewWorkspace
      result={result}
      onCreateVideo={onCreateVideo}
      onBackToStudio={onBackToStudio}
    />
  );
}
