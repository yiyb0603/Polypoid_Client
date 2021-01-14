import { Alert } from "react-native";
import { IError } from "~/types/Response";
import CustomError from "./CustomError";

class PostError extends CustomError {
  constructor(private _error: IError) {
    super(_error);
    Alert.alert(this.message);
  }
}

export default PostError;