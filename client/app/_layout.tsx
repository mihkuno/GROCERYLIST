import { DarkTheme, DefaultTheme, ThemeProvider, useTheme } from '@react-navigation/native';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from 'expo-font';
import { Stack, useFocusEffect } from 'expo-router';
import { Text } from "@/components/ui/text";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useContext } from 'react';
import 'react-native-reanimated';
import { SessionProvider, SessionContext } from '../provider/SessionProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  // Hide the splash screen once fonts are loaded
  useEffect(() => {
    SplashScreen.hideAsync();
    setIsReady(true);  // Mark the app as ready
  }, []);

  if (!isReady) return null;  // Avoid rendering before the app is ready

  return (
    <GluestackUIProvider mode="light">
      <SessionProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false, animation:'fade_from_bottom',  }} />
      </SessionProvider>
    </GluestackUIProvider>
  );
}
