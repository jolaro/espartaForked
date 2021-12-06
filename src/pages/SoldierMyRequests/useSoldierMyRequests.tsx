import { GenericTableRow } from "components/molecules/GenericTable";
import { useState } from "react";
import { RequestGroupResponse } from "../../utils/api_service/endpoints.config";
import { usePromise } from "hooks/usePromise";
import GlobalState from "state/GlobalState";
import ApiService from "utils/api_service/api_service";
import { AxiosResponse } from "axios";
import StatusChip from "components/atoms/StatusChip";

const useSoldierMyRequests = (): [GenericTableRow[], boolean] => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GenericTableRow[]>([]);

  const fetch = async () => {
    setIsLoading(true);
    const { data } = await ApiService.get("/api/requestgroup", { borrower_id: GlobalState.user!.id.toString() });

    const requestGroupsPromises = data.map((requestGroup) =>
      ApiService.unsafeGet<RequestGroupResponse>(`/api/requestgroup/${requestGroup.id}`),
    ) as Promise<AxiosResponse<RequestGroupResponse>>[];

    const requestGroups = await Promise.all(requestGroupsPromises);
    const requestItems = requestGroups.map(({ data: requestGroup }) => {
      return {
        id: requestGroup.id,
        // TODO: Show in better form, maybe using <Chip />
        items: requestGroup.request_items.map((item) => item.item_type.name).join(", "),
        status: <StatusChip requestGroup={requestGroup} />,
      };
    });

    return requestItems;
  };

  usePromise(async (safeUpdate) => {
    const _data = await fetch();
    safeUpdate(() => {
      setData(_data);
      setIsLoading(false);
    });
  }, []);

  return [data, isLoading];
};

export default useSoldierMyRequests;
