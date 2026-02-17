import { z } from "zod";
import { CreateTaskSchema, TaskSchema, UpdateTaskSchema } from "../specs/schema";

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;
