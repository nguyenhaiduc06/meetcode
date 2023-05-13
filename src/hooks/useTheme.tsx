import { useTheme as useStyledComponentsTheme } from "styled-components/native";
import { Theme } from "../theme";
export function useTheme() {
  const theme = useStyledComponentsTheme() as Theme;
  return theme;
}
