import { useEffect } from "react";

export const usePromise = (promise: (safeUpdate: (func: () => void) => void) => Promise<void>) => {
  useEffect(() => {
    let isMounted = true;

    function safeUpdate(func: () => void) {
      if (isMounted) func();
    }

    promise(safeUpdate);

    return () => {
      isMounted = false;
    };
  }, []);
};
