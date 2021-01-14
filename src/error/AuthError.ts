import { Alert } from "react-native";
import { IError } from "~/types/Response";
import CustomError from "./CustomError";

class AuthError extends CustomError {
  constructor(private _error: IError) {
    super(_error);
  }

  public signInError = (): void => {
    const { status, message } = this;

    switch(status) {
      case 404:
        Alert.alert("존재하는 회원이 없습니다.");
        return;

      default:
        Alert.alert(message);
        return;
    }
  }

  public signUpError = (): void => {
    const { status, message } = this;

    switch(status) {
      case 409:
        Alert.alert("이미 존재하는 회원입니다.");
        return;

      default:
        Alert.alert(message);
        return;
    }
  }
}

export default AuthError;