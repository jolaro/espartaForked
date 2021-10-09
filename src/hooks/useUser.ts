import { useHookstate } from "@hookstate/core";
import GlobalState from "state/GlobalState";

export const useUser = () => {
  const isLoggedIn = useHookstate(GlobalState.isLoggedIn);

  return {
    isLoggedIn,
  };
};
