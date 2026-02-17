"use client";

import { useQuery } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";
import TaskItem from "./TaskItem";
import { Task } from "@/types";
import { useState } from "react";
import clsx from "clsx";

interface TaskListProps {
    onEditTask: (task: Task) => void;
}

export default function TaskList({ onEditTask }: TaskListProps) {
    const [filter, setFilter] = useState<"all" | "todo" | "done">("all");

    const { data: tasks, isLoading, isError, error } = useQuery({
        queryKey: ["tasks"],
        queryFn: taskService.getAll,
    });

    const filteredTasks = tasks?.filter((task) => {
        if (filter === "all") return true;
        if (filter === "done") return task.status === "done";
        if (filter === "todo") return task.status !== "done";
        return true;
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse" />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                Error loading tasks: {(error as Error).message}
            </div>
        );
    }

    if (!tasks?.length) {
        return (
            <div className="text-center py-12 text-gray-500">
                No tasks found. Create one to get started!
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex space-x-2 border-b border-gray-200 pb-2">
                {(["all", "todo", "done"] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={clsx(
                            "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                            filter === f
                                ? "bg-indigo-100 text-indigo-700"
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        )}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredTasks?.map((task) => (
                    <TaskItem key={task.id} task={task} onEdit={onEditTask} />
                ))}
                {filteredTasks?.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                        No tasks match this filter.
                    </div>
                )}
            </div>
        </div>
    );
}
