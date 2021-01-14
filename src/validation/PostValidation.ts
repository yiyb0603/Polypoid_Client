import { Alert } from "react-native";
import { PostDto } from "~/types/dto/Post.dto";

export const validateForm = (request: PostDto): boolean => {
  const { title, contents } = request;

  if (!title.trim() || !contents.trim()) {
    Alert.alert("빈칸없이 입력해주세요");
    return false;
  }

  return true;
};