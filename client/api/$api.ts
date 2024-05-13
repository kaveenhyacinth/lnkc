import type { AspidaClient } from 'aspida';
import type { Methods as Methods_23mjnn } from './auth/signin';
import type { Methods as Methods_1yes9ht } from './auth/signup';
import type { Methods as Methods_1oaty1f } from './links';
import type { Methods as Methods_jzr18p } from './users/me';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? '' : baseURL).replace(/\/$/, '');
  const PATH0 = '/auth/signin';
  const PATH1 = '/auth/signup';
  const PATH2 = '/links';
  const PATH3 = '/users/me';
  const GET = 'GET';
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
    links: {
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1oaty1f['get']['resBody']>(prefix, PATH2, GET, option).json(),
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1oaty1f['get']['resBody']>(prefix, PATH2, GET, option).json().then(r => r.body),
      post: (option: { body: Methods_1oaty1f['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1oaty1f['post']['resBody']>(prefix, PATH2, POST, option).json(),
      $post: (option: { body: Methods_1oaty1f['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1oaty1f['post']['resBody']>(prefix, PATH2, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH2}`,
    },
    users: {
      me: {
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_jzr18p['get']['resBody']>(prefix, PATH3, GET, option).json(),
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods_jzr18p['get']['resBody']>(prefix, PATH3, GET, option).json().then(r => r.body),
        $path: () => `${prefix}${PATH3}`,
      },
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
