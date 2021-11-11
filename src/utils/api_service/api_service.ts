import axios, { AxiosResponse } from "axios";
import GlobalState from "state/GlobalState";
import { Endpoint } from "./endpoints.config";

type ExtractResponse<U> = Extract<Endpoint, { url: U }>["response"];
type GetMethod = Extract<Endpoint, { method: "GET" }>;
type PostMethod = Extract<Endpoint, { method: "POST" }>;

const getToken = () => {
  return GlobalState.authToken;
};

const getUrl = (url: string) => {
  return process.env.REACT_APP_API_URL + url;
};

const unsafeGet = async <T = any>(url: string) => {
  return axios.get<T, any>(getUrl(url), {
    headers: {
      Authentication: `Bearer ${getToken()}`,
    },
  });
};

const get = async <U extends GetMethod["url"]>(url: U): Promise<AxiosResponse<ExtractResponse<U>, any>> => {
  return axios.get<ExtractResponse<U>, any>(getUrl(url), {
    headers: {
      Authentication: `Bearer ${getToken()}`,
    },
  });
};

const unsafePost = async <T, U>(url: string, data: U) => {
  return axios.post<T, any>(getUrl(url), data, {
    headers: {
      Authentication: `Bearer ${getToken()}`,
    },
  });
};

const post = async <U extends PostMethod["url"], K extends PostMethod["data"]>(
  url: U,
  data: K,
): Promise<AxiosResponse<ExtractResponse<U>, any>> => {
  return axios.post<ExtractResponse<U>, any>(getUrl(url), data, {
    headers: {
      Authentication: `Bearer ${getToken()}`,
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
