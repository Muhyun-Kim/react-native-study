import { Memo } from "@/types/memo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MEMO_KEY = "memos";

export const createMemo = async (
  title: string,
  detail: string
): Promise<void> => {
  try {
    const storeMemos = await AsyncStorage.getItem(MEMO_KEY);
    const memos = storeMemos ? JSON.parse(storeMemos) : [];
    const newMemo = {
      id: memos.length + 1,
      title,
      detail,
      date: new Date().toISOString(),
    };
    memos.push(newMemo);
    await AsyncStorage.setItem(MEMO_KEY, JSON.stringify(memos));
  } catch (e) {
    console.error("Failed to create memo:", e);
  }
};

export const getMemos = async (): Promise<[]> => {
  try {
    const storeMemos = await AsyncStorage.getItem(MEMO_KEY);
    return storeMemos ? JSON.parse(storeMemos) : [];
  } catch (e) {
    return [];
  }
};

export const getMemo = async (id: number): Promise<Memo | undefined> => {
  try {
    const storeMemos = await AsyncStorage.getItem(MEMO_KEY);
    const memos = storeMemos ? JSON.parse(storeMemos) : [];
    console.log("memos", memos);
    const memo = memos.find((memo: Memo) => memo.id === id);
    console.log("memo", memo);
    return memo;
  } catch (e) {
    console.error("Failed to fetch memo:", e);
    return undefined;
  }
};

export const updateMemo = async (
  id: number,
  title: string,
  detail: string
): Promise<void> => {
  try {
    const storedMemos = await AsyncStorage.getItem(MEMO_KEY);
    const memos = storedMemos ? JSON.parse(storedMemos) : [];
    const updatedMemos = memos.map((memo: Memo) =>
      memo.id === id ? { ...memo, title, detail } : memo
    );
    await AsyncStorage.setItem(MEMO_KEY, JSON.stringify(updatedMemos));
  } catch (error) {
    console.error("Failed to update memo:", error);
  }
};

export const deleteMemo = async (id: number): Promise<void> => {
  try {
    const storedMemos = await AsyncStorage.getItem(MEMO_KEY);
    const memos = storedMemos ? JSON.parse(storedMemos) : [];
    const filteredMemos = memos.filter((memo: Memo) => memo.id !== id);
    await AsyncStorage.setItem(MEMO_KEY, JSON.stringify(filteredMemos));
  } catch (error) {
    console.error("Failed to delete memo:", error);
  }
};
