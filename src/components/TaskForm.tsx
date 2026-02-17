"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTaskSchema, TaskPrioritySchema, TaskStatusSchema } from "@/specs/schema";
import { CreateTaskInput, Task } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import clsx from "clsx";

interface TaskFormProps {
    onSuccess?: () => void;
    initialData?: Task;
    mode?: "create" | "edit";
}

export default function TaskForm({ onSuccess, initialData, mode = "create" }: TaskFormProps) {
    const queryClient = useQueryClient();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateTaskInput>({
        resolver: zodResolver(CreateTaskSchema),
        defaultValues: initialData || {
            status: "todo",
            priority: "medium",
        },
    });

    const createMutation = useMutation({
        mutationFn: taskService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            reset();
            onSuccess?.();
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: CreateTaskInput) => {
            if (!initialData?.id) throw new Error("Missing ID for update");
            return taskService.update(initialData.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            onSuccess?.();
        },
    });

    const onSubmit = (data: CreateTaskInput) => {
        if (mode === "create") {
            createMutation.mutate(data);
        } else {
            updateMutation.mutate(data);
        }
    };

    const isPending = createMutation.isPending || updateMutation.isPending;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    {...register("title")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    placeholder="Buy Groceries"
                />
                {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    {...register("description")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    placeholder="Detail description..."
                />
                {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        {...register("status")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    >
                        {TaskStatusSchema.options.map((status) => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>
                    {errors.status && (
                        <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                        {...register("priority")}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    >
                        {TaskPrioritySchema.options.map((priority) => (
                            <option key={priority} value={priority}>
                                {priority.charAt(0).toUpperCase() + priority.slice(1)}
                            </option>
                        ))}
                    </select>
                    {errors.priority && (
                        <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
                    )}
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className={clsx(
                    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white",
                    isPending ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700",
                    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                )}
            >
                {isPending ? "Saving..." : mode === "create" ? "Create Task" : "Update Task"}
            </button>

            {(createMutation.isError || updateMutation.isError) && (
                <p className="text-red-500 text-sm center">
                    Error: {createMutation.error?.message || updateMutation.error?.message}
                </p>
            )}
        </form>
    );
}
