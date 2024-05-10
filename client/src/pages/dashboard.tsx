import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {Page} from "@/components/templates/page.tsx";
import {AccountDropdown} from "@/components/organisms/account-dropdown.tsx";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from '@/components/ui/button';
import {LinkCard} from "@/components/molecules/link-card.tsx";
import {LinkPagination} from "@/components/organisms/link-pagination.tsx";

export const Dashboard = () => {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      url: ""
    }
  })

  const onSignOut = () => {
    console.log('Sign out')
    return navigate({to: '/auth/sign-in'})
  }

  return (
    <Page
      contentStyle="md:!max-w-[unset] w-full"
      renderHeader={() => (
        <div className="w-full flex justify-end items-center">
          <AccountDropdown onSignOut={onSignOut}/>
        </div>
      )}
    >
      <div className="w-full">
        <h1 className="font-raleway font-semibold text-2xl md:text-4xl text-center">Shorter links, with <span
          className="text-bright-orange">lnkc</span></h1>
        <p className="text-center font-raleway mt-2 tracking-wider md:tracking-wide">
          It’s much simpler to share a shorter link than a long, complicated one</p>
        <div className="w-full center">
          <Form {...form}>
            <form className="space-y-3 md:space-y-0 md:space-x-2 w-full py-4 mt-6 md:max-w-[550px] md:flex md:py-0">
              <FormField
                name="url"
                control={form.control}
                render={({field}) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Drop your complicated URL here..." {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button className="w-full md:w-auto !mt-3 md:!mt-0 bg-bright-orange" type="submit">Shorten</Button>
            </form>
          </Form>
        </div>
      </div>
      <section className="w-full my-6 flex flex-col justify-center items-center">
        <div className="w-full md:w-max grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({length: 12}).map((_, i) => (
            <LinkCard key={i}/>
          ))}
        </div>
      </section>
      <div>
        <LinkPagination/>
      </div>
    </Page>
  )
}

export const Route = createFileRoute('/dashboard')({
  component: Dashboard
})