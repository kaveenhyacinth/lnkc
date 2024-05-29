import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      firstName: string
      lastName: string
      email: string
      password: string
    }
    resBody: {
      token: string
    }
  }
}>