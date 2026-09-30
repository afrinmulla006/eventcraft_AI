import React, { useState } from 'react';
import { FavoriteItem, PlatformType } from '../types';
import { Star, Copy, Download, Trash2, ArrowUpRight, Search, Check, Sparkles } from 'lucide-react';

interface FavoritesViewProps {
  favorites: FavoriteItem[];
  onRemoveFavorite: (id: string) => void;
  onCopyText: (text: string, title: string) => void;
  onSwitchToCreate: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onRemoveFavorite,
  onCopyText,
  onSwitchToCreate,
}) => {
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const platforms: { id: string; label: string }[] = [
    { id: 'all', label: 'All Platforms' },
    { id: 'instagram', label: 'Instagram' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'twitter', label: 'X / Twitter' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'email', label: 'Email' },
  ];

  const filtered = favorites.filter((fav) => {
    const matchesPlatform = filterPlatform === 'all' || fav.platform === filterPlatform;
    const matchesSearch =
      fav.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fav.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fav.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  const handleCopy = (fav: FavoriteItem) => {
    onCopyText(fav.content, fav.title || 'Favorited Content');
    setCopiedId(fav.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (fav: FavoriteItem) => {
    const blob = new Blob(
      [
        `EVENT: ${fav.eventName}\n` +
        `PLATFORM: ${fav.platform.toUpperCase()}\n` +
        `VARIATION: ${fav.variationType.toUpperCase()} - ${fav.title}\n` +
        (fav.subjectLine ? `SUBJECT LINE: ${fav.subjectLine}\n` : '') +
        `SAVED: ${new Date(fav.savedAt).toLocaleString()}\n\n` +
        `--- CONTENT ---\n` +
        `${fav.content}\n\n` +
        (fav.hashtags.length > 0 ? `HASHTAGS:\n${fav.hashtags.join(' ')}\n` : '')
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fav.eventName.replace(/[^a-zA-Z0-9]/g, '_')}_${fav.platform}_${fav.variationType}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-300" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Bookmarked Favorites</h2>
          </div>
          <p className="text-sm text-slate-400">
            {favorites.length} saved high-performing copy variation{favorites.length === 1 ? '' : 's'} stored locally
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved copy..."
                className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 w-48 sm:w-60"
              />
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      {favorites.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6">
          {platforms.map((p) => {
            const count = p.id === 'all'
              ? favorites.length
              : favorites.filter((f) => f.platform === p.id).length;

            return (
              <button
                key={p.id}
                onClick={() => setFilterPlatform(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all ${
                  filterPlatform === p.id
                    ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/25'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border-slate-800/80 hover:bg-slate-800'
                }`}
              >
                {p.label} <span className="opacity-70 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 max-w-lg mx-auto my-12">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No bookmarked variations yet</h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Star your favorite AI-generated variations from the Create page to quickly access and export them anytime.
          </p>
          <button
            onClick={onSwitchToCreate}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Go to Create Content
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-xs">
          No favorites match your filter criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((fav) => (
            <div
              key={fav.id}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {fav.platform}
                    </span>
                    <span className="text-xs text-slate-400 font-medium capitalize">
                      {fav.variationType}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveFavorite(fav.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{fav.eventName}</h4>
                <p className="text-xs font-semibold text-purple-300 mb-3">{fav.title}</p>

                {fav.subjectLine && (
                  <div className="mb-2 p-2 rounded-lg bg-purple-950/30 border border-purple-500/20 text-xs">
                    <span className="text-purple-400 font-semibold block text-[10px]">Subject:</span>
                    <span className="text-slate-200">{fav.subjectLine}</span>
                  </div>
                )}

                <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 max-h-56 overflow-y-auto mb-3">
                  {fav.content}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">
                  Saved {new Date(fav.savedAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(fav)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
                  >
                    {copiedId === fav.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === fav.id ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => handleDownload(fav)}
                    className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
                    title="Download .txt"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
