import { gql } from "@apollo/client";

export const QUERY_QUESTION_LIST = gql`
  query questionList(
    $categorySlug: String
    $limit: Int
    $skip: Int
    $filters: QuestionListFilterInput
  ) {
    questionList(
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
        likes
        dislikes
        questionFrontendId
        isPaidOnly
        status
        title
        titleSlug
        topicTags {
          name
          id
          slug
        }
      }
    }
  }
`;

export const QUERY_QUESTION_DESCRIPTION = gql`
  query questionDetail($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      content
      hints
    }
  }
`;

export const QUERY_QUESTION_CONTENT = gql`
  query questionDetail($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      content
    }
  }
`;

export const QUERY_QUESTION_CODE_EDITOR = gql`
  query questionCodeEditorDetail($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      codeSnippets {
        lang
        langSlug
        code
      }
      enableDebugger
      enableRunCode
      enableSubmit
      enableTestMode
      exampleTestcaseList
      sampleTestCase
      metaData
    }
  }
`;

export const QUERY_QUESTION_OF_TODAY = gql`
  query questionOfToday {
    activeDailyCodingChallengeQuestion {
      date
      userStatus
      link
      question {
        acRate
        difficulty
        freqBar
        frontendQuestionId: questionFrontendId
        isFavor
        paidOnly: isPaidOnly
        status
        title
        titleSlug
        hasVideoSolution
        hasSolution
        topicTags {
          name
          id
          slug
        }
      }
    }
  }
`;

export const dailyCodingQuestionRecords = gql`
  query dailyCodingQuestionRecords($year: Int!, $month: Int!) {
    dailyCodingChallengeV2(year: $year, month: $month) {
      challenges {
        date
        userStatus
        link
        question {
          questionFrontendId
          title
          titleSlug
        }
      }
      weeklyChallenges {
        date
        userStatus
        link
        question {
          questionFrontendId
          title
          titleSlug
        }
      }
    }
  }
`;

export const GetProblemSetStudyPlanAds = gql`
  query GetProblemSetStudyPlanAds {
    studyPlansV2AdQuestionPage {
      cover
      highlight
      name
      onGoing
      premiumOnly
      questionNum
      slug
    }
  }
`;

export const QUERY_STUDY_PLANS = gql`
  query GetProblemSetStudyPlanAds {
    studyPlansV2AdQuestionPage {
      cover
      highlight
      name
      onGoing
      premiumOnly
      questionNum
      slug
    }
  }
`;

export const QUERY_DAILY_CHALLENGE_RECORDS = gql`
  query dailyChallengeRecords($year: Int!, $month: Int!) {
    dailyCodingChallengeV2(year: $year, month: $month) {
      challenges {
        date
        userStatus
        link
        question {
          questionId
          acRate
          difficulty
          likes
          dislikes
          questionFrontendId
          isPaidOnly
          status
          title
          titleSlug
          topicTags {
            name
            id
            slug
          }
        }
      }
    }
  }
`;

export const QUERY_DAILY_CHALLENGE_MEDAL = gql`
  query codingChallengeMedal($year: Int!, $month: Int!) {
    dailyChallengeMedal(year: $year, month: $month) {
      name
      config {
        icon
      }
    }
  }
`;

export const QUERY_USER_PUBLIC_PROFILE = gql`
  query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
      contestBadge {
        name
        expired
        hoverText
        icon
      }
      username
      githubUrl
      twitterUrl
      linkedinUrl
      profile {
        ranking
        userAvatar
        realName
        aboutMe
        school
        websites
        countryName
        company
        jobTitle
        skillTags
        postViewCount
        postViewCountDiff
        reputation
        reputationDiff
        solutionCount
        solutionCountDiff
        categoryDiscussCount
        categoryDiscussCountDiff
      }
    }
  }
`;

export const QUERY_USER_PROBLEMS_SOLVED = gql`
  query userProblemsSolved($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      problemsSolvedBeatsStats {
        difficulty
        percentage
      }
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

export const QUERY_USER_LANGUAGE_STATS = gql`
  query languageStats($username: String!) {
    matchedUser(username: $username) {
      languageProblemCount {
        languageName
        problemsSolved
      }
    }
  }
`;

export const QUERY_USER_SKILL_STATS = gql`
  query skillStats($username: String!) {
    matchedUser(username: $username) {
      tagProblemCounts {
        advanced {
          tagName
          tagSlug
          problemsSolved
        }
        intermediate {
          tagName
          tagSlug
          problemsSolved
        }
        fundamental {
          tagName
          tagSlug
          problemsSolved
        }
      }
    }
  }
`;
