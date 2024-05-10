import {createRootRoute, Outlet} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {/* Start rendering router matches */}
      <TanStackRouterDevtools position="bottom-left" />
    </>
  )
})
