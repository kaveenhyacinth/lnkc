import {AccountDropdownWeb} from "@/components/molecules/account-dropdown-web.tsx";
import {AccountDropdownMobile} from "@/components/molecules/account-dropdown-mobile.tsx";

export interface AccountDropdownProps {
  username: string
  onSignOut: () => void
}

export const AccountDropdown = (props: AccountDropdownProps = {
  username: '...',
  onSignOut: () => {}
}) => {
  return (
    <>
      <div className="hidden md:block">
        <AccountDropdownWeb {...props}/>
      </div>
      <div className="md:hidden">
        <AccountDropdownMobile {...props}/>
      </div>
    </>
  )
}