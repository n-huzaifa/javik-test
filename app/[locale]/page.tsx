'use client';

import { UsersList } from '@/components/users-list';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <UsersList />
      </main>
    </div>
  );
}

