"use client";

import CustomDialogHeader from '@/components/CustomDialogHeader';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { createWorkflowScema } from '@/schema/workflow';
import { Layers2Icon } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function CreateWorkflowDialog({triggerText} : {triggerText?: string}) {
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof createWorkflowScema>>({
        resolver: zodResolver(createWorkflowScema),
        defaultValues: {},
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button>{triggerText ?? "Create Workflow"}</Button>
        </DialogTrigger>
        <DialogContent className='px-0'>
            <CustomDialogHeader 
                icon={Layers2Icon}
                title="Create Workflow"
                subTitle="Start building your workflow"
            />
            <div className="p-6">
                <Form {...form}>
                    <form action="" className="space-y-8 w-full">
                        <FormField 
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex gap-1 items-center'>
                                        Workflow Name
                                        <p className="text-xs text-primary">(required)</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Choose a descriptive and unique name
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='flex gap-1 items-center'>
                                        Description
                                        <p className="text-xs text-muted-foreground">(optional)</p>
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea className='resize-none' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a brief explanation as to what this workflow does. 
                                        <br />
                                        Although optional, this can help you remember the workflow's purpose
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='w-full'>
                            Create
                        </Button>
                    </form>
                </Form>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default CreateWorkflowDialog;