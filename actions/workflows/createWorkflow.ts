"use server";
import prisma from "@/lib/prisma";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { workflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createWorkflow(form: createWorkflowSchemaType) {
  try {
    const { success, data } = createWorkflowSchema.safeParse(form);
    if (!success) {
      console.error("Validation errors:", data.error);
      throw new Error("Invalid form data");
    }

    const { userId } = auth();
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const result = await prisma.workflow.create({
      data: {
        userId,
        name: data.name,
        // Provide a default description if not provided
        description: data.description || "",
        status: workflowStatus.DRAFT,
        // Ensure definition is provided as it's required
        definition: "TODO",
      },
    });

    if (!result) {
      throw new Error("Failed to create workflow");
    }
    
    redirect(`/workflow/editor/${result.id}`);
  } catch (error) {
    console.error("Workflow creation error:", error);
    throw error;
  }
}