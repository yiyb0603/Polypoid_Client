import {
  DELETE_POST,
  DELETE_POST_ERROR,
  GET_POST,
  GET_POSTS,
  GET_POSTS_ERROR,
  GET_POST_ERROR,
  MODIFY_POST,
  MODIFY_POST_ERROR,
  WRITE_POST
} from "./actionType";

const initialState = {
  error: null,
  postList: [],
  postInfo: {},
};

const postReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        postList: action.postList,
      };

    case GET_POST:
      return {
        ...state,
        postInfo: action.postInfo,
      };

    case GET_POSTS_ERROR:
    case GET_POST_ERROR:
    case MODIFY_POST_ERROR:
    case DELETE_POST_ERROR:
      return {
        ...state,
        error: action.error,
      };

    case DELETE_POST:
    case WRITE_POST:
    case MODIFY_POST:
      return {
        ...state,
        response: action.response,
      };

    default:
      return state;
  }
}

export default postReducer;