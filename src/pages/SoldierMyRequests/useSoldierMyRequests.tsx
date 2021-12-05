import CategoryChip from "components/atoms/CategoryChip";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { GenericTableRow } from "components/molecules/GenericTable";
import { useState } from "react";
import { ItemTypeResponse, RequestGroupResponse } from "../../utils/api_service/endpoints.config";
import { usePromise } from "hooks/usePromise";
import GlobalState from "state/GlobalState";
import ApiService from "utils/api_service/api_service";
import { AxiosResponse } from "axios";
import StatusChip from "components/atoms/StatusChip";

const parseItem = (item: ItemTypeResponse): GenericTableRow => {
  return {
    icon: <MilitaryTechIcon />,
    name: item.name,
    category: <CategoryChip categoryId={item.weight_category} />,
    status: <StatusChip item={item} />,
  };
};

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
    const requestItems = requestGroups
      .flatMap((requestGroup) => requestGroup.data.request_items)
      .map((requestItem) => parseItem(requestItem.item_type));

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
