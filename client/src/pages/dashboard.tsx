import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {Page} from "@/components/templates/page.tsx";
import {AccountDropdown} from "@/components/organisms/account-dropdown.tsx";
import {Input} from "@/components/ui/input.tsx";
import {LinkCard} from "@/components/molecules/link-card.tsx";
import {QUERY_KEY_USER_ME, STORAGE_KEY_TEAM, STORAGE_KEY_TOKEN} from "@/lib/constants.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {api, IResponseError} from "../../api";
import {useEffect, useState} from "react";
import {CreateLinkDialog} from "@/components/organisms/create-link-dialog.tsx";
import {useToast} from "@/components/ui/use-toast.ts";

export const Dashboard = () => {
  const navigate = useNavigate()
  const {toast} = useToast()

  const [url, setUrl] = useState<string>("")

  const getUserQuery = useQuery({
    queryKey: [QUERY_KEY_USER_ME],
    queryFn: () => api.users.me.$get(),
  })

  const getAllLinksQuery = useQuery({
    queryKey: ['links'],
    queryFn: () => api.links.$get(),
    enabled: !!getUserQuery.data?.id && !!getUserQuery.data?.team
  })

  const createLinkMutation = useMutation({
    mutationFn: api.links.$post,
    onSuccess: async () => {
      setUrl('')
      await getAllLinksQuery.refetch()
    },
    onError: (error: IResponseError) => {
      toast({
        title: 'Uh oh! Shorten link error...',
        description: error?.response?.data?.message?.[0] ?? error?.response?.data?.message ?? 'Failed to shorten link. Please try again!',
        variant: 'destructive'
      })
    }
  })

  useEffect(() => {
    const team = getUserQuery?.data?.team
    if (team)
      localStorage.setItem(STORAGE_KEY_TEAM, team)
  }, [getUserQuery, getUserQuery?.data])

  const onSignOut = () => {
    localStorage.removeItem(STORAGE_KEY_TOKEN)
    return navigate({to: '/auth/sign-in'})
  }

  const onShortenUrl = ({url, title, description}: {
    url: string,
    title: string,
    description?: string
  }) => {
    createLinkMutation.mutate({
      body: {url, title, description: description ?? ''}
    })
  }

  return (
    <Page
      contentStyle="md:!max-w-[unset] w-full"
      renderHeader={() => (
        <div className="w-full flex justify-end items-center">
          <AccountDropdown username={`${getUserQuery.data?.firstName ?? '...'} ${getUserQuery.data?.lastName ?? ''}`}
                           onSignOut={onSignOut}/>
        </div>
      )}
    >
      <div className="w-full">
        <h1 className="font-raleway font-semibold text-2xl md:text-4xl text-center">Shorter links, with <span
          className="text-bright-orange">lnkc</span></h1>
        <p className="text-center font-raleway mt-2 tracking-wider md:tracking-wide">
          It’s much simpler to share a shorter link than a long, complicated one</p>
        <div className="w-full center">
          <div
            className="space-y-3 md:space-y-0 md:space-x-2 w-full py-4 mt-6 md:max-w-[550px] md:flex md:py-0"
          >
            <div className="flex-1">
              <Input
                placeholder="Drop your complicated URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <CreateLinkDialog url={url} setUrl={(url) => setUrl(url)} onCreate={onShortenUrl}/>
          </div>
        </div>
      </div>
      <section className="w-full my-6 flex flex-col justify-center items-center">
        <div className="w-full md:w-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {getAllLinksQuery.data?.map((link) => (
            <LinkCard key={link.id} {...link}/>
          ))}
        </div>
      </section>
      {/*{(getAllLinksQuery?.data?.length ?? 0) > 0 && (*/}
      {/*  <div>*/}
      {/*    <LinkPagination/>*/}
      {/*  </div>*/}
      {/*)}*/}
    </Page>
  )
}

export const Route = createFileRoute('/dashboard')({
  component: Dashboard
})