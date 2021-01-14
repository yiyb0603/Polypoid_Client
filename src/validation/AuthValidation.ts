import { Alert } from "react-native";
import { SignInDto, SignUpDto } from "~/types/dto/Auth.dto";

export const validateSignUp = (request: SignUpDto): boolean => {
  const { id, name, password, rePassword } = request;

  if (!id.trim() || !name.trim() || !password.trim() || !rePassword?.trim()) {
    Alert.alert("빈칸없이 입력해주세요");
    return false;
  }

  if (password !== rePassword) {
    Alert.alert("비밀번호가 올바르지 않습니다.");
    return false;
  }

  return true;
}

export const validateSignIn = (request: SignInDto): boolean => {
  const { id, password } = request;

  if (!id.trim() || !password.trim()) {
    Alert.alert("빈칸없이 입력해주세요");
    return false;
  }

  return true;
}