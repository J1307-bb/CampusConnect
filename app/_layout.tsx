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
import { View } from "react-native";
import GlobalProvider from "@/context/GlobalProvider";

import * as Sentry from "@sentry/react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Sentry.init({
  dsn: "https://446ddb0a6e6c2cb534f45d5e129e17fb@o4508326779092992.ingest.us.sentry.io/4508326780731392",
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  parentSpanIsAlwaysRootSpan: false,
});

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    /* <ThemeProvider value={colorScheme === 'dark' ? DarkThreeme : DefaultTheme}> */
    /* <GlobalProvider> */
    // es necesario envolver la aplicación en un componente para Sentry
    <>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(profesor)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="mapa"
              options={{
                headerShown: true,
                headerBackTitle: "Atrás",
                title: "Mapa del Campus",
              }}
            />
          </Stack>
    </>
    /* </GlobalProvider> */
    /* </ThemeProvider> */
  );
}

export default Sentry.wrap(RootLayout)
