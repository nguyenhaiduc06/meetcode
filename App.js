import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./src/navigators";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./src/theme";
import { useEffect, useState } from "react";
import { Appearance } from "react-native";
import { Theme } from "./src/theme";

export default function App() {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const removeListener = Appearance.addChangeListener((preferences) => {
      const colorScheme = preferences.colorScheme;
      const theme = colorScheme == "light" ? lightTheme : darkTheme;
      setTheme(theme);
    });
    return () => {
      removeListener();
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <MainNavigator />
      </NavigationContainer>
      <StatusBar style={theme.statusBarStyle} />
    </ThemeProvider>
  );
}
