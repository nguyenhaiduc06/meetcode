import axios from "axios";
import {
  QUERY_QUESTION_LIST,
  QUERY_QUESTION_DESCRIPTION,
  QUERY_QUESTION_CODE_EDITOR,
} from "./queries";
import service from "./service";
import { GetQuestionsOptions } from "./types";

class LeetCode {
  async getQuestionOfToday() {}
  async getQuestions(options?: GetQuestionsOptions) {
    const {
      categorySlug = "",
      skip = 0,
      limit = 50,
      filters = {},
    } = options ?? {};
    const res = await service.GraphQLQuery({
      query: QUERY_QUESTION_LIST,
      variables: {
        categorySlug,
        skip,
        limit,
        filters,
      },
    });
    return res.data.questionList.questions;
  }

  async getQuestionDetail(titleSlug) {
    const res = await service.GraphQLQuery({
      query: QUERY_QUESTION_DESCRIPTION,
      variables: {
        titleSlug,
      },
    });
    return res.data.question;
  }

  async getQuestionCodeEditorDetail(titleSlug) {
    const res = await service.GraphQLQuery({
      query: QUERY_QUESTION_CODE_EDITOR,
      variables: {
        titleSlug,
      },
    });
    return res.data.question;
  }

  async submitCode({ slug, lang, question_id, typed_code }) {
    const res = await axios.request({
      url: `problems/${slug}/submit/`,
      method: "post",
      data: {
        lang,
        question_id,
        typed_code,
      },
    });
    console.log("🚀 ~ res:", res.data);
  }
}

export const leetCode = new LeetCode();
