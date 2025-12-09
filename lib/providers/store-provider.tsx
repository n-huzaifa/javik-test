'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import type { Locale } from '@/types/i18n';

export function StoreProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const setLocale = useAppStore((state) => state.setLocale);

  useEffect(() => {
    setLocale(locale);
  }, [locale, setLocale]);

  return <>{children}</>;
}

