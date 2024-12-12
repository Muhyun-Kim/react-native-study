import { Fab } from "@/components/btn";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TodoScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <Fab onPress={() => router.push("/add-todo")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
  },
});
