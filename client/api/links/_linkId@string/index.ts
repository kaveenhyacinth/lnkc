import type {DefineMethods} from "aspida";
import {ILink} from "../../types";

export type Methods = DefineMethods<{
  get: {
    resBody: ILink
  },
  patch: {
    reqBody: {
      title: string;
      description?: string;
      hasQr?: boolean;
      isCustom?: boolean;
      isPinned?: boolean;
      properties?: object;
    },
    resBody: ILink
  },
  delete: {
    resBody: object
  }
}>