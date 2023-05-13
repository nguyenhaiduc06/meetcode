import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  QueryOptions,
} from "@apollo/client";
import { endpoint, session, csrfToken } from "./config";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

var _graphqlClient: ApolloClient<NormalizedCacheObject>;
var _httpClient: AxiosInstance;

class Service {
  session: string;
  csrfToken: string;

  constructor(session, csrfToken) {
    this.session = session;
    this.csrfToken = csrfToken;
  }

  GraphQLQuery(options: QueryOptions) {
    if (!_graphqlClient) {
      _graphqlClient = new ApolloClient({
        uri: endpoint.graphql,
        headers: {
          Origin: endpoint.base,
          Referer: endpoint.base,
          Cookie: `LEETCODE_SESSION=${this.session};csrftoken=${this.csrfToken}`,
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRFToken": this.csrfToken,
        },
        cache: new InMemoryCache(),
      });
    }

    return _graphqlClient.query(options);
  }

  HTTPRequest(config: AxiosRequestConfig) {
    if (!_httpClient) {
      _httpClient = axios.create({
        baseURL: endpoint.base,
        headers: {
          Cookie: `LEETCODE_SESSION=${this.session};csrftoken=${this.csrfToken}`,
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRFToken": this.csrfToken,
          Referer: endpoint.base,
        },
      });
    }

    return _httpClient.request(config);
  }
}

const service = new Service(session, csrfToken);

export default service;
