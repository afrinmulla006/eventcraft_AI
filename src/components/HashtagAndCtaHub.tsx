import React, { useState } from 'react';
import { Hash, Send, Copy, Check, Sparkles } from 'lucide-react';

interface HashtagAndCtaHubProps {
  hashtags: string[];
  recommendedCtas: string[];
  onCopyText: (text: string, label: string) => void;
}

export const HashtagAndCtaHub: React.FC<HashtagAndCtaHubProps> = ({
  hashtags,
  recommendedCtas,
  onCopyText,
}) => {
  const [copiedAllTags, setCopiedAllTags] = useState(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);
  const [copiedCta, setCopiedCta] = useState<string | null>(null);

  const handleCopyAllTags = () => {
    if (hashtags.length === 0) return;
    const text = hashtags.join(' ');
    onCopyText(text, 'All hashtags');
    setCopiedAllTags(true);
    setTimeout(() => setCopiedAllTags(false), 2000);
  };

  const handleCopyTag = (tag: string) => {
    onCopyText(tag, `Hashtag ${tag}`);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 1500);
  };

  const handleCopyCta = (cta: string) => {
    onCopyText(cta, 'Call to Action');
    setCopiedCta(cta);
    setTimeout(() => setCopiedCta(null), 1500);
  };

  if ((!hashtags || hashtags.length === 0) && (!recommendedCtas || recommendedCtas.length === 0)) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {/* Hashtags Column */}
      {hashtags && hashtags.length > 0 && (
        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
              <Hash className="w-4 h-4 text-purple-400" />
              <span>Optimized Hashtags ({hashtags.length})</span>
            </div>
            <button
              onClick={handleCopyAllTags}
              className="flex items-center gap-1 text-[11px] font-semibold text-purple-300 hover:text-purple-200 bg-purple-500/10 hover:bg-purple-500/20 px-2 py-1 rounded-lg border border-purple-500/30 transition-colors"
            >
              {copiedAllTags ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedAllTags ? 'Copied All' : 'Copy All'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto">
            {hashtags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleCopyTag(tag)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  copiedTag === tag
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/40'
                }`}
                title="Click to copy single hashtag"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recommended CTAs Column */}
      {recommendedCtas && recommendedCtas.length > 0 && (
        <div className="glass-card rounded-2xl p-4 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider mb-3">
            <Send className="w-4 h-4 text-emerald-400" />
            <span>High-Conversion CTA Suggestions</span>
          </div>

          <div className="space-y-2">
            {recommendedCtas.map((cta, idx) => (
              <div
                key={idx}
                onClick={() => handleCopyCta(cta)}
                className="group flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-xs text-slate-200 group-hover:text-white font-medium truncate">
                    {cta}
                  </span>
                </div>
                <button
                  className="shrink-0 p-1 text-slate-400 group-hover:text-emerald-300 transition-colors"
                  title="Copy CTA"
                >
                  {copiedCta === cta ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
