"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TaskRegistry } from '@/lib/wokflow/task/registry';
import { TaskType } from '@/types/task';
import { CoinsIcon, Ghost, GripVerticalIcon } from 'lucide-react';
import React from 'react'

function NodeHeader({taskType} : {taskType: TaskType}) {
    const task = TaskRegistry[taskType];
  return (
    <div className='flex items-center gap-2 p-2'>
        <task.icon size={16} />
        <div className="flex justify-between items-center w-full">
            <p className="text-xs font-bold uppercase text-muted-foreground">
                {task.name}
            </p>
            <div className="flex gap-1 items-center">
                {task.isEntryPoint && <Badge>Entry Point</Badge>}
                <Badge className='gap-2 flex items-center text-xs'>
                    <CoinsIcon size={16} />
                    TODO
                </Badge>
                <Button variant={'ghost'} size={'icon'} className='drag-handle cursor-grab'>
                    <GripVerticalIcon size={16} />
                    
                </Button> 
            </div>
        </div>
    </div>
  )
}

export default NodeHeader;