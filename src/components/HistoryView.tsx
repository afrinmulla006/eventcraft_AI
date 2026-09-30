import React, { useState } from 'react';
import { GeneratedCampaign, PlatformType } from '../types';
import { History, Search, Calendar, MapPin, Sparkles, Trash2, ArrowUpRight, Check, Copy } from 'lucide-react';

interface HistoryViewProps {
  history: GeneratedCampaign[];
  onLoadCampaign: (campaign: GeneratedCampaign) => void;
  onDeleteCampaign: (id: string) => void;
  onClearHistory: () => void;
  onSwitchToCreate: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onLoadCampaign,
  onDeleteCampaign,
  onClearHistory,
  onSwitchToCreate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = history.filter((camp) => {
    return (
      camp.eventDetails.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      camp.eventDetails.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (camp.analysis?.eventType && camp.analysis.eventType.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center">
              <History className="w-4 h-4" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Campaign History</h2>
          </div>
          <p className="text-sm text-slate-400">
            {history.length} saved campaign session{history.length === 1 ? '' : 's'} stored in local memory
          </p>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search past events..."
                className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 w-48 sm:w-60"
              />
            </div>

            <button
              onClick={onClearHistory}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-300 hover:bg-rose-500/10 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>
        )}
      </div>

      {/* History List */}
      {history.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No campaigns generated yet</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Your generated campaigns will automatically be saved here so you can review, restore, and iterate at any time.
          </p>
          <button
            onClick={onSwitchToCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Start Generating Content
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-xs">
          No campaign matches "{searchQuery}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((camp) => (
            <div
              key={camp.id}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {camp.analysis?.eventType || 'Event'}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-500">
                      {new Date(camp.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCampaign(camp.id);
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-800"
                      title="Delete campaign"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-base font-bold text-white mb-2 leading-snug line-clamp-1">
                  {camp.eventDetails.name}
                </h4>

                <div className="space-y-1 text-xs text-slate-400 mb-3">
                  {camp.eventDetails.date && (
                    <div className="flex items-center gap-1.5 truncate">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{camp.eventDetails.date}</span>
                    </div>
                  )}
                  {camp.eventDetails.location && (
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{camp.eventDetails.location}</span>
                    </div>
                  )}
                </div>

                {/* Platforms badges */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {camp.selectedPlatforms.map((p) => (
                    <span
                      key={p}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 uppercase"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onLoadCampaign(camp)}
                className="w-full py-2 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white font-semibold text-xs border border-purple-500/30 hover:border-purple-500 flex items-center justify-center gap-1.5 transition-all group"
              >
                <span>Open & Edit Campaign</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
