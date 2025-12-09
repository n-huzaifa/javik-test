'use client';

import { useEffect, useCallback } from 'react';
import { useAppStore } from '@/lib/store';

export function useApiData<T = any>(url: string, key: string) {
  const data = useAppStore((state) => state.data);
  const setData = useAppStore((state) => state.setData);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData({ ...data, [key]: result });
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    }
  }, [url, key, data, setData]);

  useEffect(() => {
    if (!data[key]) {
      fetchData();
    }
  }, [key, data, fetchData]);

  return data[key] as T | undefined;
}

