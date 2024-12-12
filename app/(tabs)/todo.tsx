import { Fab } from "@/components/btn";
import { Todo } from "@/types/todo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getTodos } from "@/services/todo-storage";
import { colors } from "@/lib/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TodoScreen() {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      const fetchTodos = async () => {
        const fetchedTodos = await getTodos();
        console.log(fetchedTodos);
        setTodos(fetchedTodos);
      };
      fetchTodos();
      setIsLoading(false);
    }, [])
  );

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log("AsyncStorage has been cleared!");
    } catch (e) {
      console.error("Failed to clear AsyncStorage:", e);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          {todos.map((todo) => {
            console.log(todo);
            return (
              <TouchableOpacity
                key={todo.id}
                onPress={() => {
                  router.push({
                    pathname: "/add-todo",
                    params: {
                      id: todo.id,
                    },
                  });
                }}
              >
                <View style={styles.todoList}>
                  <Text>{todo.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </>
      )}
      <Fab onPress={() => router.push("/add-todo")} />
      {/* <Fab onPress={clearAsyncStorage} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
  },
  todoList: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    paddingHorizontal: 16,
  },
});
