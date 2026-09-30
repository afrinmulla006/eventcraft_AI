import React, { useState } from 'react';
import {
  EventDetails,
  AiControls,
  PlatformType,
  ToneType,
  LengthType,
  AudienceType,
  CreativityType,
  LanguageType,
  GeneratedCampaign,
  ContentVariation,
  PlatformContent,
  EventAnalysis
} from '../types';
import { DEMO_PRESETS, CONTEXT_QUICK_PRESETS } from '../data/demoEvents';
import { ContentVariationCard } from './ContentVariationCard';
import { EventAnalysisCard } from './EventAnalysisCard';
import { RealisticPlatformPreview } from './previews/RealisticPlatformPreview';
import { HashtagAndCtaHub } from './HashtagAndCtaHub';
import {
  Sparkles, Zap, Sliders, Globe, Layers, ArrowRight, Eye, LayoutGrid,
  CheckCircle2, RefreshCw, Download, Star, Copy, Send, ChevronDown, ChevronUp, AlertCircle
} from 'lucide-react';

interface CreatePageProps {
  eventDetails: EventDetails;
  setEventDetails: React.Dispatch<React.SetStateAction<EventDetails>>;
  controls: AiControls;
  setControls: React.Dispatch<React.SetStateAction<AiControls>>;
  selectedPlatforms: PlatformType[];
  setSelectedPlatforms: React.Dispatch<React.SetStateAction<PlatformType[]>>;
  currentCampaign: GeneratedCampaign | null;
  onGenerate: () => Promise<void>;
  isGenerating: boolean;
  onTransformVariation: (
    action: 'shorten' | 'expand' | 'change_tone' | 'translate' | 'improve' | 'regenerate',
    variationId: string,
    platform: PlatformType,
    params?: { targetTone?: string; targetLanguage?: string; instruction?: string }
  ) => Promise<void>;
  onFavoriteToggle: (variation: ContentVariation, platform: PlatformType) => void;
  isFavorited: (id: string) => boolean;
  onCopyText: (text: string, title?: string) => void;
  onDownloadVariation: (variation: ContentVariation, platform: PlatformType) => void;
  onLoadPreset: (presetId: string) => void;
}

export const CreatePage: React.FC<CreatePageProps> = ({
  eventDetails,
  setEventDetails,
  controls,
  setControls,
  selectedPlatforms,
  setSelectedPlatforms,
  currentCampaign,
  onGenerate,
  isGenerating,
  onTransformVariation,
  onFavoriteToggle,
  isFavorited,
  onCopyText,
  onDownloadVariation,
  onLoadPreset,
}) => {
  // Active platform tab in output view
  const [activePlatformTab, setActivePlatformTab] = useState<PlatformType>('instagram');
  // Toggle between card view and realistic social feed preview
  const [viewMode, setViewMode] = useState<'cards' | 'preview'>('cards');
  // Selected variation for realistic preview
  const [previewVariationIndex, setPreviewVariationIndex] = useState<number>(0);
  // Controls accordion collapse on mobile
  const [showAdvancedControls, setShowAdvancedControls] = useState(true);

  const ALL_PLATFORMS: { id: PlatformType; label: string; icon: string; desc: string }[] = [
    { id: 'instagram', label: 'Instagram', icon: '📸', desc: 'Visual captions, bio hooks & hashtags' },
    { id: 'linkedin', label: 'LinkedIn', icon: '💼', desc: 'Thought leadership, business takeaways' },
    { id: 'twitter', label: 'X / Twitter', icon: '𝕏', desc: 'High-impact 280-char hooks & threads' },
    { id: 'whatsapp', label: 'WhatsApp', icon: '💬', desc: 'Bold formatted broadcasts & direct RSVPs' },
    { id: 'email', label: 'Email', icon: '✉️', desc: 'Subject lines, preheaders & newsletters' },
  ];

  const TONES: ToneType[] = ['Professional', 'Friendly', 'Exciting', 'Funny', 'Formal', 'Casual'];
  const LENGTHS: LengthType[] = ['Short', 'Medium', 'Long'];
  const AUDIENCES: AudienceType[] = ['Students', 'Professionals', 'General Public', 'Customers'];
  const CREATIVITIES: CreativityType[] = ['Low', 'Medium', 'High'];
  const LANGUAGES: LanguageType[] = ['English', 'Hindi', 'Gujarati', 'Spanish', 'French', 'German'];

  // Toggle platform selection
  const handleTogglePlatform = (platform: PlatformType) => {
    if (selectedPlatforms.includes(platform)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== platform));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  // "Generate Everywhere" feature: select all 5 platforms
  const handleGenerateEverywhere = () => {
    setSelectedPlatforms(['instagram', 'linkedin', 'twitter', 'whatsapp', 'email']);
  };

  // Get current platform content in active campaign
  const currentPlatformData = currentCampaign?.platformContent?.find(
    (pc) => pc.platform === activePlatformTab
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Top Banner with Demo Preset Selector & Quick Fill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 p-3.5 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
            <Zap className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Quick Demo Launcher</span>
            <span className="text-[11px] text-slate-400">Load sample real-world events into the generator</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {DEMO_PRESETS.map((demo) => (
            <button
              key={demo.id}
              onClick={() => onLoadPreset(demo.id)}
              className="text-xs font-semibold px-2.5 py-1 rounded-xl bg-slate-900/80 hover:bg-purple-600/30 text-slate-300 hover:text-white border border-slate-700/80 hover:border-purple-500/50 whitespace-nowrap transition-all"
            >
              {demo.label.split(':')[0].split('—')[0].slice(0, 18)}...
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ================= LEFT COLUMN = Event + Context + Controls (5 Cols) ================= */}
        <div className="lg:col-span-5 space-y-5">
          {/* Card 1: Event Details Form */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold">1</span>
                Event Parameters
              </h3>
              <span className="text-[11px] text-purple-400 font-medium">Core Information</span>
            </div>

            {/* Event Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Event Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={eventDetails.name}
                onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
                placeholder="e.g., Global AI & Robotics Summit 2026"
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all font-medium"
              />
            </div>

            {/* Date & Location in Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Date & Time
                </label>
                <input
                  type="text"
                  value={eventDetails.date}
                  onChange={(e) => setEventDetails({ ...eventDetails, date: e.target.value })}
                  placeholder="e.g., Nov 12-14, 2026 • 9 AM EST"
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Location / Venue
                </label>
                <input
                  type="text"
                  value={eventDetails.location}
                  onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
                  placeholder="e.g., San Francisco, CA & Virtual"
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-all"
                />
              </div>
            </div>

            {/* Organizer */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Organizer / Host
              </label>
              <input
                type="text"
                value={eventDetails.organizer}
                onChange={(e) => setEventDetails({ ...eventDetails, organizer: e.target.value })}
                placeholder="e.g., NextWave Tech Forum & Frontier Labs"
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-all"
              />
            </div>

            {/* Event Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Event Description
              </label>
              <textarea
                rows={3}
                value={eventDetails.description}
                onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
                placeholder="Describe key speakers, agenda, unique experiences, attendee perks, or mission..."
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-all resize-none leading-relaxed"
              />
            </div>

            {/* Context / Instruction ("What do you want AI to create?") */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-purple-300">
                  What do you want AI to create? (Context / Angle)
                </label>
                <span className="text-[10px] text-slate-400 font-normal">e.g., ticket push, VIP perks</span>
              </div>
              <textarea
                rows={2}
                value={eventDetails.context}
                onChange={(e) => setEventDetails({ ...eventDetails, context: e.target.value })}
                placeholder="e.g., Announce 48-hour Early Bird Ticket Launch with discount code 'EARLYVIP' saving 30%. Emphasize limited seats."
                className="w-full bg-slate-900/90 border border-purple-500/40 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50 transition-all resize-none leading-relaxed"
              />

              {/* Quick Context Pills */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {CONTEXT_QUICK_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setEventDetails({ ...eventDetails, context: preset.prompt })}
                    className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-900 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/40 text-slate-300 hover:text-purple-200 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Platform Selection & "Generate Everywhere" */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-bold">2</span>
                Platform Selection
              </h3>

              {/* Requirement 10: "Generate Everywhere" Button */}
              <button
                type="button"
                onClick={handleGenerateEverywhere}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gradient-to-r from-purple-600/30 to-indigo-600/30 hover:from-purple-600/50 hover:to-indigo-600/50 text-purple-200 border border-purple-500/40 transition-all flex items-center gap-1 shadow-sm"
              >
                <Sparkles className="w-3 h-3 text-purple-400" />
                <span>Generate Everywhere (All 5)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ALL_PLATFORMS.map((p) => {
                const isSelected = selectedPlatforms.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => handleTogglePlatform(p.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-start justify-between ${
                      isSelected
                        ? 'bg-purple-950/40 border-purple-500/60 shadow-md shadow-purple-500/10'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-lg leading-none mt-0.5">{p.icon}</span>
                      <div>
                        <h4 className="text-xs font-bold text-white">{p.label}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{p.desc}</p>
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'bg-purple-600 border-purple-400 text-white'
                          : 'border-slate-700 bg-slate-950'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 3: AI Controls (Tone, Length, Audience, Creativity, Language) */}
          <div className="glass-panel rounded-2xl p-5 border border-slate-800">
            <div
              className="flex items-center justify-between cursor-pointer select-none pb-2 border-b border-slate-800/80"
              onClick={() => setShowAdvancedControls(!showAdvancedControls)}
            >
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center text-xs font-bold">3</span>
                AI Controls & Stylometry
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>{controls.tone} · {controls.language}</span>
                {showAdvancedControls ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>

            {showAdvancedControls && (
              <div className="pt-4 space-y-4 animate-in fade-in duration-200">
                {/* Tone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Tone of Voice
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {TONES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setControls({ ...controls, tone: t })}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                          controls.tone === t
                            ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Length & Creativity */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Length
                    </label>
                    <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                      {LENGTHS.map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setControls({ ...controls, length: l })}
                          className={`flex-1 py-1 rounded-md text-[11px] font-semibold transition-all ${
                            controls.length === l
                              ? 'bg-purple-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Creativity
                    </label>
                    <div className="flex rounded-lg bg-slate-900 p-0.5 border border-slate-800">
                      {CREATIVITIES.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setControls({ ...controls, creativity: c })}
                          className={`flex-1 py-1 rounded-md text-[11px] font-semibold transition-all ${
                            controls.creativity === c
                              ? 'bg-purple-600 text-white shadow'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Audience */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Audience
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {AUDIENCES.map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setControls({ ...controls, audience: a })}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                          controls.audience === a
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Output Language
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setControls({ ...controls, language: lang })}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                          controls.language === lang
                            ? 'bg-pink-600 text-white border-pink-500 shadow-sm'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <div>
            <button
              onClick={onGenerate}
              disabled={isGenerating || !eventDetails.name.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:from-purple-500 hover:via-indigo-500 hover:to-pink-400 disabled:opacity-50 text-white font-extrabold text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Multi-Platform Campaigns...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Platform Content ✨</span>
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2">
              Generates 3 bespoke variations & native assets for {selectedPlatforms.length} platform{selectedPlatforms.length === 1 ? '' : 's'}
            </p>
          </div>
        </div>

        {/* ================= RIGHT COLUMN = AI Analysis + Generated Content (7 Cols) ================= */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loading Skeleton State */}
          {isGenerating && (
            <div className="glass-panel rounded-3xl p-8 border border-purple-500/30 text-center animate-pulse space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mx-auto shadow-xl shadow-purple-500/20">
                <RefreshCw className="w-8 h-8 text-white animate-spin" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Analyzing Event & Generating Formats...</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Google Gemini 3.8 is analyzing audience psychology, crafting platform-specific formatting, and calculating AI content scores.
                </p>
              </div>

              {/* Progress steps animation */}
              <div className="max-w-sm mx-auto space-y-2 text-left text-xs text-slate-300">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Diagnosing event type & target personas</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <RefreshCw className="w-4 h-4 text-purple-400 animate-spin shrink-0" />
                  <span>Writing 3 distinct angles: Professional, Creative, Engaging</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                  <span className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                  <span>Calibrating native hashtags & CTA scores</span>
                </div>
              </div>
            </div>
          )}

          {/* Empty Initial State (Before any generation) */}
          {!isGenerating && !currentCampaign && (
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600/20 via-indigo-600/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto mb-4 shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">
                Ready to Craft Your Campaign
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6 leading-relaxed">
                Fill in your event details on the left, or click <strong className="text-white font-semibold">"Try Demo"</strong> above to test with pre-built world-class event scenarios.
              </p>

              {/* Quick Feature Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-lg mx-auto">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-purple-400 font-bold text-xs block mb-1">3 Unique Angles</span>
                  <p className="text-[11px] text-slate-400">Professional, Creative Storytelling, and Viral FOMO variations.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-indigo-400 font-bold text-xs block mb-1">Live Social Previews</span>
                  <p className="text-[11px] text-slate-400">Preview posts inside real Instagram, LinkedIn, X, and WhatsApp feeds.</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-pink-400 font-bold text-xs block mb-1">AI Scoring & Polish</span>
                  <p className="text-[11px] text-slate-400">Algorithmic quality ratings with 1-click Shorten, Expand, and Translate.</p>
                </div>
              </div>
            </div>
          )}

          {/* Results State (When content is generated) */}
          {!isGenerating && currentCampaign && (
            <div className="space-y-6">
              {/* Event Analysis Card */}
              {currentCampaign.analysis && (
                <EventAnalysisCard analysis={currentCampaign.analysis} />
              )}

              {/* Platform Selector Bar & View Mode Toggle */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2 rounded-2xl glass-panel border border-slate-800">
                {/* Platform Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
                  {currentCampaign.platformContent.map((pc) => {
                    const isActive = activePlatformTab === pc.platform;
                    return (
                      <button
                        key={pc.platform}
                        onClick={() => {
                          setActivePlatformTab(pc.platform);
                          setPreviewVariationIndex(0);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all flex items-center gap-1.5 ${
                          isActive
                            ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                            : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                        }`}
                      >
                        <span>{pc.platform}</span>
                        <span className="text-[10px] opacity-75">({pc.variations.length})</span>
                      </button>
                    );
                  })}
                </div>

                {/* View Mode Toggle: Cards vs Realistic Preview */}
                <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-end sm:self-center">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      viewMode === 'cards'
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Cards</span>
                  </button>
                  <button
                    onClick={() => setViewMode('preview')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      viewMode === 'preview'
                        ? 'bg-purple-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live Preview</span>
                  </button>
                </div>
              </div>

              {/* View Mode 1: CARDS VIEW */}
              {viewMode === 'cards' && currentPlatformData && (
                <div className="space-y-5">
                  {currentPlatformData.variations.map((variation) => (
                    <ContentVariationCard
                      key={variation.id}
                      variation={variation}
                      platform={currentPlatformData.platform}
                      eventDetails={currentCampaign.eventDetails}
                      isFavorited={isFavorited(variation.id)}
                      onCopy={(text) => onCopyText(text, variation.title)}
                      onDownload={onDownloadVariation}
                      onFavoriteToggle={onFavoriteToggle}
                      onTransform={(action, varId, params) =>
                        onTransformVariation(action, varId, currentPlatformData.platform, params)
                      }
                    />
                  ))}

                  {/* Hashtags and CTA Suggestions Hub */}
                  <HashtagAndCtaHub
                    hashtags={currentPlatformData.hashtags}
                    recommendedCtas={currentPlatformData.recommendedCtas}
                    onCopyText={onCopyText}
                  />
                </div>
              )}

              {/* View Mode 2: REALISTIC PLATFORM PREVIEW */}
              {viewMode === 'preview' && currentPlatformData && (
                <div className="space-y-4">
                  {/* Variation selector for preview */}
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                    <span className="text-slate-400 font-medium">Select Variation To Preview:</span>
                    <div className="flex items-center gap-1">
                      {currentPlatformData.variations.map((v, idx) => (
                        <button
                          key={v.id}
                          onClick={() => setPreviewVariationIndex(idx)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                            previewVariationIndex === idx
                              ? 'bg-purple-600 text-white shadow'
                              : 'bg-slate-950 text-slate-400 hover:text-white'
                          }`}
                        >
                          {v.type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {currentPlatformData.variations[previewVariationIndex] && (
                    <RealisticPlatformPreview
                      platform={currentPlatformData.platform}
                      variation={currentPlatformData.variations[previewVariationIndex]}
                      eventDetails={currentCampaign.eventDetails}
                      hashtags={currentPlatformData.hashtags}
                      onCopy={(text) =>
                        onCopyText(text, currentPlatformData.variations[previewVariationIndex].title)
                      }
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
