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
import {useToast} from "@/components/ui/use-toast.ts";
import {Loader2} from "lucide-react";

type SignUpForm = z.infer<typeof validation.signUp>

export const SignUp = () => {
  const form = useForm<SignUpForm>({
    resolver: zodResolver(validation.signUp),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const navigate = useNavigate()
  const {toast} = useToast()

  const mutation = useMutation({
    mutationFn: api.auth.signup.$post,
    onSuccess: () => {
      return navigate({to: '/auth/sign-in'})
    },
    onError: (error: IResponseError) => {
      console.error('sign-up error', error?.response?.data)
      toast({
        title: 'Uh oh! Sign up error...',
        description: error?.response?.data?.message ?? 'Failed to sign up. Please try again!',
        variant: 'destructive'
      })
    }
  })

  const onSubmit = (values: SignUpForm) => {
    console.log(values)
    mutation.mutate({
      body: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      }
    })
  }

  return (
    <Page>
      <h1 className="title md:text-center">
        Create an account for <span className="text-bright-orange">making shorter links</span> instead of complicated
        URLs.
      </h1>
      <Form {...form}>
        <form className="space-y-3 w-full py-4 mt-6 md:max-w-[330px]" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({field}) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter first name" {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({field}) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Password" type="password" {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button className="w-full !mt-6 bg-bright-orange" type="submit" disabled={mutation.isPending}>
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            Sign up
          </Button>
        </form>
      </Form>
      <p className="text-sm font-raleway">Already have an account? <Link to="/auth/sign-in" className="text-bright-orange hover:text-dark-orange">sign in</Link></p>
    </Page>
  )
}

export const Route = createFileRoute('/auth/sign-up')({
  component: SignUp,
})