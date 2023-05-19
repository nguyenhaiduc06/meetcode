import { QuestionDifficultyFilter, QuestionStatusFilter } from "../core/types";
import { palette } from "../theme";
const braces = new Map<string, string>([
  ["{", "}"],
  ["(", ")"],
  ["[", "]"],
  ["<", ">"],
  ['"', '"'],
  ["'", "'"],
  ["`", "`"],
]);

const difficultyLabelByValue: { [key in QuestionDifficultyFilter]: string } = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

const statusLabelByValue: { [key in QuestionStatusFilter]: string } = {
  AC: "Solved",
  TRIED: "Attempted",
  NOT_STARTED: "Todo",
};

class Helper {
  static getColorByDifficulty(difficulty: string) {
    const colorByDifficulty = {
      easy: palette.green[500],
      medium: palette.amber[500],
      hard: palette.red[500],
    };
    return colorByDifficulty[difficulty.toLowerCase()];
  }

  static nFormatter(num: number, digits: number = 1) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
      : "0";
  }

  static insertStringAt(
    str: string,
    position: number,
    strToInsert: string
  ): string {
    const res =
      str.substring(0, position + 1) +
      strToInsert +
      str.substring(position + 1);
    return res;
  }

  static isOpenBrace(str: string): boolean {
    return braces.has(str);
  }

  static getCloseBrace = (str: string): string => {
    return braces.get(str) || "";
  };

  static getDifficultyLabelByValue(difficulty: QuestionDifficultyFilter) {
    if (difficulty in difficultyLabelByValue) {
      return difficultyLabelByValue[difficulty];
    }
    return null;
  }

  static getStatusLabelByValue(status: QuestionStatusFilter) {
    if (status in statusLabelByValue) {
      return statusLabelByValue[status];
    }
    return null;
  }
}

export default Helper;
