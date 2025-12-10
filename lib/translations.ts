import type { Locale } from '@/types/i18n';

export const translations = {
  en: {
    users: {
      title: 'Users',
      searchPlaceholder: 'Search by name or email...',
      loading: 'Loading users...',
      error: 'Error loading users',
      retry: 'Retry',
      noUsersFound: 'No users found',
      noUsersMatch: 'No users match your search criteria.',
      showing: 'Showing {start}-{end} of {total} {count}',
      user: 'user',
      users: 'users',
      previous: 'Previous',
      next: 'Next',
      username: 'Username',
      email: 'Email',
      phone: 'Phone',
      website: 'Website',
    },
  },
  fr: {
    users: {
      title: 'Utilisateurs',
      searchPlaceholder: 'Rechercher par nom ou email...',
      loading: 'Chargement des utilisateurs...',
      error: 'Erreur lors du chargement des utilisateurs',
      retry: 'Réessayer',
      noUsersFound: 'Aucun utilisateur trouvé',
      noUsersMatch: 'Aucun utilisateur ne correspond à vos critères de recherche.',
      showing: 'Affichage de {start} à {end} sur {total} {count}',
      user: 'utilisateur',
      users: 'utilisateurs',
      previous: 'Précédent',
      next: 'Suivant',
      username: "Nom d'utilisateur",
      email: 'Email',
      phone: 'Téléphone',
      website: 'Site web',
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: unknown = translations[locale] as Record<string, unknown>;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      value = undefined;
    }
    if (value === undefined) {
      // Fallback to English if translation is missing
      value = translations.en as Record<string, unknown>;
      for (const k2 of keys) {
        if (value && typeof value === 'object' && k2 in value) {
          value = (value as Record<string, unknown>)[k2];
        } else {
          value = undefined;
          break;
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export function formatTranslation(
  locale: Locale,
  key: string,
  params: Record<string, string | number> = {}
): string {
  let translation = getTranslation(locale, key);
  
  // Replace placeholders like {start}, {end}, etc.
  Object.entries(params).forEach(([param, value]) => {
    translation = translation.replace(`{${param}}`, String(value));
  });
  
  return translation;
}
