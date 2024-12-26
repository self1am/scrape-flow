import { CreateWorkflowNode } from '@/lib/wokflow/CreateWorkflowNode';
import { TaskType } from '@/types/task';
import { workflow } from '@prisma/client'
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react'
import "@xyflow/react/dist/style.css"
import NodeComponent from './nodes/NodeComponent';

const nodeTypes = {
  FlowScrapeNode: NodeComponent,

}

function FlowEditor({workflow}: {workflow: workflow}) {
    const [nodes, setNodes, onNodesChange] = useNodesState([
      CreateWorkflowNode(TaskType.LAUNCH_BROWSER),
    ]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  return (
    <main className="h-full w-full">
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
        >
            <Controls position='top-left' />
            <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
    </main>
  )
}



export default FlowEditor