import { useQuery } from '@tanstack/react-query';
import { SetStateAction } from 'jotai';
import {
  concat, equals, inc, isNil,
} from 'ramda';
import { useMemo, useRef } from 'react';
import { paginatedFetch } from './paginatedFetch';
import { useIntersectionObserver } from './useIntersectionObserver';

const hasLink = ({ pagination, link }) => pagination.find(({ text }) => equals(text, link));

interface UseLoadPaginatedContentProps {
  page: number;
  name: string;
  baseEndpoint: string;
  setPage: (update: SetStateAction<number>) => void;
}

interface UseLoadPaginatedContentState<T> {
  lastElementRef: (node) => void;
  result: Array<T>;
  isLoading: boolean;
}

export const useLoadPaginatedContent = <T>({
  page, setPage, name, baseEndpoint,
}: UseLoadPaginatedContentProps): UseLoadPaginatedContentState<T> => {
  const listingResultRef = useRef<Array<T>>([]);

  const { data, isLoading, fetchStatus } = useQuery({
    queryKey: [name, page],
    queryFn: () => paginatedFetch<T>(`${baseEndpoint}?page=${page}`),
    suspense: true,
    keepPreviousData: true,
  });

  const nextLink = useMemo(
    () => hasLink({ pagination: data?.pagination, link: 'next' }),
    [data?.pagination],
  );

  const lastElementRef = useIntersectionObserver({
    loading: isLoading,
    action: () => {
      setPage((currentBookPage) => inc(currentBookPage));
    },
    isLastPage: isNil(nextLink),
  });

  listingResultRef.current = useMemo(() => {
    if (isNil(data) || !equals(fetchStatus, 'idle')) {
      return listingResultRef.current;
    }

    return concat(listingResultRef.current, data.data);
  }, [page, data, fetchStatus]);

  return { lastElementRef, result: listingResultRef.current, isLoading };
};
