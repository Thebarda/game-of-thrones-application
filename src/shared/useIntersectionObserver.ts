import { useRef, useCallback } from 'react';

interface HookParam {
  action: () => void;
  loading: boolean;
  isLastPage: boolean;
}

export const useIntersectionObserver = ({
  loading,
  action,
  isLastPage,
}: HookParam): ((node) => void) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      if (loading) {
        observer.current = null;

        return;
      }

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !isLastPage) {
          action();
        }
      });

      if (node && observer.current) {
        observer.current.observe(node);
      }
    },
    [loading, isLastPage],
  );

  return lastElementRef;
};
