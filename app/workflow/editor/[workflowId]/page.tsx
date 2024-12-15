import { waitFor } from '@/lib/helper/waitFor';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react'

async function page({params}: {params: {workflowId: string}}) {
    const { workflowId } = params;
    const { userId } = auth();

    if(!userId){
        return(<div>Not authenticated. Sign In.</div>)
    }

    await waitFor(5000);

    const workflow = await prisma.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        },
    });

    if(!workflow){
      return(
        <div>Workflowm{workflowId} not found.</div>
      );
    }

  return (
    <>
      <pre>{JSON.stringify(workflow, null, 4)}</pre>
    </>
  )
}

export default page