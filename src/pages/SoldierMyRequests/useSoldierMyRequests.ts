// import { MilitaryTechIcon } from "@mui/icons-material/MilitaryTech";
import { GenericTableRow } from "components/molecules/GenericTable";
import { useState } from "react";
import { RequestGroupResponse, RequestItemResponse } from "./../../utils/api_service/endpoints.config";
import { usePromise } from "hooks/usePromise";
import GlobalState from "state/GlobalState";
import ApiService from "utils/api_service/api_service";
import { AxiosResponse } from "axios";

// const parseItems = (item: RequestItemResponse): GenericTableRow => {
//   return {
//     icon:  <MilitaryTechIcon />,
//     name: item.
//   }
// }

const useSoldierMyRequests = () => {
  const [data, setData] = useState<GenericTableRow[]>([]);

  const fetch = async () => {
    const { data } = await ApiService.get("/api/requestgroup", { borrower_id: GlobalState.user!.id.toString() });
    const requestGroupsPromises = data.map((requestGroup) =>
      ApiService.unsafeGet<RequestGroupResponse>(`/api/requestgroup/${requestGroup.id}`),
    ) as Promise<AxiosResponse<RequestGroupResponse>>[];
    const requestGroups = await Promise.all(requestGroupsPromises);
    const requestItems = requestGroups.flatMap((requestGroup) => requestGroup.data.request_items);
    // return parseItems(requestItems)

    console.log("🚀 ~ fetch ~ requestItems", requestItems);

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
