'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const USERS_PER_PAGE = 5;

export function UsersList() {
  const { t } = useTranslations();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) {
      return users;
    }
    
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-sm text-muted-foreground">{t('users.loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <p className="text-destructive font-medium">{t('users.error')}</p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchUsers} variant="outline">
            {t('users.retry')}
          </Button>
        </div>
      </div>
    );
  }

  const userCountText = filteredUsers.length === 1 ? t('users.user') : t('users.users');
  const showingText = filteredUsers.length === 0
    ? t('users.noUsersFound')
    : t('users.showing', {
        start: startIndex + 1,
        end: Math.min(endIndex, filteredUsers.length),
        total: filteredUsers.length,
        count: userCountText,
      });

  return (
    <div className="w-full max-w-6xl mx-auto py-4 sm:py-8 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">{t('users.title')}</h1>
      
      <div className="mb-4 sm:mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
          <Input
            type="text"
            placeholder={t('users.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {showingText}
      </p>

      {filteredUsers.length > 0 ? (
        <>
          {/* Mobile Card Layout */}
          <div className="block md:hidden space-y-3 mb-6">
            {paginatedUsers.map((user) => (
              <div
                key={user.id}
                className="border rounded-lg p-4 bg-card hover:bg-muted/30 transition-colors"
              >
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-foreground text-base">{user.name}</div>
                    <div className="text-muted-foreground text-sm mt-0.5">@{user.username}</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground font-medium">{t('users.email')}: </span>
                      <span className="text-foreground">{user.email}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-medium">{t('users.phone')}: </span>
                      <span className="text-foreground">{user.phone}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground font-medium">{t('users.website')}: </span>
                      <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {user.website}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden md:block border rounded-lg overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b">
                      {t('users.username')}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b">
                      {t('users.email')}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b">
                      {t('users.phone')}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b">
                      {t('users.website')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className={`hover:bg-muted/30 transition-colors ${
                        index < paginatedUsers.length - 1 ? 'border-b' : ''
                      }`}
                    >
                      <td className="px-4 py-3 text-sm">
                        <div className="font-medium text-foreground">{user.name}</div>
                        <div className="text-muted-foreground text-xs mt-0.5">{user.username}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">{user.email}</td>
                      <td className="px-4 py-3 text-sm text-foreground">{user.phone}</td>
                      <td className="px-4 py-3 text-sm">
                        <a
                          href={`https://${user.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {user.website}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-full sm:w-auto"
              >
                <ChevronLeft className="size-4" />
                {t('users.previous')}
              </Button>
              
              <div className="flex items-center gap-1 flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="min-w-10"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="w-full sm:w-auto"
              >
                {t('users.next')}
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('users.noUsersMatch')}</p>
        </div>
      )}
    </div>
  );
}
