// --- Options for LeetCode methods ---

export type GetQuestionsOptions = {
  categorySlug?: string;
  skip?: number;
  limit?: 50;
  filters?: QuestionListFilterInput;
};

export type QuestionListFilterInput = {
  difficulty?: QuestionDifficultyFilter;
  tags?: any[];
  searchKeywords?: string;
  status?: QuestionStatusFilter;
};

export type QuestionDifficultyFilter = "EASY" | "MEDIUM" | "HARD";

export type QuestionStatusFilter = "NOT_STARTED" | "AC" | "TRIED";

// --- End Options for LeetCode methods ---

// --- Question ---

export type QuestionDifficulty = "EASY" | "MEDIUM" | "HARD";

export type QuestionStatus = "ac" | "notac" | null;

export type QuestionTopicTag = {
  name: string;
  slug: string;
};

export type QuestionMetadata = {
  questionId: string;
  acRate: number;
  difficulty: QuestionDifficulty;
  likes: number;
  dislikes: number;
  frontendQuestionId: string;
  isLiked: boolean;
  isFavor: boolean;
  isPaidOnly: boolean;
  status: QuestionStatus;
  title: string;
  titleSlug: string;
  topicTags: QuestionTopicTag[];
  stats: string;
};

export type QuestionDescriptionData = {
  questionId: string;
  content: string;
  hints: string[];
};

// --- End Question ---

// --- Code editor ---

export type CodeSnippet = {
  lang: string;
  langSlug: string;
  code: string;
};

export type CodeEditorData = {
  questionId: string;
  codeSnippets: CodeSnippet[];
  enableDebugger: boolean;
  enableRunCode: boolean;
  enableSubmit: boolean;
  enableTestMode: boolean;
  exampleTestcaseList: string[];
  metaData: any;
};

export type CodeInterpretResult = {
  status_code: number;
  lang: string;
  run_success: true;
  status_runtime: string;
  memory: number;
  code_answer: any[];
  code_output: any[];
  std_output_list: any[];
  std_output: any[];
  elapsed_time: number;
  task_finish_time: number;
  task_name: string;
  expected_status_code: number;
  expected_lang: string;
  expected_run_success: boolean;
  expected_status_runtime: string;
  expected_memory: number;
  expected_code_answer: any[];
  expected_code_output: any;
  expected_std_output_list: any[];
  expected_std_output: any[];
  expected_elapsed_time: number;
  expected_task_finish_time: number;
  expected_task_name: string;
  correct_answer: boolean;
  compare_result: string;
  total_correct: number;
  total_testcases: number;
  runtime_percentile: any;
  status_memory: string;
  memory_percentile: any;
  pretty_lang: string;
  submission_id: string;
  status_msg: string;
  state: string;
};

export type CodeSubmitResult = {
  question_id: string;
  lang: string;
  pretty_lang: string;
  state: string;
  submission_id: string;
  status_msg: string;
  status_code: number;
  status_runtime: string;
  runtime_percentile: number;
  status_memory: string;
  memory_percentile: number;

  total_correct: number;
  total_testcases: number;
  compare_result: string;

  run_success: boolean;
  memory: number;
  elapsed_time: number;
  code_output: string;
  std_output: string;
  last_testcase: string;
  expected_output: string;
  task_finish_time: number;
  task_name: string;
  finished: boolean;
  full_runtime_error: string;
};

// --- End Code editor ---

// --- Daily Challenge Records ---

export type DailyChallengeRecord = {
  date: string;
  link: string;
  question: {};
  userStatus: DailyChallengeRecordStatus;
};

export type DailyChallengeRecordStatus = "NotStart" | "Finish";

export type GetDailyChallengeRecordsOptions = {
  year: number;
  month: number;
};

// --- End Daily Challenge Records ---

// --- Profile ---

export type UserProfile = {
  username: string;
  githubUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  profile: {
    ranking: number;
    userAvatar: string;
    realName: string;
    aboutMe: string;
    school: string;
    websites: string;
    countryName: string;
    company: string;
    jobTitle: string;
    skillTags: string[];
    postViewCount: number;
    postViewCountDiff: number;
    reputation: number;
    reputationDiff: number;
    solutionCount: number;
    solutionCountDiff: number;
    categoryDiscussCount: number;
    categoryDiscussCountDiff: number;
  };
};
export type ProblemsSolved = {
  all: {
    solvedCount: number;
    totalCount: number;
  };
  easy: {
    solvedCount: number;
    totalCount: number;
  };
  medium: {
    solvedCount: number;
    totalCount: number;
  };
  hard: {
    solvedCount: number;
    totalCount: number;
  };
};
// --- End Profile
