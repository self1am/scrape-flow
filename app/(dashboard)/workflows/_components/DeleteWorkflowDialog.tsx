"use client";

import { DeleteWorkflow } from '@/actions/workflows/deleteWorkflows';
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
import { Input } from '@/components/ui/input';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    workflowname: string;
    workflowId: string
}

function DeleteWorkflowDialog({open, setOpen, workflowname, workflowId} : Props) {
    const [confirmText, setConfirmText] = useState("");

    const deleteMutation = useMutation({
        mutationFn: DeleteWorkflow,
        onSuccess: () => {
            toast.success('Workflow deleted successfully', {id: workflowId});
            setConfirmText('');

        },
        onError: () => {
            toast.error('Something went wrong', {id: workflowId});
        },
    })

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>
                    Are you absolutely sure to delete?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action is irreversible.
                    <div className="flex flex-col py-4 gap-2">
                        <p className="">
                            If you are sure, enter <b>{workflowname}</b> to continue:
                        </p>
                        <Input
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                        />
                    </div>
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setConfirmText("")}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction disabled={confirmText !== workflowname || deleteMutation.isPending}
                        className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        onClick={(e) => {
                            e.stopPropagation;
                            toast.loading("Deleting workflow...", {id: workflowId});
                            deleteMutation.mutate(workflowId);
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteWorkflowDialog