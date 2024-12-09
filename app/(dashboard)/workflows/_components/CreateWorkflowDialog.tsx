"use client";

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import React, { useState } from 'react'

function CreateWorkflowDialog({triggerText} : {triggerText?: string}) {
    const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>{triggerText ?? "Create Workflow"}</Button>
        </DialogTrigger>
    </Dialog>
  )
}

export default CreateWorkflowDialog