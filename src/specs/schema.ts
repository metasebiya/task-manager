import { z } from "zod";

export const TaskStatusSchema = z.enum(["todo", "in-progress", "done"]);
export const TaskPrioritySchema = z.enum(["low", "medium", "high"]);

export const TaskSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(3).max(100),
    description: z.string().optional(),
    status: TaskStatusSchema,
    priority: TaskPrioritySchema,
    createdAt: z.string().datetime(), // ISO Date string
    updatedAt: z.string().datetime(), // ISO Date string
});

export const CreateTaskSchema = TaskSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const UpdateTaskSchema = CreateTaskSchema.partial();
