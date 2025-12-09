'use client';

import { use } from 'react';
import { useAppStore } from "@/lib/store";
import type { Locale } from "@/types/i18n";

export default function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale: paramLocale } = use(params);
  const locale = useAppStore((state) => state.locale);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            {locale === 'en' ? 'Welcome' : 'Bienvenue'}
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {locale === 'en' 
              ? 'Current locale: English' 
              : 'Locale actuelle : Français'}
          </p>
        </div>
      </main>
    </div>
  );
}

