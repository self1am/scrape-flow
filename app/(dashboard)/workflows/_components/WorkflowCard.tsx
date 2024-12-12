"use client";

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { workflowStatus } from '@/types/workflow';
import { workflow } from '@prisma/client';
import { FileTextIcon, PlayIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

const statusColors = {
    [workflowStatus.PUBLISHED]: 'text-gray-500',
    [workflowStatus.DRAFT]: 'text-orange-500',
};

function WorkflowCard({workflow} : {workflow : workflow}) {
    const isDraft = workflow.status === workflowStatus.DRAFT;
  return (
    <Card className='border border-separate shadow-sm rounded-1g overflow-hidden 
        hover:shadow-md dark:shadow-primary/30'>
            <CardContent className='p-4 flex items-center justify-between h-[100px]'>
                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center',
                    statusColors[workflow.status as workflowStatus]
                )}>
                    {isDraft ? (
                        <FileTextIcon className='h-5 w-5' />
                     ) : (
                        <PlayIcon className='h-5 w-5 text-green-500'/>
                    )}
                </div>
                <div className="">
                    <h3 className="text-base font-bold text-muted-foreground flex items-center">
                        <Link href={`workflow/editor/{workflow.id}`}></Link>
                    </h3>
                </div>
            </CardContent>
    </Card>
  )
}

export default WorkflowCard