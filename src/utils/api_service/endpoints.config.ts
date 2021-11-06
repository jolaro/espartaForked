export interface RandomCatFactResponse {
  fact: string;
  length: number;
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
  // | {
  //     method: "POST";
  //     url: "/api/example";
  //     response: ExampleEndpointResult;
  //     data: ExampleEndpointData;
  //   }
  // | {
  //     method: "GET";
  //     url: "/api/example/2";
  //     response: ExampleEndpoint2Result;
  //   }
  {
    method: "GET";
    url: "https://catfact.ninja/fact";
    response: RandomCatFactResponse;
  };
