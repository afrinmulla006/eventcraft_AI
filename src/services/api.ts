import { EventDetails, AiControls, PlatformType, PlatformContent, EventAnalysis, AiContentScore } from '../types';

export interface GenerateResponse {
  analysis: EventAnalysis;
  platformContent: PlatformContent[];
}

export interface TransformParams {
  action: 'shorten' | 'expand' | 'change_tone' | 'translate' | 'improve' | 'regenerate';
  text: string;
  platform: PlatformType;
  variationType?: string;
  eventDetails: EventDetails;
  targetTone?: string;
  targetLanguage?: string;
  instruction?: string;
}

export interface TransformResponse {
  content: string;
  subjectLine?: string;
  score: AiContentScore;
}

export async function generateEventContent(
  eventDetails: EventDetails,
  platforms: PlatformType[],
  controls: AiControls
): Promise<GenerateResponse> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      eventDetails,
      platforms,
      controls,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Generation failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export async function transformEventContent(params: TransformParams): Promise<TransformResponse> {
  const response = await fetch('/api/transform', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Transformation failed with status ${response.status}`);
  }

  const data = await response.json();
  return data;
}
