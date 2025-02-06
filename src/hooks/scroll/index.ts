import { useState, useEffect, useCallback } from "react";

interface ScrollData {
  scrollY: number;
  direction: "up" | "down";
}

function useThrottle(callback: () => void, delay: number) {
  const [lastRun, setLastRun] = useState(Date.now());

  const throttledFunction = useCallback(() => {
    const now = Date.now();
    if (now - lastRun >= delay) {
      callback();
      setLastRun(now);
    }
  }, [delay, lastRun, callback]);

  return throttledFunction;
}

export const useScrollHandler = (): ScrollData => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollData, setScrollData] = useState<ScrollData>({
    scrollY: 0,
    direction: "up",
  });

  const handleScroll = useCallback(() => {
    const { scrollTop } = document.documentElement;
    const direction = scrollTop > lastScrollTop ? "down" : "up";
    setScrollData({ scrollY: scrollTop, direction });
    setLastScrollTop(scrollTop);
  }, [lastScrollTop]);

  const throttledScrollHandler = useThrottle(handleScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [throttledScrollHandler]);

  return scrollData;
};
