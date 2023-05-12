import { palette } from "./colors";
import { spacing } from "./spacing";

export const lightTheme = {
  dark: false,
  palette,
  colors: {
    background: palette.white,
    foreground: palette.gray100,
    text: palette.gray900,
    textDim: palette.gray500,
    success: palette.green500,
    failure: palette.red500,
    danger: palette.red500,
    warning: palette.yellow500,
    info: palette.blue500,
  },
  spacing,
};

export const darkTheme = {
  ...lightTheme,
  dark: true,
  colors: {
    background: palette.gray900,
    foreground: palette.gray800,
    text: palette.white,
    textDim: palette.gray500,
    success: palette.green500,
    failure: palette.red500,
    danger: palette.red500,
    info: palette.blue500,
    warning: palette.yellow500,
    card: palette.gray900,

    primary: "rgb(10, 132, 255)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)",
  },
};
