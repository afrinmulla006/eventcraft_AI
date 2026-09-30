import { GeneratedCampaign, FavoriteItem, EventDetails, AiControls } from '../types';

const STORAGE_KEYS = {
  HISTORY: 'eventcraft_campaign_history_v1',
  FAVORITES: 'eventcraft_favorites_v1',
  DRAFT: 'eventcraft_draft_event_v1',
};

export const StorageService = {
  getHistory(): GeneratedCampaign[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to load history from localStorage', e);
      return [];
    }
  },

  saveCampaign(campaign: GeneratedCampaign): void {
    try {
      const history = this.getHistory();
      // Keep most recent first, max 30 campaigns
      const updated = [campaign, ...history.filter((c) => c.id !== campaign.id)].slice(0, 30);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save campaign to localStorage', e);
    }
  },

  deleteCampaign(id: string): GeneratedCampaign[] {
    try {
      const history = this.getHistory().filter((c) => c.id !== id);
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
      return history;
    } catch (e) {
      console.error('Failed to delete campaign', e);
      return [];
    }
  },

  clearHistory(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.HISTORY);
    } catch (e) {
      console.error('Failed to clear history', e);
    }
  },

  getFavorites(): FavoriteItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to load favorites', e);
      return [];
    }
  },

  addFavorite(item: FavoriteItem): FavoriteItem[] {
    try {
      const favs = this.getFavorites();
      const updated = [item, ...favs.filter((f) => f.id !== item.id)];
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.error('Failed to add favorite', e);
      return [];
    }
  },

  removeFavorite(id: string): FavoriteItem[] {
    try {
      const favs = this.getFavorites().filter((f) => f.id !== id);
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
      return favs;
    } catch (e) {
      console.error('Failed to remove favorite', e);
      return [];
    }
  },

  isFavorited(id: string): boolean {
    const favs = this.getFavorites();
    return favs.some((f) => f.id === id);
  },

  getDraft(): { eventDetails: EventDetails; controls: AiControls } | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.DRAFT);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  saveDraft(eventDetails: EventDetails, controls: AiControls): void {
    try {
      localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify({ eventDetails, controls }));
    } catch {
      // silent catch for private quota
    }
  },
};
