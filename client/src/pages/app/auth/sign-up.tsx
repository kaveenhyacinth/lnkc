import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {validation} from "@/lib/validation.ts";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Page} from "@/components/templates/page.tsx";
import {createFileRoute, Link} from "@tanstack/react-router";

type SignUpForm = z.infer<typeof validation.signUp>

export const SignUp = () => {
  const form = useForm<SignUpForm>({
    resolver: zodResolver(validation.signIn),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit = (values: SignUpForm) => {
    console.log(values)
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
          <Button className="w-full !mt-6 bg-bright-orange" type="submit">Sign up</Button>
        </form>
      </Form>
      <p className="text-sm font-raleway">Already have an account? <Link to="/auth/sign-in" className="text-bright-orange hover:text-dark-orange">sign in</Link></p>
    </Page>
  )
}

export const Route = createFileRoute('/app/auth/sign-up')({
  component: SignUp,
})