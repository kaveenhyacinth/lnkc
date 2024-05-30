import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import CopyIcon from "@/assets/svg/copy-icon.svg?react";
import VisitIcon from "@/assets/svg/paper-plane-icon.svg?react";
import {ILink} from "../../../api/types.ts";
import {UpdateLinkDialog} from "@/components/organisms/update-link-dialog.tsx";
import {useToast} from "@/components/ui/use-toast.ts";
import {useEffect, useState} from "react";

export interface LinkCardProps {
  link: ILink;
  onUpdate: (payload: Pick<ILink, 'title' | 'description' | 'id'>) => void;
  onDelete: (linkId: string) => void;
}

export const LinkCard = ({link, onUpdate, onDelete}: LinkCardProps) => {

  const {toast} = useToast()

  const [stats, setStats] = useState<{
    views: number;
    text: 'view' | 'views';
  }>({views: 0, text: 'views'})

  const onCopy = async () => {
    const value = `${import.meta.env.VITE_API_BASE_URL}/${link.shortCode}`
    try {
      await navigator.clipboard.writeText(value)
      toast({
        title: 'Link copied to clipboard',
        description: value,
      })
    } catch (error) {
      console.error('Failed to copy to clipboard')
    }
  }

  useEffect(() => {
    if (link.analyticsCount) {
      setStats({
        views: link.analyticsCount,
        text: link.analyticsCount === 1 ? 'view' : 'views'
      })
    }
  }, [link.analyticsCount]);

  return (
    <Card className="w-full md:w-[300px] h-[180px] flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="overflow-hidden overflow-ellipsis whitespace-nowrap">{link.title}</CardTitle>
        <CardDescription className="overflow-hidden overflow-ellipsis whitespace-nowrap">{link.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-raleway hidden mb-2">{link.url}</p>
        <a href={`${import.meta.env.VITE_API_BASE_URL}/${link.shortCode}`} target="_blank">
          <p className="text-md text-bright-blue font-semibold font-raleway">lnkc.xyz/{link.shortCode}</p>
        </a>
      </CardContent>
      <CardFooter>
        <div className="w-full h-6 flex justify-between items-center">
          <div className="flex-1 flex gap-3 items-center">
            <a href={`${import.meta.env.VITE_API_BASE_URL}/${link.shortCode}`} target="_blank">
              <VisitIcon className="action-icon"/>
            </a>
            <CopyIcon className="action-icon" onClick={onCopy}/>
            <UpdateLinkDialog link={link} onUpdate={onUpdate} onDelete={onDelete}/>
          </div>
          <div>
            <p
              className="text-[12px] text-muted-foreground font-raleway text-right">{`${stats.views} ${stats.text}`}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}