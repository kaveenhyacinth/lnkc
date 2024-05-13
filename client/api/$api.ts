import type { AspidaClient } from 'aspida';
import type { Methods as Methods_23mjnn } from './auth/signin';
import type { Methods as Methods_1yes9ht } from './auth/signup';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/auth/signin';
  const PATH1 = '/auth/signup';
  const POST = 'POST';

  return {
    auth: {
      signin: {
        post: (option: { body: Methods_23mjnn['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_23mjnn['post']['resBody']>(prefix, PATH0, POST, option).json(),
        $post: (option: { body: Methods_23mjnn['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_23mjnn['post']['resBody']>(prefix, PATH0, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH0}`,
      },
      signup: {
        post: (option: { body: Methods_1yes9ht['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1yes9ht['post']['resBody']>(prefix, PATH1, POST, option).json(),
        $post: (option: { body: Methods_1yes9ht['post']['reqBody'], config?: T | undefined }) =>
          fetch<Methods_1yes9ht['post']['resBody']>(prefix, PATH1, POST, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH1}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
