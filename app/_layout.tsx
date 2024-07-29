import "expo-dev-client";
import { Buffer } from "buffer";
import "react-native-get-random-values";

global.TextEncoder = require("text-encoding").TextEncoder;
global.Buffer = Buffer;

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { dynamic, useDynamic } from "@/client";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { sdk } = useDynamic();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || sdk.loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, sdk.loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <dynamic.reactNative.WebView />
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </>
  );
}
