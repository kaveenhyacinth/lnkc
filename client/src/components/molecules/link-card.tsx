import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import CopyIcon from "@/assets/svg/copy-icon.svg?react";
import EditIcon from "@/assets/svg/edit-icon.svg?react";
import VisitIcon from "@/assets/svg/paper-plane-icon.svg?react";

export const LinkCard = () => {
  return (
    <Card className="w-full md:w-[300px] h-[180px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-raleway hidden mb-2">https://kawaskamex.cc/arex/tem...</p>
        <p className="text-md text-bright-blue font-semibold font-raleway">lnkc.xyz/lqrmxyep</p>
      </CardContent>
      <CardFooter>
        <div className="w-full h-6 flex justify-between items-center">
          <div className="flex-1 flex gap-3 items-center">
            <VisitIcon className="action-icon" />
            <CopyIcon className="action-icon" />
            <EditIcon className="action-icon" />
          </div>
          <div>
            <p className="text-[12px] text-muted-foreground font-raleway text-right">21 Views</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}