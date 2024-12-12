"use client";

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { workflowStatus } from '@/types/workflow';
import { workflow } from '@prisma/client';
import { FileTextIcon, PlayIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

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
                            <Link href={`/workflow/editor/{workflow.id}`}>
                                {workflow.name}
                            </Link>
                            {isDraft &&
                            <span className="ml-2 px-2 text-sm text-gray-500 bg-yellow-100 rounded-full">Draft</span>
                            }
                        </h3>
                    </div>
                </div>
            </CardContent>
    </Card>
  )
}

export default WorkflowCard;