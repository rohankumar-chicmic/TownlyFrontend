import { useState, useEffect, useRef } from 'react';

interface InfiniteListResult<T> {
  allItems: T[];
  page: number;
  handleEndReached: () => void;
  resetPage: () => void;
  isResetting: boolean;
  setAllItems: React.Dispatch<React.SetStateAction<T[]>>;
}

export function useInfiniteList<T>(
  data: { hasMore: boolean; items: T[] } | undefined,
  isFetching: boolean,
  setPage: (fn: (prev: number) => number) => void,
  resetDeps: any[],
  mergeFn?: (prev: T[], incoming: T[]) => T[],
): InfiniteListResult<T> {
  const [allItems, setAllItems] = useState<T[]>([]);
  const [isResetting, setIsResetting] = useState(false);
  const pageRef = useRef(1);
  const isFirstRun = useRef(true);

  // Auto-reset on dep change — SKIP on initial mount and skip if deps is empty
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (resetDeps.length === 0) return;

    setAllItems([]);
    setIsResetting(true);
    pageRef.current = 1;
    setPage(() => 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, resetDeps);

  // Append/replace data when it arrives
  useEffect(() => {
    if (!data?.items) return;
    setAllItems(prev => {
      if (pageRef.current === 1) return data.items;
      return mergeFn ? mergeFn(prev, data.items) : [...prev, ...data.items];
    });
    setIsResetting(false);
  }, [data?.items]);

  const handleEndReached = () => {
    if (!isFetching && data?.hasMore) {
      pageRef.current += 1;
      setPage(prev => prev + 1);
    }
  };

  const resetPage = () => {
    setAllItems([]);
    setIsResetting(true);
    pageRef.current = 1;
    setPage(() => 1);
  };

  return {
    allItems,
    page: pageRef.current,
    handleEndReached,
    resetPage,
    isResetting,
    setAllItems,
  };
}
