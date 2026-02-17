import { NextRequest, NextResponse } from "next/server";
import { TaskStore } from "@/services/store";
import { CreateTaskSchema } from "@/specs/schema";
import { z } from "zod";

export async function GET() {
    const tasks = await TaskStore.getAll();
    return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = CreateTaskSchema.parse(body);
        const newTask = await TaskStore.create(validatedData);
        return NextResponse.json(newTask, { status: 201 });
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
