import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { getMemos } from "@/services/memo-storage";
import { Memo } from "@/types/memo";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { colors } from "@/lib/color";
import { Fab } from "@/components/btn";

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
      {/* <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-memo")}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity> */}
      <Fab onPress={() => router.push("/add-memo")} />
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
    borderBottomColor: colors.gray,
    paddingHorizontal: 16,
  },
});
