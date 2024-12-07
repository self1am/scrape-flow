import React from 'react'

function page() {
  return (
    <div className='flex-1 flex flex-col h-full '>
        <div className="flex justify-between">
            <div className="flex flex-col ">
                <h1 className="text-3xl font-bold">Workflows</h1>
                <p className="text-muted-foreground">Manage Your Workflows</p>
            </div>
        </div>

        <div className="h-full py-6">
            <Suspense fallback={<UserWorkflowsSkeleton />}>
                <UserWorkflows />
            </Suspense>
        </div>
    </div>
  )
}

export default page