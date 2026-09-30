import React from 'react';
import { Sparkles, Layers, Cpu, ShieldCheck, Zap, Globe, Share2, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC<{ onSwitchToCreate: () => void }> = ({ onSwitchToCreate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Next-Generation Event Marketing Suite</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How EventCraft AI Works
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto mt-3 leading-relaxed">
          One event description goes in. Highly tuned, platform-native content comes out — engineered for virality, conversions, and authentic engagement.
        </p>
      </div>

      {/* 3 Step Workflow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 relative">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 flex items-center justify-center font-bold text-sm mb-4">
            01
          </div>
          <h3 className="text-base font-bold text-white mb-2">Deep Event Analysis</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Gemini parses your event parameters, identifying the event category, primary audience persona, value drivers, and psychological triggers.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800 relative">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-sm mb-4">
            02
          </div>
          <h3 className="text-base font-bold text-white mb-2">Platform-Native Generation</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Content is crafted strictly to match platform norms: Instagram bio CTAs, LinkedIn thought leadership hooks, X character limits, WhatsApp bold markdown, and email layouts.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800 relative">
          <div className="w-10 h-10 rounded-xl bg-pink-600/20 text-pink-300 border border-pink-500/30 flex items-center justify-center font-bold text-sm mb-4">
            03
          </div>
          <h3 className="text-base font-bold text-white mb-2">AI Scoring & Polish</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every output receives an AI Content Score evaluating Engagement, Clarity, Platform Fit, and CTA Strength, alongside 1-click tools to Shorten, Expand, or Translate.
          </p>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="glass-panel rounded-3xl p-8 border border-slate-800 mb-12">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-purple-400" /> Platform Architecture & Capabilities
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">Google Gemini 3.8 Flash</h4>
              <p className="text-slate-400 mt-0.5">High-speed inference, rigorous structured JSON reasoning, and zero hallucination of factual details.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">Zero Repetition Guarantee</h4>
              <p className="text-slate-400 mt-0.5">Distinct content tailored specifically per platform rather than simply syndicating identical text.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">Realistic Live Previews</h4>
              <p className="text-slate-400 mt-0.5">Interactive social feed mockups for Instagram, LinkedIn, X, WhatsApp, and Email newsletters.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white">Local Storage Privacy</h4>
              <p className="text-slate-400 mt-0.5">Your campaign drafts, history, and favorited copy remain safely inside your browser session.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center">
        <button
          onClick={onSwitchToCreate}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-bold text-sm shadow-xl shadow-purple-500/25 hover:opacity-95 transition-all inline-flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> Start Crafting Your Event Campaign
        </button>
      </div>
    </div>
  );
};
