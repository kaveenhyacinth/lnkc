import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import UserIcon from "@/assets/svg/user-icon.svg?react";

export const AccountDropdownWeb = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end items-center cursor-pointer">
          <UserIcon/>
          <p className="ml-3 font-raleway hidden md:block hover:text-light-white">Hi, John Doe</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mt-2 mr-6">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="text-destructive">Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}