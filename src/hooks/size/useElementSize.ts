import { useState, useEffect, useRef } from 'react';

interface Size {
  width: number;
  height: number;
}

const useElementSize = (elementRef: React.RefObject<HTMLElement>): Size => {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const observer = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    observer.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });

    observer.current.observe(element);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [elementRef]);

  return size;
};

export default useElementSize;
