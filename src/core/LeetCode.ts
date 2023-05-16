import { STUDY_PLANS } from "./data";
import {
  QUERY_QUESTION_LIST,
  QUERY_QUESTION_CODE_EDITOR,
  QUERY_STUDY_PLANS,
  QUERY_DAILY_CHALLENGE_RECORDS,
  QUERY_DAILY_CHALLENGE_MEDAL,
  QUERY_QUESTION_CONTENT,
  QUERY_QUESTION_DESCRIPTION,
} from "./queries";
import service from "./service";
import {
  CodeEditorData,
  CodeInterpretResult,
  CodeSubmitResult,
  GetDailyChallengeRecordsOptions,
  GetQuestionsOptions,
  QuestionDescriptionData,
  QuestionMetadata,
} from "./types";

class LeetCode {
  async getQuestionOfToday() {}
  async getQuestions(
    options?: GetQuestionsOptions
  ): Promise<QuestionMetadata[]> {
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

  async getQuestionDescription(titleSlug): Promise<QuestionDescriptionData> {
    const res = await service.GraphQLQuery({
      query: QUERY_QUESTION_DESCRIPTION,
      variables: {
        titleSlug,
      },
    });
    return res.data.question;
  }

  async getQuestionContent(titleSlug) {
    const res = await service.GraphQLQuery({
      query: QUERY_QUESTION_CONTENT,
      variables: {
        titleSlug,
      },
    });
    return res.data.question.content;
  }

  async getQuestionCodeEditor(titleSlug): Promise<CodeEditorData> {
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
  }): Promise<CodeInterpretResult> {
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

  async getCodeSubmitResult({
    titleSlug,
    lang,
    question_id,
    typed_code,
  }): Promise<CodeSubmitResult> {
    const res = await service.HTTPRequest({
      url: `problems/${titleSlug}/submit/`,
      method: "POST",
      data: {
        lang,
        question_id,
        typed_code,
      },
    });
    const { submission_id } = res.data;
    return new Promise((resolve, reject) => {
      const MAX_CHECK_COUNT = 10;
      let checkCount = 0;

      const checkInterval = setInterval(async () => {
        const res = await service.HTTPRequest({
          url: `/submissions/detail/${submission_id}/check/`,
          method: "GET",
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

  async getStudyPlans() {
    return STUDY_PLANS;
    const res = await service.GraphQLQuery({
      query: QUERY_STUDY_PLANS,
    });
    return res.data.studyPlansV2AdQuestionPage;
  }

  async getDailyChallengeRecords(options?: GetDailyChallengeRecordsOptions) {
    const today = new Date();
    const { year = today.getFullYear(), month = today.getMonth() + 1 } =
      options ?? {};
    const res = await service.GraphQLQuery({
      query: QUERY_DAILY_CHALLENGE_RECORDS,
      variables: {
        year,
        month,
      },
    });
    return res.data.dailyCodingChallengeV2.challenges;
  }

  async getDailyChallengeMedal(options?) {
    const today = new Date();
    const { year = today.getFullYear(), month = today.getMonth() + 1 } =
      options ?? {};
    const res = await service.GraphQLQuery({
      query: QUERY_DAILY_CHALLENGE_MEDAL,
      variables: {
        year,
        month,
      },
    });
    return res.data.dailyChallengeMedal;
  }
}

export const leetCode = new LeetCode();
