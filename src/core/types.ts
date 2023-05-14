export type GetQuestionsOptions = {
  categorySlug: string;
  skip: number;
  limit: 50;
  filters: QuestionListFilterInput;
};
export type QuestionListFilterInput = {
  difficulty: Difficulty;
  tags: any[];
  searchKeywords: string;
  status: Status;
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

export type QuestionDescription = {
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

export type QuestionCodeEditor = {
  codeSnippets: CodeSnippet[];
  sampleTestCases: any;
};

export type CodeSnippet = {
  lang: string;
  langSlug: string;
  code: string;
};
