export type GetQuestionsOptions = {
  categorySlug?: string;
  skip?: number;
  limit?: 50;
  filters?: QuestionListFilterInput;
};
export type QuestionListFilterInput = {
  difficulty?: Difficulty;
  tags?: any[];
  searchKeywords?: string;
  status?: Status;
};

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export type Status = "AC" | "TRIED" | "NOT_STARTED";

export type TopicTag = {
  name: string;
  slug: string;
};

export type Question = {
  questionId: string;
  acRate: number;
  difficulty: Difficulty;
  freqBar: any;
  likes: number;
  dislikes: number;
  frontendQuestionId: string;
  isLiked: boolean;
  isFavor: boolean;
  isPaidOnly: boolean;
  status: string;
  title: string;
  titleSlug: string;
  topicTags: TopicTag[];
  hasSolution: boolean;
  hasVideoSolution: boolean;
  stats: string;
  content: string;
};

export type QuestionDescriptionData = {
  questionId: string;
  acRate: number;
  difficulty: Difficulty;
  freqBar: any;
  likes: number;
  dislikes: number;
  frontendQuestionId: string;
  isLiked: boolean;
  isFavor: boolean;
  isPaidOnly: boolean;
  status: "ac" | "notac" | null;
  title: string;
  titleSlug: string;
  topicTags: TopicTag[];
  hasSolution: boolean;
  hasVideoSolution: boolean;
  stats: string;
  content: string;
};

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
