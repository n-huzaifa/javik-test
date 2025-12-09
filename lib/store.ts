import { create } from 'zustand';
import type { Locale } from '@/types/i18n';

interface AppState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  data: Record<string, any>;
  setData: (data: Record<string, any>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  locale: 'en',
  setLocale: (locale) => set({ locale }),
  data: {},
  setData: (data) => set({ data }),
}));

