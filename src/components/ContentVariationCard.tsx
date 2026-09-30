import React, { useState } from 'react';
import { ContentVariation, PlatformType, EventDetails, ToneType, LanguageType } from '../types';
import { AiScoreBadge } from './AiScoreBadge';
import {
  Copy, Download, RefreshCw, Wand2, Minimize2, Maximize2, Palette,
  Globe2, Star, Check, Sparkles, Send, X, CornerDownRight
} from 'lucide-react';

interface ContentVariationCardProps {
  variation: ContentVariation;
  platform: PlatformType;
  eventDetails: EventDetails;
  isFavorited: boolean;
  onCopy: (content: string) => void;
  onDownload: (variation: ContentVariation, platform: PlatformType) => void;
  onFavoriteToggle: (variation: ContentVariation, platform: PlatformType) => void;
  onTransform: (
    action: 'shorten' | 'expand' | 'change_tone' | 'translate' | 'improve' | 'regenerate',
    variationId: string,
    params?: { targetTone?: string; targetLanguage?: string; instruction?: string }
  ) => Promise<void>;
}

export const ContentVariationCard: React.FC<ContentVariationCardProps> = ({
  variation,
  platform,
  eventDetails,
  isFavorited,
  onCopy,
  onDownload,
  onFavoriteToggle,
  onTransform,
}) => {
  const [copied, setCopied] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  // Modals / Dropdowns state
  const [showImproveInput, setShowImproveInput] = useState(false);
  const [improvePrompt, setImprovePrompt] = useState('');

  const [showToneDropdown, setShowToneDropdown] = useState(false);
  const [showTranslateDropdown, setShowTranslateDropdown] = useState(false);

  const TONES: ToneType[] = ['Professional', 'Friendly', 'Exciting', 'Funny', 'Formal', 'Casual'];
  const LANGUAGES: LanguageType[] = ['English', 'Hindi', 'Gujarati', 'Spanish', 'French', 'German'];

  const handleCopy = () => {
    onCopy(variation.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAction = async (
    action: 'shorten' | 'expand' | 'change_tone' | 'translate' | 'improve' | 'regenerate',
    params?: { targetTone?: string; targetLanguage?: string; instruction?: string }
  ) => {
    try {
      setLoadingAction(action);
      await onTransform(action, variation.id, params);
    } finally {
      setLoadingAction(null);
      setShowImproveInput(false);
      setShowToneDropdown(false);
      setShowTranslateDropdown(false);
    }
  };

  const getVariationBadge = (type: string) => {
    switch (type) {
      case 'professional':
        return {
          label: 'Professional',
          color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          dot: 'bg-blue-400',
        };
      case 'creative':
        return {
          label: 'Creative Storytelling',
          color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          dot: 'bg-purple-400',
        };
      case 'engaging':
      default:
        return {
          label: 'High-Engagement Viral',
          color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          dot: 'bg-emerald-400',
        };
    }
  };

  const badge = getVariationBadge(variation.type);
  const wordCount = variation.content.trim().split(/\s+/).length;
  const charCount = variation.content.length;

  return (
    <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800 relative flex flex-col justify-between transition-all">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
              {badge.label}
            </span>
            <span className="text-[11px] text-slate-400">
              {wordCount} words · {charCount} chars
            </span>
          </div>

          {/* Favorite & Quick Copy Icons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onFavoriteToggle(variation, platform)}
              title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
              className={`p-1.5 rounded-lg border transition-colors ${
                isFavorited
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-amber-300 border-slate-800'
              }`}
            >
              <Star className={`w-4 h-4 ${isFavorited ? 'fill-amber-300' : ''}`} />
            </button>

            <button
              onClick={handleCopy}
              title="Copy content"
              className={`p-1.5 rounded-lg border transition-colors ${
                copied
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border-slate-800'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Variation Title */}
        {variation.title && (
          <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            {variation.title}
          </h4>
        )}

        {/* Email Subject Line (if applicable) */}
        {variation.subjectLine && (
          <div className="mb-3 p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs">
            <span className="font-semibold text-purple-300 block mb-0.5">Subject Line:</span>
            <span className="text-slate-100 font-medium select-all">{variation.subjectLine}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="relative group">
          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-normal p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 max-h-[360px] overflow-y-auto selection:bg-purple-500/40">
            {variation.content}
          </div>

          {loadingAction && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center gap-2 text-xs font-semibold text-purple-300">
              <RefreshCw className="w-5 h-5 animate-spin text-purple-400" />
              <span>Applying AI {loadingAction}...</span>
            </div>
          )}
        </div>

        {/* AI Content Score Breakdown */}
        {variation.score && (
          <div className="mt-3">
            <AiScoreBadge score={variation.score} />
          </div>
        )}
      </div>

      {/* Action Suite (Required 7 operations: Copy, Download, Regenerate, Improve, Shorten, Expand, Change Tone, Translate, Favorite) */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80">
        {/* Inline "Improve with AI" Input Box */}
        {showImproveInput && (
          <div className="mb-3 p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-purple-300 flex items-center gap-1">
                <Wand2 className="w-3.5 h-3.5" /> Direct AI Polish Instruction:
              </span>
              <button
                onClick={() => setShowImproveInput(false)}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={improvePrompt}
                onChange={(e) => setImprovePrompt(e.target.value)}
                placeholder="e.g., Make it punchier, mention the 20% discount code, emphasize VIP perks..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && improvePrompt.trim()) {
                    handleAction('improve', { instruction: improvePrompt });
                  }
                }}
              />
              <button
                disabled={!improvePrompt.trim() || Boolean(loadingAction)}
                onClick={() => handleAction('improve', { instruction: improvePrompt })}
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <Send className="w-3 h-3" /> Apply
              </button>
            </div>
          </div>
        )}

        {/* Change Tone Menu */}
        {showToneDropdown && (
          <div className="mb-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-2 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1">
                <Palette className="w-3.5 h-3.5 text-purple-400" /> Select New Tone:
              </span>
              <button onClick={() => setShowToneDropdown(false)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => handleAction('change_tone', { targetTone: t })}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-purple-600/30 hover:border-purple-500/50 border border-slate-700 text-slate-200 transition-colors"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Translate Menu */}
        {showTranslateDropdown && (
          <div className="mb-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-2 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-blue-400" /> Select Target Language:
              </span>
              <button onClick={() => setShowTranslateDropdown(false)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((l) => (
                <button
                  key={l}
                  onClick={() => handleAction('translate', { targetLanguage: l })}
                  className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-blue-600/30 hover:border-blue-500/50 border border-slate-700 text-slate-200 transition-colors"
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Button Bar */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium">
          {/* Copy */}
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-all ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          {/* Download */}
          <button
            onClick={() => onDownload(variation, platform)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            title="Download formatted .txt"
          >
            <Download className="w-3.5 h-3.5" />
            <span>.txt</span>
          </button>

          {/* Regenerate */}
          <button
            onClick={() => handleAction('regenerate')}
            disabled={Boolean(loadingAction)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            title="Regenerate this variation with a new hook"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingAction === 'regenerate' ? 'animate-spin text-purple-400' : ''}`} />
            <span>Regenerate</span>
          </button>

          {/* Improve */}
          <button
            onClick={() => setShowImproveInput(!showImproveInput)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-colors ${
              showImproveInput
                ? 'bg-purple-600/30 text-purple-200 border-purple-500/50'
                : 'bg-slate-900 hover:bg-slate-800 text-purple-300 border-slate-800'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Improve</span>
          </button>

          {/* Shorten */}
          <button
            onClick={() => handleAction('shorten')}
            disabled={Boolean(loadingAction)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            title="Make shorter & punchier"
          >
            <Minimize2 className="w-3.5 h-3.5" />
            <span>Shorten</span>
          </button>

          {/* Expand */}
          <button
            onClick={() => handleAction('expand')}
            disabled={Boolean(loadingAction)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
            title="Add richer details and anticipation"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Expand</span>
          </button>

          {/* Change Tone */}
          <button
            onClick={() => setShowToneDropdown(!showToneDropdown)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-colors ${
              showToneDropdown
                ? 'bg-purple-600/30 text-purple-200 border-purple-500/50'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Tone</span>
          </button>

          {/* Translate */}
          <button
            onClick={() => setShowTranslateDropdown(!showTranslateDropdown)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-colors ${
              showTranslateDropdown
                ? 'bg-blue-600/30 text-blue-200 border-blue-500/50'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Translate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
