import { useHookstate } from "@hookstate/core";
import GlobalState from "state/GlobalState";

export const useUser = () => {
  const isLoggedIn = useHookstate(GlobalState["_isLoggedIn"]);
  const user = useHookstate(GlobalState["_user"]);

  return {
    isLoggedIn,
    user,
  };
};
