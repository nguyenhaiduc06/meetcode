import { getQuestionDetail, problemsetQuestionList } from "./queries";
import service from "./service";

class LeetCode {
  async getProblems() {
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
    const res = await service.GraphQLQuery({
      query: getQuestionDetail,
      variables: {
        titleSlug: slug,
      },
    });
    return res.data.question;
  }
}

export const leetCode = new LeetCode();
