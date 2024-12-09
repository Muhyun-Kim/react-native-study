import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-memo"
        options={{ title: "新しいメモ", headerBackTitle: "戻る" }}
      />
    </Stack>
  );
}
