import {createRootRouteWithContext, Outlet} from '@tanstack/react-router'
// import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import {Toaster} from "@/components/ui/toaster.tsx";
import {AuthState} from "@/store/auth.tsx";

type RouterContext = {
  authentication: AuthState
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet/>
      <Toaster/>
      {/* Start rendering router matches */}
      {/*<TanStackRouterDevtools position="bottom-left"/>*/}
    </>
  )
})
