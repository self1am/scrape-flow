"use client"
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'

function NodeCard({
    children,
    nodeId,
    isSelected,
}:
{
    children: ReactNode;
    nodeId: string;
    isSelected: boolean;
}) {
  return (
    <div className={cn(
        "rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs flex flex-col gap-1",
        isSelected && 'border-primary')}>
            {children}
    </div>
  )
}

export default NodeCard;