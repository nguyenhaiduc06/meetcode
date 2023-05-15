import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./src/navigators";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./src/theme";
import { useEffect, useState } from "react";
import { Appearance, useColorScheme } from "react-native";
import { Theme } from "./src/theme";
import {
  useFonts,
  IBMPlexMono_400Regular,
} from "@expo-google-fonts/ibm-plex-mono";

export default function App() {
  const [fontsLoaded] = useFonts({
    IBMPlexMono_400Regular,
  });

  const theme = darkTheme;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <MainNavigator />
      </NavigationContainer>
      <StatusBar style={theme.statusBarStyle} />
    </ThemeProvider>
  );
}
