import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      email: string
      password: string
    }
    resBody: {
      token: string
    }
  }
}>