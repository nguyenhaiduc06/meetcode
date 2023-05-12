import { gql } from "@apollo/client";

export const problemsetQuestionList = gql`
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

export const getQuestionDetail = gql`
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
