import {PropsWithChildren} from "react";

export const Header = ({children}: PropsWithChildren) => {
  return (
    <header className="w-full flex justify-between items-center sticky top-0 pt-2 bg-background">
      <h1 className="font-montserrat font-semibold text-xl md:text-2xl pb-3 text-bright-blue">
        lnkc
        <span className="text-4xl text-bright-orange">.</span>
      </h1>
      <div className="flex-1">
        {children}
      </div>
    </header>
  )
}