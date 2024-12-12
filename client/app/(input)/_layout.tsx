import { Stack } from 'expo-router';

export default function InputLayout() {
  return (
    <Stack>
      {/* Hide header for the 'grocery' screen */}
      <Stack.Screen name="grocery" options={{ headerShown: false }} />

      {/* Default settings for 'detail' screen */}
      <Stack.Screen name="detail" options={{ headerShown: false }} />
    </Stack>
  );
}
