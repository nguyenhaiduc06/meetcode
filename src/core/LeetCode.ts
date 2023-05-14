import {
  QUERY_QUESTION_LIST,
  QUERY_QUESTION_DESCRIPTION,
  QUERY_QUESTION_CODE_EDITOR,
  QUERY_STUDY_PLANS,
  QUERY_DAILY_CODING_QUESTION_RECORDS,
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

  async getQuestionCodeEditor(titleSlug) {
    const res = await service.GraphQLQuery({
      query: QUERY_QUESTION_CODE_EDITOR,
      variables: {
        titleSlug,
      },
    });
    return res.data.question;
  }

  async getCodeInterpretResult({
    titleSlug,
    data_input,
    lang,
    question_id,
    typed_code,
  }) {
    const res = await service.HTTPRequest({
      url: `problems/${titleSlug}/interpret_solution/`,
      method: "POST",
      data: {
        data_input,
        lang,
        question_id,
        typed_code,
      },
    });

    const { interpret_id } = res.data;

    return new Promise((resolve, reject) => {
      const MAX_CHECK_COUNT = 10;
      let checkCount = 0;

      const checkInterval = setInterval(async () => {
        const res = await service.HTTPRequest({
          url: `/submissions/detail/${interpret_id}/check/`,
          method: "POST",
          data: {
            data_input,
            lang,
            question_id,
            typed_code,
          },
        });
        checkCount += 1;
        const { state } = res.data;
        if (state != "PENDING" && state != "STARTED") {
          clearInterval(checkInterval);
          resolve(res.data);
        }
        if (checkCount >= MAX_CHECK_COUNT) {
          reject("Max check count reached");
        }
      }, 300);
    });
  }

  async submitCode({ titleSlug, lang, question_id, typed_code }) {
    const res = await service.HTTPRequest({
      url: `problems/${titleSlug}/submit/`,
      method: "POST",
      data: {
        lang,
        question_id,
        typed_code,
      },
    });
    console.log("🚀 ~ res:", res.data);
  }

  async getStudyPlans() {
    const res = await service.GraphQLQuery({
      query: QUERY_STUDY_PLANS,
    });
    return res.data.studyPlansV2AdQuestionPage;
  }

  async getDailyCodingQuestionRecords() {
    const res = await service.GraphQLQuery({
      query: QUERY_DAILY_CODING_QUESTION_RECORDS,
      variables: {
        year: 2023,
        month: 5,
      },
    });
    return res.data.dailyCodingChallengeV2.challenges;
  }
}

export const leetCode = new LeetCode();
