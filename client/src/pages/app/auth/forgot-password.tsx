import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {validation} from "@/lib/validation.ts";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Page} from "@/components/templates/page.tsx";
import {createFileRoute} from "@tanstack/react-router";
import {useEffect, useState} from "react";

type ForgotPasswordForm = z.infer<typeof validation.forgotPassword>

export const ForgotPassword = () => {
  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(validation.forgotPassword),
    defaultValues: {
      email: "",
    }
  })

  const [hasSubmit, setHasSubmit] = useState(false)

  const onSubmit = (values: ForgotPasswordForm) => {
    console.log(values)
    setHasSubmit(true)
  }

  useEffect(() => {
    setHasSubmit(false)
  }, [])

  return (
    <Page>
      {!hasSubmit
        ?
        <>
          <h1 className="title md:text-center">
            Please enter your email here, we will send a <span className="text-bright-orange">reset link</span> to your
            inbox.
          </h1>
          <Form {...form}>
            <form className="space-y-3 w-full py-4 mt-6 md:max-w-[330px]" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="someone@nomail.com" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button className="w-full !mt-6 bg-bright-orange" type="submit">Get reset link</Button>
            </form>
          </Form>
        </>
        :
        <>
          <h1 className="title md:text-center">
            Please check your email inbox, we have sent you <span className="text-bright-orange">a link to reset</span> your password!
          </h1>
        </>
      }
    </Page>
  )
}

export const Route = createFileRoute('/app/auth/forgot-password')({
  component: ForgotPassword,
})