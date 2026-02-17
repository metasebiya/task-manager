import { Task, CreateTaskInput, UpdateTaskInput } from "@/types";

// In-memory store using a global variable to persist across hot reloads in dev
const globalForStore = global as unknown as { tasks: Task[] };

const tasks: Task[] = globalForStore.tasks || [];

if (process.env.NODE_ENV !== "production") globalForStore.tasks = tasks;

const DELAY_MS = 500;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const TaskStore = {
    getAll: async (): Promise<Task[]> => {
        await delay(DELAY_MS);
        return [...tasks];
    },

    getById: async (id: string): Promise<Task | undefined> => {
        await delay(DELAY_MS);
        return tasks.find((t) => t.id === id);
    },

    create: async (input: CreateTaskInput): Promise<Task> => {
        await delay(DELAY_MS);
        const newTask: Task = {
            ...input,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        tasks.push(newTask);
        return newTask;
    },

    update: async (id: string, input: UpdateTaskInput): Promise<Task | null> => {
        await delay(DELAY_MS);
        const index = tasks.findIndex((t) => t.id === id);
        if (index === -1) return null;

        const updatedTask = {
            ...tasks[index],
            ...input,
            updatedAt: new Date().toISOString(),
        };
        tasks[index] = updatedTask;
        return updatedTask;
    },

    delete: async (id: string): Promise<boolean> => {
        await delay(DELAY_MS);
        const index = tasks.findIndex((t) => t.id === id);
        if (index === -1) return false;

        tasks.splice(index, 1);
        return true;
    },
};
