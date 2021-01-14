import { deleteRequest, getResponse, modifyRequest, postRequest } from "~/lib/Axios"
import { PostDto } from "~/types/dto/Post.dto";
import { IPostList, IPostType } from "~/types/PostTypes";
import { IResponse } from "~/types/Response";
import getToken from "~/util/getToken"
import {
  DELETE_POST,
  DELETE_POST_ERROR,
  GET_POST,
  GET_POSTS,
  GET_POSTS_ERROR,
  GET_POST_ERROR,
  MODIFY_POST,
  MODIFY_POST_ERROR,
  WRITE_POST,
  WRITE_POST_ERROR
} from "./actionType";

export const handlePostList = async () => {
  try {
    const token = await getToken();
    const response: IPostList = await getResponse('/post', token);

    const { posts } = response.data;
    const postList = posts;
    
    return {
      type: GET_POSTS,
      postList,
    };
  } catch (error) {
    return {
      type: GET_POSTS_ERROR,
      error,
    };
  }
}

export const handlePostView = async (idx: number) => {
  try {
    const token = await getToken();
    const response: IPostType = await getResponse(`/post/${idx}`, token);

    const { post } = response.data;
    return {
      type: GET_POST,
      postInfo: post,
    };
  } catch (error) {
    return {
      type: GET_POST_ERROR,
      error,
    };
  }
}

export const handlePostWrite = async (request: PostDto) => {
  try {
    const token = await getToken();
    const response: IResponse = await postRequest('/post', request, token);

    return {
      type: WRITE_POST,
      response,
    };
  } catch (error) {
    return {
      type: WRITE_POST_ERROR,
      error,
    };
  }
}

export const handlePostModify = async (idx: number, request: PostDto) => {
  try {
    const token = await getToken();
    const response: IResponse = await modifyRequest(`/post/${idx}`, request, token);

    return {
      type: MODIFY_POST,
      response,
    };
  } catch (error) {
    return {
      type: MODIFY_POST_ERROR,
      error,
    };
  }
}

export const handlePostDelete = async (idx: number) => {
  try {
    const token = await getToken();
    const response: IResponse = await deleteRequest(`/post/${idx}`, token);

    return {
      type: DELETE_POST,
      response,
    };
  } catch (error) {
    return {
      type: DELETE_POST_ERROR,
      error,
    }
  }
}