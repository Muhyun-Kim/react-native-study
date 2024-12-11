import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getMemos } from "@/services/memo-storage";
import { Memo } from "@/types/memo";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

export default function Index() {
  const router = useRouter();
  const [memos, setMemos] = useState<Memo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      const fetchMemos = async () => {
        const fetchedMemos = await getMemos();
        setMemos(fetchedMemos);
      };
      fetchMemos();
      setIsLoading(false);
    }, [])
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <>
          {memos.map((memo) => {
            return (
              <TouchableOpacity
                key={memo.id}
                onPress={() => {
                  router.push({
                    pathname: "/add-memo",
                    params: {
                      id: memo.id,
                    },
                  });
                }}
              >
                <View style={styles.memoList}>
                  <Text>{memo.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </>
      )}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-memo")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
  },
  memoList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 16,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
