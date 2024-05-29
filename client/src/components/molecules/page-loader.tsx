import {Loader2} from "lucide-react";

export const PageLoader = ({enabled}: { enabled: boolean }) => {
  return enabled ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-medium-black opacity-80">
      <Loader2 className="w-10 h-10 text-bright-orange animate-spin"/>
    </div>
  ) : <></>
}