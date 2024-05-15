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
import {ILink} from "../../../api/types.ts";
import EditIcon from "@/assets/svg/edit-icon.svg?react";
import {TrashIcon} from "lucide-react";
import {Alert} from "@/components/templates/alert.tsx";

type UpdateLinkForm = z.infer<typeof validation.createLink>

export interface UpdateLinkDialogProps {
  link: ILink
  onUpdate: (payload: Pick<ILink, 'title' | 'description' | 'id'>) => void
  onDelete: (linkId: string) => void
}

export const UpdateLinkDialog = ({link, onUpdate, onDelete}: UpdateLinkDialogProps) => {
  const form = useForm<UpdateLinkForm>({
    resolver: zodResolver(validation.createLink),
    defaultValues: {
      title: link.title,
      description: link.description,
    },
  })

  const [isOpen, setIsOpen] = useState(false)

  const onSubmit = (values: UpdateLinkForm) => {
    console.log(values)
    onUpdate({
      id: link.id,
      title: values.title,
      description: values.description ?? '',
    })
    form.reset()
    setIsOpen(false)
  }

  const onClose = () => {
    if (isOpen) {
      form.reset()
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <EditIcon className="action-icon" onClick={() => setIsOpen(true)} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Shortcode</DialogTitle>
          <DialogDescription>
            You can modify properties of {link.title}. Click Update when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <a
            className="text-md text-bright-blue font-semibold font-raleway cursor-pointer"
            href={`http://localhost:8080/${link.shortCode}`}
            target="_blank"
          >
            https://lnkc.xyz/{link.shortCode}
          </a>
        </div>
        <Form {...form}>
          <form className="space-y-3 w-full" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({field, }) => (
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
                <Input placeholder="https://..." value={link.url} disabled/>
              </FormControl>
            </FormItem>
            <div className="w-full !mt-6 flex justify-between items-center gap-3">
              <Button className="flex-1" type="submit">Update</Button>
              <Alert
                title="Delete Shortcode"
                description={`Are you sure you want to delete "${link.title}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                hasDangerousAction
                onConfirm={() => onDelete(link.id)}
              >
                <TrashIcon className="text-destructive cursor-pointer" />
              </Alert>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}