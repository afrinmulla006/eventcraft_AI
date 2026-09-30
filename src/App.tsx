/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  EventDetails,
  AiControls,
  PlatformType,
  GeneratedCampaign,
  ContentVariation,
  FavoriteItem,
} from './types';
import { DEMO_PRESETS } from './data/demoEvents';
import { generateEventContent, transformEventContent } from './services/api';
import { StorageService } from './services/storage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CreatePage } from './components/CreatePage';
import { HistoryView } from './components/HistoryView';
import { FavoritesView } from './components/FavoritesView';
import { AboutView } from './components/AboutView';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'create' | 'history' | 'favorites' | 'about'>('home');

  // Form State
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    name: '',
    date: '',
    location: '',
    organizer: '',
    description: '',
    context: '',
  });

  const [controls, setControls] = useState<AiControls>({
    tone: 'Exciting',
    length: 'Medium',
    audience: 'Professionals',
    creativity: 'High',
    language: 'English',
  });

  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([
    'instagram',
    'linkedin',
    'twitter',
    'whatsapp',
    'email',
  ]);

  // Campaign State
  const [currentCampaign, setCurrentCampaign] = useState<GeneratedCampaign | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Storage State
  const [history, setHistory] = useState<GeneratedCampaign[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  // Toast System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', title: string, description?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load initial history & favorites on mount
  useEffect(() => {
    const savedHistory = StorageService.getHistory();
    const savedFavorites = StorageService.getFavorites();
    setHistory(savedHistory);
    setFavorites(savedFavorites);

    if (savedHistory.length > 0) {
      setCurrentCampaign(savedHistory[0]);
      setEventDetails(savedHistory[0].eventDetails);
      setControls(savedHistory[0].controls);
      if (savedHistory[0].selectedPlatforms && savedHistory[0].selectedPlatforms.length > 0) {
        setSelectedPlatforms(savedHistory[0].selectedPlatforms);
      }
    } else {
      // Default populate with first demo preset so it's instantly ready
      const defaultPreset = DEMO_PRESETS[0];
      setEventDetails(defaultPreset.eventDetails);
      setControls(defaultPreset.controls);
    }
  }, []);

  // Handler: Generate Content
  const handleGenerate = async () => {
    if (!eventDetails.name.trim()) {
      addToast('error', 'Event Name Required', 'Please provide a name for the event.');
      return;
    }

    try {
      setIsGenerating(true);
      const res = await generateEventContent(eventDetails, selectedPlatforms, controls);

      // Add unique IDs to variations if needed
      const platformContentWithIds = res.platformContent.map((pc, pIdx) => ({
        ...pc,
        variations: pc.variations.map((v, vIdx) => ({
          ...v,
          id: v.id || `var_${pc.platform}_${v.type}_${Date.now()}_${pIdx}_${vIdx}`,
        })),
      }));

      const newCampaign: GeneratedCampaign = {
        id: `camp_${Date.now()}`,
        createdAt: new Date().toISOString(),
        eventDetails,
        controls,
        analysis: res.analysis,
        platformContent: platformContentWithIds,
        selectedPlatforms,
      };

      setCurrentCampaign(newCampaign);
      StorageService.saveCampaign(newCampaign);
      setHistory(StorageService.getHistory());

      addToast(
        'success',
        'Campaign Generated!',
        `Created bespoke copy variations across ${selectedPlatforms.length} platforms.`
      );
    } catch (err: any) {
      console.error('Generation error:', err);
      addToast('error', 'Generation Error', err.message || 'Failed to generate campaign.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handler: Transform single variation (shorten, expand, tone, translate, improve, regenerate)
  const handleTransformVariation = async (
    action: 'shorten' | 'expand' | 'change_tone' | 'translate' | 'improve' | 'regenerate',
    variationId: string,
    platform: PlatformType,
    params?: { targetTone?: string; targetLanguage?: string; instruction?: string }
  ) => {
    if (!currentCampaign) return;

    // Find variation in current campaign
    const platformData = currentCampaign.platformContent.find((pc) => pc.platform === platform);
    const variation = platformData?.variations.find((v) => v.id === variationId);

    if (!variation) return;

    try {
      const res = await transformEventContent({
        action,
        text: variation.content,
        platform,
        variationType: variation.type,
        eventDetails: currentCampaign.eventDetails,
        targetTone: params?.targetTone,
        targetLanguage: params?.targetLanguage,
        instruction: params?.instruction,
      });

      // Update campaign state in place
      const updatedPlatformContent = currentCampaign.platformContent.map((pc) => {
        if (pc.platform !== platform) return pc;
        return {
          ...pc,
          variations: pc.variations.map((v) => {
            if (v.id !== variationId) return v;
            return {
              ...v,
              content: res.content,
              subjectLine: res.subjectLine || v.subjectLine,
              score: res.score || v.score,
            };
          }),
        };
      });

      const updatedCampaign = {
        ...currentCampaign,
        platformContent: updatedPlatformContent,
      };

      setCurrentCampaign(updatedCampaign);
      StorageService.saveCampaign(updatedCampaign);
      setHistory(StorageService.getHistory());

      const actionLabels: Record<string, string> = {
        shorten: 'Shortened',
        expand: 'Expanded',
        change_tone: `Adapted to ${params?.targetTone || 'new'} tone`,
        translate: `Translated to ${params?.targetLanguage || 'target language'}`,
        improve: 'Polished with AI',
        regenerate: 'Regenerated fresh angle',
      };

      addToast('success', 'AI Transform Applied', actionLabels[action] || 'Content updated successfully.');
    } catch (err: any) {
      console.error('Transform error:', err);
      addToast('error', 'Transform Failed', err.message || 'Could not update variation.');
    }
  };

  // Handler: Toggle Favorite
  const handleFavoriteToggle = (variation: ContentVariation, platform: PlatformType) => {
    if (!currentCampaign) return;

    const existingFav = favorites.find((f) => f.id === variation.id);

    if (existingFav) {
      const updated = StorageService.removeFavorite(variation.id);
      setFavorites(updated);
      addToast('info', 'Removed From Favorites', variation.title);
    } else {
      const platformData = currentCampaign.platformContent.find((pc) => pc.platform === platform);
      const newFav: FavoriteItem = {
        id: variation.id,
        campaignId: currentCampaign.id,
        eventName: currentCampaign.eventDetails.name,
        platform,
        variationType: variation.type,
        title: variation.title || `${platform.toUpperCase()} ${variation.type}`,
        content: variation.content,
        subjectLine: variation.subjectLine,
        hashtags: platformData?.hashtags || [],
        savedAt: new Date().toISOString(),
      };

      const updated = StorageService.addFavorite(newFav);
      setFavorites(updated);
      addToast('success', 'Saved to Favorites!', variation.title);
    }
  };

  const isFavorited = (id: string) => {
    return favorites.some((f) => f.id === id);
  };

  // Handler: Copy Text to Clipboard
  const handleCopyText = (text: string, title?: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    addToast('success', 'Copied to Clipboard!', title || 'Text copied.');
  };

  // Handler: Download Variation as .txt
  const handleDownloadVariation = (variation: ContentVariation, platform: PlatformType) => {
    if (!currentCampaign) return;

    const platformData = currentCampaign.platformContent.find((pc) => pc.platform === platform);
    const content =
      `============================================================\n` +
      `EVENT: ${currentCampaign.eventDetails.name}\n` +
      `DATE: ${currentCampaign.eventDetails.date}\n` +
      `LOCATION: ${currentCampaign.eventDetails.location}\n` +
      `ORGANIZER: ${currentCampaign.eventDetails.organizer}\n` +
      `PLATFORM: ${platform.toUpperCase()}\n` +
      `VARIATION: ${variation.type.toUpperCase()} - ${variation.title}\n` +
      (variation.subjectLine ? `SUBJECT LINE: ${variation.subjectLine}\n` : '') +
      `AI CONTENT SCORE: ${variation.score?.overall || 95}/100\n` +
      `GENERATED VIA EVENTCRAFT AI (GEMINI 3.8 FLASH)\n` +
      `============================================================\n\n` +
      `CONTENT:\n` +
      `------------------------------------------------------------\n` +
      `${variation.content}\n` +
      `------------------------------------------------------------\n\n` +
      (platformData?.hashtags && platformData.hashtags.length > 0
        ? `HASHTAGS:\n${platformData.hashtags.join(' ')}\n\n`
        : '') +
      (platformData?.recommendedCtas && platformData.recommendedCtas.length > 0
        ? `RECOMMENDED CALLS TO ACTION:\n${platformData.recommendedCtas.map((c) => `• ${c}`).join('\n')}\n`
        : '');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentCampaign.eventDetails.name.replace(/[^a-zA-Z0-9]/g, '_')}_${platform}_${variation.type}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    addToast('success', 'File Downloaded', `${variation.title} saved as .txt`);
  };

  // Handler: Load Preset Demo
  const handleLoadPreset = (presetId?: string) => {
    const preset = DEMO_PRESETS.find((p) => p.id === presetId) || DEMO_PRESETS[0];
    setEventDetails(preset.eventDetails);
    setControls(preset.controls);
    setSelectedPlatforms(['instagram', 'linkedin', 'twitter', 'whatsapp', 'email']);
    setActiveTab('create');
    addToast('info', 'Demo Loaded', `Populated "${preset.label}". Click Generate Content to analyze.`);
  };

  // Handler: "Try Demo" button from Navbar or Hero
  const handleTryDemoInstant = () => {
    handleLoadPreset('ai-summit');
  };

  // Handler: Load past campaign from history
  const handleLoadPastCampaign = (campaign: GeneratedCampaign) => {
    setCurrentCampaign(campaign);
    setEventDetails(campaign.eventDetails);
    setControls(campaign.controls);
    setSelectedPlatforms(campaign.selectedPlatforms || ['instagram', 'linkedin', 'twitter']);
    setActiveTab('create');
    addToast('info', 'Campaign Restored', `Loaded "${campaign.eventDetails.name}" from history.`);
  };

  // Handler: Delete campaign from history
  const handleDeleteCampaign = (id: string) => {
    const updated = StorageService.deleteCampaign(id);
    setHistory(updated);
    if (currentCampaign?.id === id) {
      setCurrentCampaign(updated.length > 0 ? updated[0] : null);
    }
    addToast('info', 'Campaign Deleted', 'Session removed from history.');
  };

  // Handler: Clear all history
  const handleClearHistory = () => {
    StorageService.clearHistory();
    setHistory([]);
    addToast('info', 'History Cleared', 'All stored sessions removed.');
  };

  // Handler: Remove favorite
  const handleRemoveFavorite = (id: string) => {
    const updated = StorageService.removeFavorite(id);
    setFavorites(updated);
    addToast('info', 'Removed Favorite', 'Item unstarred.');
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        favoritesCount={favorites.length}
        historyCount={history.length}
        onTryDemo={handleTryDemoInstant}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            <HeroSection
              onStartCreating={() => setActiveTab('create')}
              onTryDemoPreset={(presetId) => handleLoadPreset(presetId)}
            />
            {/* Show Create component preview immediately below hero */}
            <div className="border-t border-slate-800/80 bg-slate-950/40 py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                  Interactive Studio
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Start Crafting Platform Copy
                </h2>
              </div>
              <CreatePage
                eventDetails={eventDetails}
                setEventDetails={setEventDetails}
                controls={controls}
                setControls={setControls}
                selectedPlatforms={selectedPlatforms}
                setSelectedPlatforms={setSelectedPlatforms}
                currentCampaign={currentCampaign}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                onTransformVariation={handleTransformVariation}
                onFavoriteToggle={handleFavoriteToggle}
                isFavorited={isFavorited}
                onCopyText={handleCopyText}
                onDownloadVariation={handleDownloadVariation}
                onLoadPreset={handleLoadPreset}
              />
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <CreatePage
            eventDetails={eventDetails}
            setEventDetails={setEventDetails}
            controls={controls}
            setControls={setControls}
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
            currentCampaign={currentCampaign}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            onTransformVariation={handleTransformVariation}
            onFavoriteToggle={handleFavoriteToggle}
            isFavorited={isFavorited}
            onCopyText={handleCopyText}
            onDownloadVariation={handleDownloadVariation}
            onLoadPreset={handleLoadPreset}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onLoadCampaign={handleLoadPastCampaign}
            onDeleteCampaign={handleDeleteCampaign}
            onClearHistory={handleClearHistory}
            onSwitchToCreate={() => setActiveTab('create')}
          />
        )}

        {activeTab === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            onRemoveFavorite={handleRemoveFavorite}
            onCopyText={handleCopyText}
            onSwitchToCreate={() => setActiveTab('create')}
          />
        )}

        {activeTab === 'about' && (
          <AboutView onSwitchToCreate={() => setActiveTab('create')} />
        )}
      </main>

      {/* Modern Footer */}
      <footer className="border-t border-slate-800/80 bg-[#05070a] py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">✨ EventCraft AI</span>
            <span>•</span>
            <span>Built with Google Gemini 3.8 Flash</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setActiveTab('create')} className="hover:text-white transition-colors">
              Create
            </button>
            <button onClick={() => setActiveTab('history')} className="hover:text-white transition-colors">
              History
            </button>
            <button onClick={() => setActiveTab('favorites')} className="hover:text-white transition-colors">
              Favorites
            </button>
            <button onClick={() => setActiveTab('about')} className="hover:text-white transition-colors">
              About
            </button>
          </div>
          <p>© {new Date().getFullYear()} EventCraft AI. Instant Omni-Channel Event Storytelling.</p>
        </div>
      </footer>

      {/* Floating Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
