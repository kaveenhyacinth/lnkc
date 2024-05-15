import {createRouter, RouterProvider} from "@tanstack/react-router";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Import the generated route tree
import {routeTree} from './routeTree.gen'
import useAuthStore from "@/store/auth.tsx";
import {useEffect} from "react";
import {STORAGE_KEY_TOKEN} from "@/lib/constants.ts";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {authentication: undefined!}
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

export const App = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  const setIsAuthenticated = useAuthStore(state => state.setIsAuthenticated)

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN)
    setIsAuthenticated(!!token)
  }, [setIsAuthenticated])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        context={{authentication: {isAuthenticated}}}
      />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  )
}