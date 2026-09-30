export type PlatformType = 'instagram' | 'linkedin' | 'twitter' | 'whatsapp' | 'email';

export type ToneType = 'Professional' | 'Friendly' | 'Exciting' | 'Funny' | 'Formal' | 'Casual';
export type LengthType = 'Short' | 'Medium' | 'Long';
export type AudienceType = 'Students' | 'Professionals' | 'General Public' | 'Customers';
export type CreativityType = 'Low' | 'Medium' | 'High';
export type LanguageType = 'English' | 'Hindi' | 'Gujarati' | 'Spanish' | 'French' | 'German';

export type VariationType = 'professional' | 'creative' | 'engaging';

export interface EventDetails {
  name: string;
  date: string;
  location: string;
  organizer: string;
  description: string;
  context: string;
}

export interface AiControls {
  tone: ToneType;
  length: LengthType;
  audience: AudienceType;
  creativity: CreativityType;
  language: LanguageType;
}

export interface AiContentScore {
  engagement: number;
  clarity: number;
  platformFit: number;
  ctaStrength: number;
  overall: number;
  analysisTips?: string;
}

export interface ContentVariation {
  id: string;
  type: VariationType;
  title: string;
  subjectLine?: string;
  content: string;
  score: AiContentScore;
  isFavorited?: boolean;
}

export interface PlatformContent {
  platform: PlatformType;
  recommendedCtas: string[];
  hashtags: string[];
  variations: ContentVariation[];
}

export interface EventAnalysis {
  eventType: string;
  targetAudience: string;
  purpose: string;
  keyMessage: string;
  recommendedCta: string;
  recommendedPlatform: string;
  keySellingPoints?: string[];
}

export interface GeneratedCampaign {
  id: string;
  createdAt: string;
  eventDetails: EventDetails;
  controls: AiControls;
  analysis: EventAnalysis;
  platformContent: PlatformContent[];
  selectedPlatforms: PlatformType[];
}

export interface FavoriteItem {
  id: string;
  campaignId: string;
  eventName: string;
  platform: PlatformType;
  variationType: VariationType;
  title: string;
  content: string;
  subjectLine?: string;
  hashtags: string[];
  savedAt: string;
}
