import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

class LeetCode {
  session: string =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiNDkwNTE4NyIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjQxYzQ1MTFlMWM4NjI0ZDg1NTJhNWI2ZDlmMjdjOGFlN2NmMTkwNTEiLCJpZCI6NDkwNTE4NywiZW1haWwiOiJuZ3V5ZW5oYWlkdWMwNkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImhhaWR1YzA2IiwidXNlcl9zbHVnIjoiaGFpZHVjMDYiLCJhdmF0YXIiOiJodHRwczovL3MzLXVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3MzLWxjLXVwbG9hZC9hc3NldHMvZGVmYXVsdF9hdmF0YXIuanBnIiwicmVmcmVzaGVkX2F0IjoxNjgzODYzNzkxLCJpcCI6IjExMy4xODEuMzUuODYiLCJpZGVudGl0eSI6ImY5MGZjY2JhOTk1NjU3ODBiMTAwZmI4ZTllMTQwNmNlIiwic2Vzc2lvbl9pZCI6MzkzMzI3NTQsIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.VDBYjXsaVgYWMBvojoKVm61WKEaBxWhoBuEFzfpF7Tw";
  csrfToken: string =
    "2IvoH9mr4rvC4Idy4gKdHdd8sB8xkOEDYKnoEg3pgs91VbQjoPvhMNGiYdNgos8D";

  async getProblems() {
    const client = new ApolloClient({
      uri: "https://leetcode.com/graphql",
      headers: {
        Origin: "https://leetcode.com/",
        Referer: "https://leetcode.com/",
        Cookie: `LEETCODE_SESSION=${this.session};csrftoken=${this.csrfToken}`,
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": this.csrfToken,
      },
      cache: new InMemoryCache(),
    });

    const query = gql`
      query problemsetQuestionList(
        $categorySlug: String
        $limit: Int
        $skip: Int
        $filters: QuestionListFilterInput
      ) {
        problemsetQuestionList: questionList(
          categorySlug: $categorySlug
          limit: $limit
          skip: $skip
          filters: $filters
        ) {
          total: totalNum
          questions: data {
            questionId
            acRate
            difficulty
            freqBar
            likes
            dislikes
            frontendQuestionId: questionFrontendId
            isFavor
            paidOnly: isPaidOnly
            status
            title
            titleSlug
            topicTags {
              name
              id
              slug
            }
            hasSolution
            hasVideoSolution
          }
        }
      }
    `;

    const res = await client.query({
      query,
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
    const client = new ApolloClient({
      uri: "https://leetcode.com/graphql",
      headers: {
        Origin: "https://leetcode.com/",
        Referer: "https://leetcode.com/",
        Cookie: `LEETCODE_SESSION=${this.session};csrftoken=${this.csrfToken}`,
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRFToken": this.csrfToken,
      },
      cache: new InMemoryCache(),
    });

    const query = gql`
      query getQuestionDetail($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
          questionId
          title
          difficulty
          likes
          dislikes
          isLiked
          isPaidOnly
          stats
          status
          content
          topicTags {
            name
          }
          codeSnippets {
            lang
            langSlug
            code
          }
          sampleTestCase
        }
      }
    `;

    const res = await client.query({
      query,
      variables: {
        titleSlug: slug,
      },
    });
    return res.data.question;
  }
}

export const leetCode = new LeetCode();
