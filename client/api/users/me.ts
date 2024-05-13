import type { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  get: {
    resBody: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      team: string;
    }
  }
}>