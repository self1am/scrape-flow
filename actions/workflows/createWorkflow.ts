"use server";

import { createWorkflowScema } from "@/schema/workflow";

export async function createWorkflow(
    form: z.infer<typeof createWorkflowScema>
) {};