import AsyncStorage from "@react-native-async-storage/async-storage";

const TODO_KEY = "todos";

export const createTodo = async (
  title: string,
  detail: string,
  deadLine: string
): Promise<void> => {
  try {
    const storeTodos = await AsyncStorage.getItem(TODO_KEY);
    const todos = storeTodos ? JSON.parse(storeTodos) : [];
    const newTodo = {
      id: todos.length + 1,
      title,
      detail,
      deadLine,
    };
    todos.push(newTodo);
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error("Failed to create memo:", e);
  }
};
