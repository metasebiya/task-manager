import { CreateTaskInput, Task, UpdateTaskInput } from "@/types";

const API_URL = "/api/tasks";

export const taskService = {
    getAll: async (): Promise<Task[]> => {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
    },

    create: async (input: CreateTaskInput): Promise<Task> => {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });
        if (!res.ok) throw new Error("Failed to create task");
        return res.json();
    },

    update: async (id: string, input: UpdateTaskInput): Promise<Task> => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input),
        });
        if (!res.ok) throw new Error("Failed to update task");
        return res.json();
    },

    delete: async (id: string): Promise<void> => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete task");
    },
};
