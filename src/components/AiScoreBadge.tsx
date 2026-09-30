import React, { useState } from 'react';
import { AiContentScore } from '../types';
import { Award, ChevronDown, ChevronUp, Sparkles, TrendingUp, CheckCircle, Target, Zap } from 'lucide-react';

interface AiScoreBadgeProps {
  score: AiContentScore;
  compact?: boolean;
}

export const AiScoreBadge: React.FC<AiScoreBadgeProps> = ({ score, compact = false }) => {
  const [expanded, setExpanded] = useState(false);

  const getScoreColor = (val: number) => {
    if (val >= 90) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
    if (val >= 75) return 'text-purple-400 border-purple-500/40 bg-purple-500/10';
    if (val >= 60) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
  };

  const getProgressColor = (val: number) => {
    if (val >= 90) return 'bg-emerald-500';
    if (val >= 75) return 'bg-purple-500';
    if (val >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getScoreLabel = (val: number) => {
    if (val >= 94) return 'Exceptional';
    if (val >= 88) return 'High Impact';
    if (val >= 80) return 'Strong';
    if (val >= 70) return 'Good';
    return 'Needs Polish';
  };

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getScoreColor(score.overall)}`}>
        <Award className="w-3.5 h-3.5" />
        <span>AI Score {score.overall}/100</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-slate-900/80 border border-slate-800/80 p-3.5 transition-all">
      <div
        className="flex items-center justify-between cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border font-bold text-base ${getScoreColor(score.overall)}`}>
            {score.overall}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">AI Content Score</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold">
                {getScoreLabel(score.overall)}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-purple-400" />
              {score.analysisTips || 'Algorithmic performance calibrated for high conversion'}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800/60 transition-colors"
          aria-label="Toggle score breakdown"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3.5 pt-3.5 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in fade-in duration-200">
          <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/40">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" /> Engagement
              </span>
              <span className="font-semibold text-slate-200">{score.engagement}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${getProgressColor(score.engagement)}`}
                style={{ width: `${score.engagement}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/40">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-blue-400" /> Clarity
              </span>
              <span className="font-semibold text-slate-200">{score.clarity}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${getProgressColor(score.clarity)}`}
                style={{ width: `${score.clarity}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/40">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 flex items-center gap-1">
                <Target className="w-3 h-3 text-purple-400" /> Platform Fit
              </span>
              <span className="font-semibold text-slate-200">{score.platformFit}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${getProgressColor(score.platformFit)}`}
                style={{ width: `${score.platformFit}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/40">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" /> CTA Strength
              </span>
              <span className="font-semibold text-slate-200">{score.ctaStrength}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${getProgressColor(score.ctaStrength)}`}
                style={{ width: `${score.ctaStrength}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
