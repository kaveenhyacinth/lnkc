import {AccountDropdownWeb} from "@/components/molecules/account-dropdown-web.tsx";
import {AccountDropdownMobile} from "@/components/molecules/account-dropdown-mobile.tsx";

export interface AccountDropdownProps {
  onSignOut: () => void
}

export const AccountDropdown = ({onSignOut}: AccountDropdownProps) => {
  return (
    <>
      <div className="hidden md:block">
        <AccountDropdownWeb onSignOut={onSignOut}/>
      </div>
      <div className="md:hidden">
        <AccountDropdownMobile onSignOut={onSignOut}/>
      </div>
    </>
  )
}