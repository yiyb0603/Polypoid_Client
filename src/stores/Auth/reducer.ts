import {
  POST_SIGNIN,
  POST_SIGNIN_ERROR,
  POST_SIGNUP,
  POST_SIGNUP_ERROR
} from "./actionType";

const initialState = {
  response: null,
  error: null,
  loading: true,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case POST_SIGNIN:
      return {
        ...state,
        response: action.response,
      };

    case POST_SIGNUP:
      return {
        ...state,
        response: action.response,
      };

    case POST_SIGNIN_ERROR:
      return {
        ...state,
        error: action.error,
      }

    case POST_SIGNUP_ERROR:
      return {
        ...state,
        error: action.error,
      }

    default:
      return state;
  }
};

export default authReducer;