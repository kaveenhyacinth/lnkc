import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {validation} from "@/lib/validation.ts";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Page} from "@/components/templates/page.tsx";
import {createFileRoute, Link, useNavigate} from "@tanstack/react-router";
import {useMutation} from "@tanstack/react-query";
import {api, IResponseError} from "../../../api";
import {STORAGE_KEY_TOKEN} from "@/lib/constants.ts";
import {useToast} from "@/components/ui/use-toast.ts";

type SignInForm = z.infer<typeof validation.signIn>

export const SignIn = () => {
  const form = useForm<SignInForm>({
    resolver: zodResolver(validation.signIn),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const navigate = useNavigate()
  const {toast} = useToast()

  const mutation = useMutation({
    mutationFn: api.auth.signin.$post,
    onSuccess: (data) => {
      localStorage.setItem(STORAGE_KEY_TOKEN, data.token)
      return navigate({to: '/dashboard'})
    },
    onError: (error: IResponseError) => {
      console.error('sign-in error', error?.response?.data)
      toast({
        title: 'Uh oh! Sign in error...',
        description: error?.response?.data?.message ?? 'Failed to login. Please try again!',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = (values: SignInForm) => {
    console.log(values)
    mutation.mutate({
      body: {
        email: values.email,
        password: values.password,
      }
    })
  }

  return (
    <Page>
      <h1 className="title md:text-center">
        Sign in to <span className="text-bright-orange">create shorter links</span> and share them wherever you want.
      </h1>
      <Form {...form}>
        <form className="space-y-3 w-full py-4 mt-6 md:max-w-[330px]" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="someone@nomail.com" {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Password" type="password" {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <p className="text-sm font-raleway underline text-right">
            <Link to="/auth/forgot-password" className="hover:text-light-white">
              Forgot password?
            </Link>
          </p>
          <Button className="w-full !mt-6 bg-bright-orange" type="submit">Sign in</Button>
        </form>
      </Form>
      <p className="text-sm font-raleway">Don't have an account? <Link to="/auth/sign-up"
                                                                       className="text-bright-orange hover:text-dark-orange">sign up</Link>
      </p>
    </Page>
  )
}

export const Route = createFileRoute('/auth/sign-in')({
  component: SignIn,
})