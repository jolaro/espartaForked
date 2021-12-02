import { usePromise } from "hooks/usePromise";
import GlobalState from "state/GlobalState";
import ApiService from "utils/api_service/api_service";

const useSoldierMyRequests = () => {
  const fetch = async () => {
    const { data } = await ApiService.get("/api/requestgroup", { loanee_id: GlobalState.user!.id });
    //TODO: Complete
  };

  usePromise(async (safeUpdate) => {
    await fetch();
    safeUpdate(() => {
      // none
    });
  }, []);

  return [];
};

export default useSoldierMyRequests;
