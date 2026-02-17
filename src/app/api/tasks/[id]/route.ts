import { NextRequest, NextResponse } from "next/server";
import { TaskStore } from "@/services/store";
import { UpdateTaskSchema } from "@/specs/schema";
import { z } from "zod";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const validatedData = UpdateTaskSchema.parse(body);

        const updatedTask = await TaskStore.update(id, validatedData);

        if (!updatedTask) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTask);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: (error as any).errors }, { status: 400 });
        }
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const success = await TaskStore.delete(id);

    if (!success) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
}
