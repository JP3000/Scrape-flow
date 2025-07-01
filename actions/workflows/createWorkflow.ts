"use server"

import prisma from "@/lib/prisma";
import { createWorkflowSchema, createWorkflowSchemaType } from "@/schema/workflow";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { redirect } from "next/navigation";

export default async function createWorkflow(form: createWorkflowSchemaType) {
    const {success, data} = createWorkflowSchema.safeParse(form);
    if (!success) {
        throw new Error("Invalid form data");
    }

    const { userId } = auth();

    if (!userId) {
        throw new Error("User not authenticated");
    }

    const result = await prisma.workflow.create({
        data: {
            userId,
            status:WorkflowStatus.DRAFT,
            definition:"TODO",
            ...data,
        },
    });

    if(!result) {
        throw new Error("Failed to create workflow");
    }

    redirect(`/workflows/editor/${result.id}`);
}