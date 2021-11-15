import { User } from "interfaces/User";
export interface RandomCatFactResponse {
  fact: string;
  length: number;
}

interface LoginEndpointData {
  email: string;
  password: string;
}

interface LoginEndpointResponse {
  //onSuccess:
  user?: User;
  access_token?: string;

  //onError:
  message?: string;
}

export interface ItemTypesResponse {
  id: number;
  name: string;
  price: string;
  category_id: string;
  desired_amount: string;
  created_at: string;
  updated_at: string;
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

export type Endpoint =
  | {
      method: "GET";
      url: "https://catfact.ninja/fact";
      response: RandomCatFactResponse;
    }
  | {
      method: "GET";
      url: "/api/itemtypes";
      response: ItemTypesResponse[];
    }
  | {
      method: "POST";
      url: "/api/login";
      data: LoginEndpointData;
      response: LoginEndpointResponse;
    };
