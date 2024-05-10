import {JSX, PropsWithChildren} from "react";
import {Header} from "@/components/atoms/header.tsx";
import {Footer} from "@/components/atoms/footer.tsx";
import { cn } from "@/lib/utils"

export interface PageProps {
  renderHeader?: () => JSX.Element
  contentStyle?: string
}

export const Page = ({renderHeader, contentStyle, children}: PropsWithChildren<PageProps>) => {
  return (
    <main className="min-h-screen w-full flex flex-col p-6 md:px-10">
      <Header>
        {renderHeader?.()}
      </Header>
      <div className={cn("flex-1 mt-4 flex flex-col items-center md:max-w-[550px] md:mx-auto", contentStyle)}>
        {children}
      </div>
      <Footer />
    </main>

  )
}