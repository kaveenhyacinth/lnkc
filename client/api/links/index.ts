import type {DefineMethods} from "aspida";

export interface ILink {
  id: string;
  title: string;
  description: string;
  url: string;
  shortCode: string;
  hasQr: boolean;
  isCustom: boolean;
  isPinned: boolean;
  properties: object;
  team: object;
}

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