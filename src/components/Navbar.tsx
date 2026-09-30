import React from 'react';
import { Sparkles, Calendar, History, Star, Info, PlusCircle, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'create' | 'history' | 'favorites' | 'about';
  onSelectTab: (tab: 'home' | 'create' | 'history' | 'favorites' | 'about') => void;
  favoritesCount: number;
  historyCount: number;
  onTryDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  favoritesCount,
  historyCount,
  onTryDemo,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#07090e]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-white tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text">
                ✨ EventFlow AI
              </span>
            </div>
            <span className="text-[10px] text-purple-400 font-semibold block leading-none tracking-wide">
              by EventCraft
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-2xl border border-slate-800/80">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'home'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => onSelectTab('create')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'create'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            Create
          </button>

          <button
            onClick={() => onSelectTab('history')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'history'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>History</span>
            {historyCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('favorites')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'favorites'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {favoritesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('about')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'about'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right CTA Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTryDemo}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Load sample event demo"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Try Demo</span>
          </button>

          <button
            onClick={() => onSelectTab('create')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 hover:from-purple-500 hover:via-indigo-500 hover:to-pink-400 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create Content</span>
          </button>
        </div>
      </div>

      {/* Mobile Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/60 bg-slate-950/90 py-2 px-3 text-[11px] font-medium text-slate-400">
        <button
          onClick={() => onSelectTab('home')}
          className={`px-2 py-1 rounded-lg ${activeTab === 'home' ? 'text-purple-400 font-bold' : ''}`}
        >
          Home
        </button>
        <button
          onClick={() => onSelectTab('create')}
          className={`px-2 py-1 rounded-lg ${activeTab === 'create' ? 'text-purple-400 font-bold' : ''}`}
        >
          Create
        </button>
        <button
          onClick={() => onSelectTab('history')}
          className={`px-2 py-1 rounded-lg flex items-center gap-1 ${activeTab === 'history' ? 'text-purple-400 font-bold' : ''}`}
        >
          History {historyCount > 0 && `(${historyCount})`}
        </button>
        <button
          onClick={() => onSelectTab('favorites')}
          className={`px-2 py-1 rounded-lg flex items-center gap-1 ${activeTab === 'favorites' ? 'text-purple-400 font-bold' : ''}`}
        >
          Favorites {favoritesCount > 0 && `(${favoritesCount})`}
        </button>
        <button
          onClick={() => onSelectTab('about')}
          className={`px-2 py-1 rounded-lg ${activeTab === 'about' ? 'text-purple-400 font-bold' : ''}`}
        >
          About
        </button>
      </div>
    </header>
  );
};
