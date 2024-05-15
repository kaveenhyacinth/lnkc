import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {PropsWithChildren} from "react";
import {Button} from "@/components/ui/button.tsx";

export interface AlertProps {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  hasDangerousAction?: boolean
  onConfirm?: () => void
}

export function Alert({
  children,
  title = 'Alert',
  description = 'Are you sure you want to continue?',
  confirmText = 'Yes',
  cancelText = 'No',
  hasDangerousAction,
  onConfirm,
}: PropsWithChildren<AlertProps>) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div>
          {children}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              className={hasDangerousAction ? 'bg-red-700 hover:bg-red-800' : ''}
              onClick={onConfirm}
            >
              {confirmText}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
