import { useEffect, useState } from "react";

/**
 * Hook that provides a delayed loading state to prevent flickering on fast loading operations
 * @param loading The actual loading state
 * @param delay The minimum time in milliseconds that the loading state should be shown
 * @returns The delayed loading state
 */
export const useDelayedLoading = (loading: boolean, delay: number = 500) => {
  const [delayedLoading, setDelayedLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setDelayedLoading(true);
    }

    const timer = setTimeout(() => {
      setDelayedLoading(loading);
    }, delay);

    return () => clearTimeout(timer);
  }, [loading, delay]);

  return delayedLoading;
};
