'use client';

import { useAppStore } from '@/lib/store';
import { getTranslation, formatTranslation } from '@/lib/translations';

export function useTranslations() {
  const locale = useAppStore((state) => state.locale);

  const t = (key: string, params?: Record<string, string | number>): string => {
    if (params) {
      return formatTranslation(locale, key, params);
    }
    return getTranslation(locale, key);
  };

  return { t, locale };
}
