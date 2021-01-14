import { postRequest } from "~/lib/Axios"
import { SignInDto, SignUpDto } from "~/types/dto/Auth.dto";
import { IResponse } from "~/types/Response";
import { POST_SIGNIN, POST_SIGNIN_ERROR, POST_SIGNUP, POST_SIGNUP_ERROR } from "./actionType";

export const handleSignIn = async (request: SignInDto | any, type?: string) => {
  try {
    const URL: string = type === "google" ? '/auth/googleSign' : '/auth/signin';
    const response = await postRequest(URL, request);
    
    return {
      type: POST_SIGNIN,
      response,
    };
  } catch (error) {
    return {
      type: POST_SIGNIN_ERROR,
      error,
    };
  }
};

export const handleSignUp = async (request: SignUpDto) => {
  try {
    const response: IResponse = await postRequest('/auth/signup', request);

    return {
      type: POST_SIGNUP,
      response,
    };
  } catch (error) {
    return {
      type: POST_SIGNUP_ERROR,
      error,
    };
  }
};