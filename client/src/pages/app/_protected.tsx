import {createFileRoute, redirect} from '@tanstack/react-router'
import {STORAGE_KEY_TOKEN} from "@/lib/constants.ts";

export const Route = createFileRoute('/app/_protected')({
  beforeLoad: async ({location}) => {
    if (!localStorage.getItem(STORAGE_KEY_TOKEN)) {
      throw redirect({
        to: '/app/auth/sign-in',
        search: {
          redirect: location.href
        }
      })
    }
  },
})