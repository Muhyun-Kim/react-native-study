import { colors } from "@/lib/color";
import {
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo,
} from "@/services/todo-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { useLocalSearchParams } from "expo-router";

export default function AddTodoScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [deadLine, setDeadLine] = useState(new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const params = useLocalSearchParams();
  const id = Number(Array.isArray(params.id) ? params.id[0] : params.id || "0");

  useEffect(() => {
    const fetchTodo = async () => {
      if (id !== 0) {
        const todo = await getTodo(id);
        if (todo) {
          setTitle(todo.title);
          setDetail(todo.detail);
          setDeadLine(new Date(todo.deadLine));
        }
      }
    };
    fetchTodo();
  }, [id]);

  const onClickSave = async () => {
    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }
    if (!detail.trim()) {
      alert("詳細を入力してください");
      return;
    }
    if (!id || id === 0) {
      await createTodo(title, detail, deadLine.toISOString());
    } else {
      await updateTodo(id, title, detail, deadLine.toISOString());
    }
    navigation.goBack();
  };

  const onClickDelete = async (id: number) => {
    await deleteTodo(id);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      title: "新しいTODO",
      headerRight: () => (
        <>
          {id !== 0 && (
            <TouchableOpacity onPress={() => onClickDelete(id)}>
              <Text
                style={{
                  color: colors.secondary,
                  fontSize: 16,
                  marginRight: 16,
                }}
              >
                削除
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onClickSave} style={{ marginRight: 16 }}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>保存</Text>
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation, title, detail, deadLine]);
  return (
    <View style={styles.container}>
      <View style={styles.todoInput}>
        <TextInput
          style={styles.titleInput}
          placeholder="タイトル"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.detailInput}
          placeholder="詳細"
          value={detail}
          onChangeText={setDetail}
        />
      </View>
      <Button
        title={`締切: ${new Intl.DateTimeFormat("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(deadLine)}`}
        onPress={() => setIsPickerOpen(true)}
      />
      <DatePicker
        modal
        open={isPickerOpen}
        date={deadLine}
        onConfirm={(selectedDate) => {
          setIsPickerOpen(false);
          setDeadLine(selectedDate);
        }}
        onCancel={() => setIsPickerOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: 16,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "column",
  },
  todoInput: {
    display: "flex",
    flexDirection: "column",
    height: "85%",
  },
  titleInput: {
    fontSize: 24,
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  detailInput: {
    fontSize: 16,
  },
});
