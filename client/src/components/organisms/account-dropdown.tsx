import {AccountDropdownWeb} from "@/components/molecules/account-dropdown-web.tsx";
import {AccountDropdownMobile} from "@/components/molecules/account-dropdown-mobile.tsx";

export const AccountDropdown = () => {
  return (
    <>
      <div className="hidden md:block">
        <AccountDropdownWeb/>
      </div>
      <div className="md:hidden">
        <AccountDropdownMobile/>
      </div>
    </>
  )
}