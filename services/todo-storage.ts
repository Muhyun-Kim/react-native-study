import { Todo } from "@/types/todo";
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

export const getTodos = async (): Promise<Todo[]> => {
  try {
    const storeTodos = await AsyncStorage.getItem(TODO_KEY);
    const todos = storeTodos ? JSON.parse(storeTodos) : [];
    return todos.map((todo: Todo) => ({
      ...todo,
      deadLine: new Date(todo.deadLine),
    }));
  } catch (e) {
    console.error("Failed to fetch todos:", e);
    return [];
  }
};

export const getTodo = async (id: number): Promise<Todo | undefined> => {
  try {
    const storeTodos = await AsyncStorage.getItem(TODO_KEY);
    const todos = storeTodos ? JSON.parse(storeTodos) : [];
    const todo = todos.find((todo: Todo) => todo.id === id);
    return todo;
  } catch (e) {
    console.error("Failed to fetch todo:", e);
    return undefined;
  }
};

export const updateTodo = async (
  id: number,
  title: string,
  detail: string,
  deadLine: string
) => {
  try {
    const storeTodos = await AsyncStorage.getItem(TODO_KEY);
    const todos = storeTodos ? JSON.parse(storeTodos) : [];
    const updatedTodos = todos.map((todo: Todo) =>
      todo.id === id ? { ...todo, title, detail, deadLine } : todo
    );
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(updatedTodos));
    console.log("ok");
  } catch (e) {
    console.log(e);
  }
};

export const deleteTodo = async (id: number) => {
  try {
    const storeTodos = await AsyncStorage.getItem(TODO_KEY);
    const todos = storeTodos ? JSON.parse(storeTodos) : [];
    const filteredTodos = todos.filter((todo: Todo) => todo.id !== id);
    await AsyncStorage.setItem(TODO_KEY, JSON.stringify(filteredTodos));
  } catch (e) {
    console.log(e);
  }
};
