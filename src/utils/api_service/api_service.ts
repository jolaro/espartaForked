import axios, { AxiosResponse } from "axios";
import GlobalState from "state/GlobalState";
import { Endpoint } from "./endpoints.config";

type ExtractResponse<U> = Extract<Endpoint, { url: U }>["response"];
type GetMethod = Extract<Endpoint, { method: "GET" }>;
type PostMethod = Extract<Endpoint, { method: "POST" }>;

const unsafeGet = async <T = any>(url: string) => {
  return axios.get<T, any>(process.env.API_URL + url, {
    headers: {
      Authentication: `Bearer ${GlobalState.authToken.get()}`,
    },
  });
};

const get = async <U extends GetMethod["url"]>(url: U): Promise<AxiosResponse<ExtractResponse<U>, any>> => {
  return axios.get<ExtractResponse<U>, any>(process.env.API_URL + url, {
    headers: {
      Authentication: `Bearer ${GlobalState.authToken.get()}`,
    },
  });
};

const unsafePost = async <T, U>(url: string, data: U) => {
  return axios.post<T, any>(process.env.API_URL + url, data, {
    headers: {
      Authentication: `Bearer ${GlobalState.authToken.get()}`,
    },
  });
};

const post = async <U extends PostMethod["url"], K extends PostMethod["data"]>(
  url: U,
  data: K,
): Promise<AxiosResponse<ExtractResponse<U>, any>> => {
  return axios.post<ExtractResponse<U>, any>(process.env.API_URL + url, data, {
    headers: {
      Authentication: `Bearer ${GlobalState.authToken.get()}`,
    },
  });
};

const ApiService = {
  unsafeGet,
  unsafePost,
  get,
  post,
};

export default ApiService;
