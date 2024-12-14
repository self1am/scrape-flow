"use client";

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
} from '@/components/ui/alert-dialog';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

function DeleteWorkflowDialog({open, setOpen} : Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you absolutely sure to delete?
                </AlertDialogTitle>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkflowDialog