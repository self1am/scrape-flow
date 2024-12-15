"use client";

import TooltipWrapper from '@/components/TooltipWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
    DropdownMenu, 
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
 } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { workflowStatus } from '@/types/workflow';
import { workflow } from '@prisma/client';
import { FileTextIcon, MoreVerticalIcon, PlayIcon, ShuffleIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'
import DeleteWorkflowDialog from './DeleteWorkflowDialog';

const statusColors = {
    [workflowStatus.PUBLISHED]: 'bg-yellow-400 text-yellow-600',
    [workflowStatus.DRAFT]: 'bg-primary',
};

function WorkflowCard({workflow} : {workflow : workflow}) {
    const isDraft = workflow.status === workflowStatus.DRAFT;
  return (
    <Card className='border border-separate shadow-sm rounded-lg overflow-hidden 
        hover:shadow-md dark:shadow-primary/20 cursor-pointer'>
            <CardContent className='p-4 flex items-center justify-between h-[100px]'>
                <div className='flex items-center justify-end space-x-3'>
                    <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center',
                        statusColors[workflow.status as workflowStatus]
                    )}>
                        {isDraft ? (
                            <FileTextIcon className='h-5 w-5' />
                         ) : (
                            <PlayIcon className='h-5 w-5 text-white'/>
                        )}
                    </div>
                    <div className="">
                        <h3 className="text-base font-bold text-muted-foreground flex items-center">
                            <Link href={`/workflow/editor/${workflow.id}`}>
                                {workflow.name}
                            </Link>
                            {isDraft &&
                            <span className="ml-2 px-2 text-sm text-gray-500 bg-yellow-100 rounded-full">Draft</span>
                            }
                        </h3>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Link href={`/workflow/editor/${workflow.id}`}
                        className={cn(
                            buttonVariants({
                                variant: 'outline',
                                size: 'sm',
                            }),
                            'flex items-center gap-2'
                        )}
                    >
                        <ShuffleIcon size={16} />
                        Edit
                    </Link>
                    <WorkflowActions workflowname={workflow.name} workflowId={workflow.id}/>
                </div>
            </CardContent>
    </Card>
  )
}

function WorkflowActions({workflowname, workflowId}: {workflowname: string, workflowId: string}) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return(
        <div>
            <DeleteWorkflowDialog 
                open={showDeleteDialog} 
                setOpen={setShowDeleteDialog} 
                workflowname={workflowname}
                workflowId={workflowId}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant={'outline'} size={'sm'}>
                        <TooltipWrapper content={'More Actions'}>
                            <div className="flex items-center justify-center w-full h-full">
                                <MoreVerticalIcon size={18} />
                            </div>
                        </TooltipWrapper>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='text-destructive flex items-center gap-2'
                        onSelect={() => {setShowDeleteDialog((prev) => !prev)}}
                    >
                        <TrashIcon size={16} />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default WorkflowCard;