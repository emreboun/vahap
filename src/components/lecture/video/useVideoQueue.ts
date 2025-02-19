import { useState, useCallback } from "react";

const useVideoQueue = (initialQueue: string[]) => {
  const [queue, setQueue] = useState<string[]>(initialQueue);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVideo = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < queue.length ? prevIndex + 1 : 0
    );
  }, [queue.length]);

  return {
    currentVideo: queue[currentIndex],
    nextVideo,
  };
};

export default useVideoQueue;
