/**
 * Qoneqt ContentOS - Publishing API Client
 * 
 * Abstraction layer for publishing approved video assets to the Qoneqt Global Feed.
 */

import { PublishRequest, PublishResult } from './types';
import { mockPublishContent } from './mock';

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

/**
 * Flag indicating whether publishing operates in simulated demo mode
 */
export const isMockPublishing = USE_MOCK;

/**
 * Publishes final video content to the Qoneqt Global Feed
 */
export async function publishContent(request: PublishRequest): Promise<PublishResult> {
  if (USE_MOCK) {
    return mockPublishContent(request);
  }

  const response = await fetch(`${API_BASE_URL}/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Publish API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
