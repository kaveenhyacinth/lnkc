import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {validation} from "@/lib/validation.ts";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Page} from "@/components/templates/page.tsx";
import {createFileRoute, useNavigate} from "@tanstack/react-router";
import {MouseEvent, useEffect, useState} from "react";

type ResetPasswordForm = z.infer<typeof validation.resetPassword>

export const ResetPassword = () => {
  const navigate = useNavigate()

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(validation.resetPassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  })

  const [hasSubmit, setHasSubmit] = useState(false)

  const goToSignIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    return navigate({to: '/auth/sign-in'})
  }

  const onSubmit = (values: ResetPasswordForm) => {
    console.log(values)
    setHasSubmit(true)
  }

  useEffect(() => {
    setHasSubmit(true)
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
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Create new password" type="password" {...field}/>
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
                    <FormControl>
                      <Input placeholder="Confirm new password" type="password" {...field}/>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <Button className="w-full !mt-6 bg-bright-orange" type="submit">Reset</Button>
            </form>
          </Form>
        </>
        :
        <>
          <h1 className="title md:text-center">
            <span>Password has been reset!</span>
            <br />
            <span>Now it’s time to make some </span>
            <span className="text-bright-orange">
              shorter links
            </span>...
          </h1>
          <Button className="w-full !mt-6" onClick={goToSignIn}>Back to Sign in</Button>
        </>
      }
    </Page>
  )
}

export const Route = createFileRoute('/auth/reset-password')({
  component: ResetPassword
})