import { useEffect } from "react";

export const usePromise = (
  promise: (safeUpdate: (func: () => void) => void) => Promise<void>,
  dependencies?: any[],
) => {
  useEffect(() => {
    let isMounted = true;

    function safeUpdate(func: () => void) {
      if (isMounted) func();
    }

    promise(safeUpdate);

    return () => {
      isMounted = false;
    };
  }, [...(dependencies || [])]);
};
