import { useSearchParams } from 'react-router-dom';
import { useMemo, useCallback } from 'react';

export default function useCurrentTab<T extends string | number>(defaultTab: T, paramKey = "tab", ): [T | null, (tabKey: T) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = searchParams.get(paramKey);

  const changeTab = useCallback((name: T) => {
    searchParams.set(paramKey, name as string);
    setSearchParams(searchParams);
  }, [paramKey, searchParams, setSearchParams]);

  const currentTab = useMemo(() => {
    if (tabFromUrl) return tabFromUrl as T;
    if (defaultTab) return defaultTab
    return null;
  }, [tabFromUrl, defaultTab]);

  return [currentTab, changeTab]
}