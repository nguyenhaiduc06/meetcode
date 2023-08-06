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
  cookie: string;

  constructor(session, csrfToken) {
    this.session = session;
    this.csrfToken = csrfToken;
    this.cookie = `__stripe_mid=4961e205-7bac-4fd7-95de-21bf4fad2ad97161fb; csrftoken=Rm92dEBADq5QtsBGPHufMMkoU1OtQSwen7WKk2mUpFMrKiVUf1720fd4NevOTCIX; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiNDkwNTE4NyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjQxYzQ1MTFlMWM4NjI0ZDg1NTJhNWI2ZDlmMjdjOGFlN2NmMTkwNTEiLCJpZCI6NDkwNTE4NywiZW1haWwiOiJuZ3V5ZW5oYWlkdWMwNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImhhaWR1YzA2IiwidXNlcl9zbHVnIjoiaGFpZHVjMDYiLCJhdmF0YXIiOiJodHRwczovL3MzLXVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3MzLWxjLXVwbG9hZC9hc3NldHMvZGVmYXVsdF9hdmF0YXIuanBnIiwicmVmcmVzaGVkX2F0IjoxNjkxMTI3MDEwLCJpcCI6IjExMy4xNjguMjUxLjEzNSIsImlkZW50aXR5IjoiM2I4ZDM5OWI1NmZiOWRmNTU5MmIwNTFmZGUzNmM5MDMiLCJzZXNzaW9uX2lkIjo0MzcxNDExMiwiX3Nlc3Npb25fZXhwaXJ5IjoxMjA5NjAwfQ.aXmTS9NydbdEy3_VGg1dhd-JBu-S2KBp1YkNsvZDGSM; NEW_PROBLEMLIST_PAGE=1; _dd_s=rum=0&expire=1691129601904`;
  }

  GraphQLQuery(options: QueryOptions) {
    if (!_graphqlClient) {
      _graphqlClient = new ApolloClient({
        uri: endpoint.graphql,
        headers: {
          Origin: endpoint.base,
          Referer: endpoint.base,
          Cookie: this.cookie,
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
          Cookie: this.cookie,
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
