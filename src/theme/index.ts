import { StatusBarStyle } from "expo-status-bar/src/StatusBar.types";
import { PaletteColor, palette } from "./colors";

type ThemeColors = {
  background: PaletteColor;
  foreground: PaletteColor;
  text: PaletteColor;
  textDim: PaletteColor;
  success: PaletteColor;
  failure: PaletteColor;
  danger: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;

  // these colors are from navigation theme
  // setting these colors for some components in navigation
  card: PaletteColor;
  primary: PaletteColor;
  border: PaletteColor;
  notification: PaletteColor;
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
    background: palette.gray100,
    foreground: palette.gray200,
    text: palette.gray900,
    textDim: palette.gray600,
    success: palette.green500,
    failure: palette.red500,
    danger: palette.red500,
    warning: palette.yellow500,
    info: palette.blue500,

    card: palette.gray200,
    primary: palette.blue500,
    border: palette.black20,
    notification: palette.blue500,
  },
};

export const darkTheme: Theme = {
  dark: true,
  statusBarStyle: "light",
  colors: {
    ...lightTheme.colors,
    background: palette.gray900,
    foreground: palette.gray800,
    text: palette.white100,
    textDim: palette.gray500,
    success: palette.green500,
    failure: palette.red500,
    danger: palette.red500,
    warning: palette.yellow500,
    info: palette.blue500,

    card: palette.gray900,
    primary: palette.blue500,
    border: palette.white20,
    notification: palette.blue500,
  },
};

export * from "./colors";

export * from "./spacing";
