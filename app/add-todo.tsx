import { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button } from "react-native";
import DatePicker from "react-native-date-picker";

export default function AddTodoScreen() {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [deadLine, setDeadLine] = useState(new Date());
  const [isPickerOpen, setIsPickerOpen] = useState(false);
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
