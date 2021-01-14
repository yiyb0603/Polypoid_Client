import { IResponse } from "./Response";

export interface IPostList extends IResponse {
  data: {
    posts: IPostView[];
  }
}

export interface IPostType extends IResponse {
  data: {
    post: IPostView;
  };
};

export interface IPostView {
  idx: number;
  title: string;
  contents: string;
  created_at: Date | string;
  updated_at: Date | string | null;
}