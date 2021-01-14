import AsyncStorage from "@react-native-community/async-storage"

export const getStorage = async (key: string) => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item;
  } catch (error) {
    alert(error);
  }
};

// AsyncStorage set 함수 모듈
export const setStorage = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    alert(error);
  }
};

export const removeStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    alert(error);
  }
};