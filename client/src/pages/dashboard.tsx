import {createFileRoute} from '@tanstack/react-router'
import {Page} from "@/components/templates/page.tsx";
import {AccountDropdown} from "@/components/organisms/account-dropdown.tsx";

export const Dashboard = () => {
  return (
    <Page
      renderHeader={() => (
        <div className="w-full flex justify-end items-center">
          <AccountDropdown/>
        </div>
      )}
    >
    </Page>
  )
}

export const Route = createFileRoute('/dashboard')({
  component: Dashboard
})