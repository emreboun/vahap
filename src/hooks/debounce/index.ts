import { useEffect, useState } from "react";

export const useDebounceWithTimeout = (
  func: (dep: any) => void,
  dep: any,
  timeout: number = 5000
) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (!!dep) {
      id = setTimeout(() => {
        func(dep);
        setTimeoutId(null);
      }, timeout);

      setTimeoutId((prev) => {
        if (prev) clearTimeout(prev);
        return id;
      });
    }

    return () => clearTimeout(id);
  }, [func, dep, timeout]);

  return () => clearTimeout(timeoutId!);
};
