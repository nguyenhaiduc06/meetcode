import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./src/navigators";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./src/theme";

export default function App() {
  const theme = lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <MainNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
