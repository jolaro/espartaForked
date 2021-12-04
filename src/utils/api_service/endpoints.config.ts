import { User } from "interfaces/User";
import { number } from "prop-types";
export interface RandomCatFactResponse {
  fact: string;
  length: number;
}

interface LoginEndpointData {
  email: string;
  password: string;
}

interface RequestGroupEndpointData {
  borrower_id: number;
  manager_id?: number;
}

export interface RequestGroupResponse {
  borrower_id: string;
  manager_id: string;
  updated_at: string;
  created_at: string;
  id: string;
}

interface LoginEndpointResponse {
  //onSuccess:
  user?: User;
  access_token?: string;

  //onError:
  message?: string;
}

export interface RequestItemData {
  item_id: number;
  request_group_id: number;
  approved: number;
  item_type_id?: number;
  date_due?: string;
  date_borrowed?: string;
  date_returned?: string;
}

export interface RequestItemResponse {
  item_id: number;
  item_type_id: number;
  request_group_id: number;
  approved: number;
  date_due: string;
  date_borrowed: string;
  date_returned: string;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface ItemTypesResponse {
  id: number;
  name: string;
  price: string;
  category_id: string;
  category: string;
  desired_amount: string;
  created_at: string;
  updated_at: string;
}

export interface ItemResponse {
  id: number;
  item_type_id: string;
  item_type: ItemTypesResponse;
  serial: string;
  created_at: string;
  updated_at: string;
}

export interface RequestGroupQueryParams {
  loanee_id?: number;
  lender_id?: number;
}

/**
 * ! EXAMPLE POST/PUT CONFIG ENTRY
 * post config has to has the following:
 *
 * method: "POST" | "PUT"
 * url: <url of the endpoint>
 * response: <interface of the responseObject>
 * data: <interface of the data sent to the API object>
 *
 */

/**
 * ! EXAMPLE GET CONFIG ENTRY
 *
 * method: "GET"
 * url: <url of the endpoint>
 * response: <interface of the responseObject>
 *
 */

export type GetEndpoint =
  | {
      method: "GET";
      url: "https://catfact.ninja/fact";
      queryParams: undefined;
      response: RandomCatFactResponse;
    }
  | {
      method: "GET";
      url: "/api/itemtypes";
      queryParams: undefined;
      response: ItemTypesResponse[];
    }
  | {
      method: "GET";
      url: "/api/items";
      queryParams: undefined;
      response: ItemResponse[];
    }
  | {
      method: "GET";
      url: "/api/users";
      queryParams: undefined;
      response: User[];
    }
  | {
      method: "GET";
      url: "/api/requestgroup";
      queryParams: RequestGroupQueryParams;
      response: RequestGroupResponse | RequestGroupResponse[];
    };

export type PostEndpoint =
  | {
      method: "POST";
      url: "/api/login";
      data: LoginEndpointData;
      response: LoginEndpointResponse;
    }
  | {
      method: "POST";
      url: "/api/requestgroup";
      data: RequestGroupEndpointData;
      response: RequestGroupResponse;
    }
  | {
      method: "POST";
      url: "/api/requestitem";
      data: RequestItemData[];
      response: RequestItemResponse;
    };
