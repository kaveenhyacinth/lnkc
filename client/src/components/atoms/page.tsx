import {PropsWithChildren} from "react";
import {Header} from "@/components/atoms/header.tsx";
import {Footer} from "@/components/atoms/footer.tsx";

export const Page = ({children}: PropsWithChildren) => {
  return (
    <main className="h-screen w-full flex flex-col p-6 md:py-9 md:px-10">
      <Header />
      <div className="flex-1 mt-4 flex flex-col items-center md:max-w-[550px] md:mx-auto">
        {children}
      </div>
      <Footer />
    </main>

  )
}