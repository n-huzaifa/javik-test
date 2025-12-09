'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <Spinner size="lg" />
          <p className="text-sm text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <p className="text-destructive font-medium">Error loading users</p>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchUsers} variant="outline">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-6">Users</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="font-semibold text-lg mb-2">{user.name}</h2>
            <p className="text-sm text-muted-foreground mb-1">
              <span className="font-medium">Username:</span> {user.username}
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-sm text-muted-foreground mb-1">
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Website:</span> {user.website}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
