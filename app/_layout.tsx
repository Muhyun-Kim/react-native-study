import { Stack } from "expo-router";

export default function RootLayout() {
  const handleSave = () => {};
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-memo"
        options={{
          headerBackTitle: "戻る",
        }}
      />
      <Stack.Screen
        name="add-todo"
        options={{
          headerBackTitle: "戻る",
        }}
      />
    </Stack>
  );
}
