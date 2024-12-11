import {
  createMemo,
  deleteMemo,
  getMemo,
  updateMemo,
} from "@/services/memo-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function AddMemoScreen() {
  const navigation = useNavigation();

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState("");
  const params = useLocalSearchParams();
  const id = Number(Array.isArray(params.id) ? params.id[0] : params.id || "0");

  useEffect(() => {
    const fetchMemo = async () => {
      if (id !== 0) {
        const memo = await getMemo(id);
        console.log(memo);
        if (memo) {
          setTitle(memo.title);
          setDetail(memo.detail);
          setDate(memo.date);
        }
      }
    };
    fetchMemo();
    console.log(title);
  }, [id]);

  const onClickSave = async () => {
    if (!id || id === 0) {
      await createMemo(title, detail);
    } else {
      await updateMemo(id, title, detail);
    }
    navigation.goBack();
  };

  const onClickDelete = async (id: number) => {
    await deleteMemo(id);
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {id !== 0 && (
            <TouchableOpacity onPress={() => onClickDelete(id)}>
              <Text style={{ color: "#FF8000", fontSize: 16, marginRight: 16 }}>
                削除
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={onClickSave} style={{ marginRight: 16 }}>
            <Text style={{ color: "#007AFF", fontSize: 16 }}>保存</Text>
          </TouchableOpacity>
        </>
      ),
    });
  }, [navigation, title, detail]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="タイトル"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.detailInput}
        placeholder="詳細"
        multiline
        value={detail}
        onChangeText={setDetail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: "column",
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
