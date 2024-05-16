import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {validation} from "@/lib/validation.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {PlusIcon} from "lucide-react";

type CreateLinkForm = z.infer<typeof validation.createLink>

export interface CreateLinkDialogProps {
  url: string
  setUrl: (url: string) => void
  isFloating?: boolean
  onCreate: (payload: { url: string, title: string, description?: string }) => void
}

export const CreateLinkDialog = ({url, setUrl, isFloating, onCreate}: CreateLinkDialogProps) => {
  const form = useForm<CreateLinkForm>({
    resolver: zodResolver(validation.createLink),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = (values: CreateLinkForm) => {
    onCreate({...values, url})
    form.reset()
    setIsOpen(false)
  }

  const onClose = () => {
    if(isOpen) {
      form.reset()
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        {isFloating ? (
          <Button className="w-[60px] h-[60px] fixed right-6 bottom-6 rounded-full" onClick={() => setIsOpen(true)}>
            <PlusIcon className="w-6 h-6"/>
          </Button>
        ) : (
          <Button className="w-full md:w-auto" onClick={() => setIsOpen(true)}>Shorten</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a shortcode</DialogTitle>
          <DialogDescription>
            Please add a title and an optional description for your shortcode. Click Create when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3 w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter title here..." {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter description here..." {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input placeholder="https://..." value={url} onChange={(e) => setUrl(e.target.value)}/>
              </FormControl>
            </FormItem>
            <Button className="w-full !mt-6" type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}