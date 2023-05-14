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
          Cookie: `__stripe_mid=7ceabc7d-c82a-40bf-8533-efcb88d60989cd6aac; csrftoken=2IvoH9mr4rvC4Idy4gKdHdd8sB8xkOEDYKnoEg3pgs91VbQjoPvhMNGiYdNgos8D; NEW_PROBLEMLIST_PAGE=1; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiNDkwNTE4NyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjQxYzQ1MTFlMWM4NjI0ZDg1NTJhNWI2ZDlmMjdjOGFlN2NmMTkwNTEiLCJpZCI6NDkwNTE4NywiZW1haWwiOiJuZ3V5ZW5oYWlkdWMwNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImhhaWR1YzA2IiwidXNlcl9zbHVnIjoiaGFpZHVjMDYiLCJhdmF0YXIiOiJodHRwczovL3MzLXVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3MzLWxjLXVwbG9hZC9hc3NldHMvZGVmYXVsdF9hdmF0YXIuanBnIiwicmVmcmVzaGVkX2F0IjoxNjgzODYzNzkxLCJpcCI6IjE0LjE4OS4xMjIuMjI0IiwiaWRlbnRpdHkiOiJmOTBmY2NiYTk5NTY1NzgwYjEwMGZiOGU5ZTE0MDZjZSIsInNlc3Npb25faWQiOjM5MzMyNzU0LCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.HGIB119oOIi1YMdEBcwsErxBXYZEsg1mRM0avScbPUc; _dd_s=rum=0&expire=1683908640897`,
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
