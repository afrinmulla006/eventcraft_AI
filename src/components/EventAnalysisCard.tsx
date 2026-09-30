import React from 'react';
import { EventAnalysis } from '../types';
import { Sparkles, Users, Target, MessageSquare, Compass, Send, CheckCircle2 } from 'lucide-react';

interface EventAnalysisCardProps {
  analysis: EventAnalysis;
}

export const EventAnalysisCard: React.FC<EventAnalysisCardProps> = ({ analysis }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-purple-500/20 relative overflow-hidden mb-6">
      {/* Background glow orb */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white leading-tight">AI Event Diagnostic & Blueprint</h3>
            <p className="text-xs text-slate-400">Contextual positioning synthesized by Gemini</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {analysis.eventType || 'Special Event'}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
            <Compass className="w-3 h-3" /> {analysis.recommendedPlatform || 'Omni-channel'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-purple-400 font-semibold mb-1">
            <Users className="w-3.5 h-3.5" />
            <span>Target Audience</span>
          </div>
          <p className="text-slate-200 leading-relaxed font-medium">{analysis.targetAudience}</p>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-indigo-400 font-semibold mb-1">
            <Target className="w-3.5 h-3.5" />
            <span>Campaign Purpose</span>
          </div>
          <p className="text-slate-200 leading-relaxed font-medium">{analysis.purpose}</p>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-blue-400 font-semibold mb-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Core Key Message</span>
          </div>
          <p className="text-slate-200 leading-relaxed font-medium">{analysis.keyMessage}</p>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
            <Send className="w-3.5 h-3.5" />
            <span>Recommended Call-to-Action</span>
          </div>
          <p className="text-emerald-300 font-semibold leading-relaxed">{analysis.recommendedCta}</p>
        </div>
      </div>

      {analysis.keySellingPoints && analysis.keySellingPoints.length > 0 && (
        <div className="mt-3.5 pt-3 border-t border-slate-800/60">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Key Value Propositions Identified
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.keySellingPoints.map((point, idx) => (
              <span
                key={idx}
                className="text-xs bg-slate-950/70 border border-slate-800/90 text-slate-300 px-2.5 py-1 rounded-lg"
              >
                • {point}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
