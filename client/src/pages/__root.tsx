import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import {Toaster} from "@/components/ui/toaster.tsx";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster />
      {/* Start rendering router matches */}
      <TanStackRouterDevtools position="bottom-left" />
    </>
  )
})
