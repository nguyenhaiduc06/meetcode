import axios from "axios";
import { getQuestionDetail, problemsetQuestionList } from "./queries";
import service from "./service";
import { session, csrfToken, endpoint } from "./config";
import { problem, problems } from "../mock";

class LeetCode {
  async getProblems() {
    return problems;
    const res = await service.GraphQLQuery({
      query: problemsetQuestionList,
      variables: {
        categorySlug: "",
        skip: 0,
        limit: 50,
        filters: {},
      },
    });
    return res.data.problemsetQuestionList.questions;
  }

  async getProblemDetail(slug) {
    return problem;
    const res = await service.GraphQLQuery({
      query: getQuestionDetail,
      variables: {
        titleSlug: slug,
        langSlug: "python",
      },
    });
    return res.data.question;
  }

  async submit({ slug, lang, question_id, typed_code }) {
    const res = await axios.post(
      `https://leetcode.com/problems/${slug}/submit/`,
      {
        lang,
        question_id,
        typed_code,
      },
      {
        headers: {
          cookie: `__stripe_mid=7ceabc7d-c82a-40bf-8533-efcb88d60989cd6aac; csrftoken=2IvoH9mr4rvC4Idy4gKdHdd8sB8xkOEDYKnoEg3pgs91VbQjoPvhMNGiYdNgos8D; NEW_PROBLEMLIST_PAGE=1; LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiNDkwNTE4NyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjQxYzQ1MTFlMWM4NjI0ZDg1NTJhNWI2ZDlmMjdjOGFlN2NmMTkwNTEiLCJpZCI6NDkwNTE4NywiZW1haWwiOiJuZ3V5ZW5oYWlkdWMwNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImhhaWR1YzA2IiwidXNlcl9zbHVnIjoiaGFpZHVjMDYiLCJhdmF0YXIiOiJodHRwczovL3MzLXVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3MzLWxjLXVwbG9hZC9hc3NldHMvZGVmYXVsdF9hdmF0YXIuanBnIiwicmVmcmVzaGVkX2F0IjoxNjgzODYzNzkxLCJpcCI6IjE0LjE4OS4xMjIuMjI0IiwiaWRlbnRpdHkiOiJmOTBmY2NiYTk5NTY1NzgwYjEwMGZiOGU5ZTE0MDZjZSIsInNlc3Npb25faWQiOjM5MzMyNzU0LCJfc2Vzc2lvbl9leHBpcnkiOjEyMDk2MDB9.HGIB119oOIi1YMdEBcwsErxBXYZEsg1mRM0avScbPUc; _dd_s=rum=0&expire=1683908640897`,
          "X-Requested-With": "XMLHttpRequest",
          "X-CSRFToken": csrfToken,
          referer: endpoint.base,
          origin: endpoint.base,
        },
      }
    );
    console.log("🚀 ~ res:", res.data);
  }
}

export const leetCode = new LeetCode();
