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

export interface AccountDropdownWebProps {
  username: string
  onSignOut: () => void
}

export const AccountDropdownWeb = ({username, onSignOut}: AccountDropdownWebProps) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end items-center cursor-pointer">
          <UserIcon/>
          <p className="ml-3 font-raleway hidden md:block hover:text-light-white">Hi, {username}</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mt-2 mr-6">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onSignOut}>
            <span className="text-destructive">Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}