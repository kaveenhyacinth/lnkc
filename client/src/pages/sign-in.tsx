import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {validation} from "@/lib/validation.ts";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Page} from "@/components/atoms/page.tsx";

type SignInForm = z.infer<typeof validation.signIn>

export const SignIn = () => {
  const form = useForm<SignInForm>({
    resolver: zodResolver(validation.signIn),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = (values: SignInForm) => {
    console.log(values)
  }

  return (
    <Page>
      <h1 className="title md:text-center">
        Login to <span className="text-bright-orange">create shorter links</span> and share them wherever you want.
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
          <Button className="w-full !mt-6 bg-bright-orange" type="submit">Sign in</Button>
        </form>
      </Form>
    </Page>
  )
}