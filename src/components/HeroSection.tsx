import React from 'react';
import { Sparkles, Zap, ArrowRight, CheckCircle2, ShieldCheck, Share2, Instagram, Linkedin, Twitter, MessageSquare, Mail } from 'lucide-react';
import { DEMO_PRESETS } from '../data/demoEvents';

interface HeroSectionProps {
  onStartCreating: () => void;
  onTryDemoPreset: (presetId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartCreating,
  onTryDemoPreset,
}) => {
  return (
    <div className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Background Gradients & Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-purple-600/20 via-indigo-600/20 to-pink-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold mb-6 shadow-inner hover:bg-purple-500/15 transition-all">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Powered by Google Gemini 3.8 Intelligence</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
          One Event. <br />
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent drop-shadow-sm">
            Endless Stories.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Transform any event into platform-ready content with AI.
        </p>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
          Tailored copy for Instagram, LinkedIn, X, WhatsApp, and Email with instant AI content scores and live interactive feed previews.
        </p>

        {/* Hero Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={onStartCreating}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:from-purple-500 hover:via-indigo-500 hover:to-pink-400 text-white font-bold text-sm shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>Create Content ✨</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onTryDemoPreset()}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 hover:border-purple-500/50 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Try Demo</span>
          </button>
        </div>

        {/* Platform Quick Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 max-w-3xl mx-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Bespoke Native Formatting For Every Channel
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-pink-500" /> Instagram Captions
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-sky-500" /> LinkedIn Thought-Leadership
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-slate-300" /> X / Twitter Hooks
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> WhatsApp Broadcasts
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-purple-500" /> Email Newsletters
            </div>
          </div>
        </div>

        {/* Quick Demo Event Pickers */}
        <div className="mt-10 max-w-4xl mx-auto p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs mb-3">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Instant Demo Presets (1-Click Load & Test):
            </span>
            <span className="text-slate-400 text-[11px]">Click any event to immediately populate</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
            {DEMO_PRESETS.slice(0, 3).map((demo) => (
              <button
                key={demo.id}
                onClick={() => onTryDemoPreset(demo.id)}
                className="p-2.5 rounded-xl bg-slate-950/70 hover:bg-purple-950/30 border border-slate-800/80 hover:border-purple-500/40 text-left transition-all group"
              >
                <span className="text-[10px] font-bold uppercase text-purple-400 block mb-0.5">{demo.tag}</span>
                <p className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">{demo.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
