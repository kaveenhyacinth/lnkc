import {Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger} from "@/components/ui/drawer.tsx";
import UserIcon from "@/assets/svg/user-icon.svg?react";

export interface AccountDropdownMobileProps {
  onSignOut: () => void
}

export const AccountDropdownMobile = ({onSignOut}: AccountDropdownMobileProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex justify-end items-center cursor-pointer">
          <UserIcon/>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="!pb-2 ">
            <DrawerTitle className="mt-2 font-raleway">Hi, John Doe</DrawerTitle>
          </DrawerHeader>
          <div className="w-full p-4 mb-4 flex flex-col justify-center items-center">
            <p className="block py-2">Settings</p>
            <p className="block py-2 text-destructive" onClick={onSignOut}>Sign out</p>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}