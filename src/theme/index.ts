import { StatusBarStyle } from "expo-status-bar/src/StatusBar.types";
import { palette } from "./palette";

type ThemeColors = {
  background: string;
  foreground: string;
  text: string;
  textDim: string;
  success: string;
  failure: string;
  danger: string;
  warning: string;
  info: string;

  // these colors are from navigation theme
  // setting these colors for some components in navigation
  card: string;
  primary: string;
  border: string;
  notification: string;
};

export type Theme = {
  dark: boolean;
  statusBarStyle: StatusBarStyle;
  colors: ThemeColors;
};

export const lightTheme: Theme = {
  dark: false,
  statusBarStyle: "dark",
  colors: {
    background: palette.gray[100],
    foreground: palette.gray[200],
    text: palette.gray[900],
    textDim: palette.gray[600],
    success: palette.green[500],
    failure: palette.red[500],
    danger: palette.red[500],
    warning: palette.yellow[500],
    info: palette.blue[500],

    card: palette.gray[200],
    primary: palette.blue[500],
    border: palette.black[20],
    notification: palette.blue[500],
  },
};

export const darkTheme: Theme = {
  dark: true,
  statusBarStyle: "light",
  colors: {
    ...lightTheme.colors,
    background: palette.black[100],
    foreground: "#1c1c1c",
    text: palette.white[100],
    textDim: palette.white[50],
    success: palette.green[500],
    failure: palette.red[500],
    danger: palette.red[500],
    warning: palette.amber[500],
    info: palette.blue[500],

    card: "#1c1c1c",
    primary: palette.green[500],
    border: palette.white[20],
    notification: palette.blue[500],
  },
};

export * from "./palette";

export * from "./spacing";
