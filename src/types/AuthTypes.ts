import { IResponse } from "./Response";

export interface ILoginTypes extends IResponse {
  data: {
    userToken: string;
  };
};