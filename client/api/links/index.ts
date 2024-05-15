import type {DefineMethods} from "aspida";
import {ILink} from "../types.ts";

export type Methods = DefineMethods<{
  get: {
    resBody: ILink[]
  },
  post: {
    reqBody: {
      url: string;
      title: string;
      description: string;
    },
    resBody: ILink
  }
}>