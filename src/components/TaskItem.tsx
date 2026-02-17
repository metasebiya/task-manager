import { Task } from "@/types";
import { CheckCircle, Circle, Trash2, Edit2 } from "lucide-react";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { taskService } from "@/services/task.service";

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
}

const statusColors = {
    todo: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    done: "bg-green-100 text-green-800",
};

const priorityColors = {
    low: "bg-gray-100 text-gray-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
};

export default function TaskItem({ task, onEdit }: TaskItemProps) {
    const queryClient = useQueryClient();

    // Optimistic update for status toggle could be complex, for now using simple invalidation
    // or simple mutation
    const updateMutation = useMutation({
        mutationFn: (newStatus: Task["status"]) =>
            taskService.update(task.id, { status: newStatus }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: () => taskService.delete(task.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
        }
    });

    const toggleStatus = () => {
        const nextStatus = task.status === "done" ? "todo" : "done";
        updateMutation.mutate(nextStatus);
    };

    return (
        <div className="flex items-start justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-3">
                <button
                    onClick={toggleStatus}
                    className="mt-1 focus:outline-none"
                    disabled={updateMutation.isPending}
                >
                    {task.status === "done" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                        <Circle className="w-5 h-5 text-gray-400" />
                    )}
                </button>
                <div>
                    <h3
                        className={clsx(
                            "text-lg font-medium text-gray-900",
                            task.status === "done" && "line-through text-gray-500"
                        )}
                    >
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="mt-1 text-sm text-gray-500">{task.description}</p>
                    )}
                    <div className="mt-2 flex space-x-2">
                        <span
                            className={clsx(
                                "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                                statusColors[task.status]
                            )}
                        >
                            {task.status}
                        </span>
                        <span
                            className={clsx(
                                "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                                priorityColors[task.priority]
                            )}
                        >
                            {task.priority}
                        </span>
                        <span className="text-xs text-gray-400 self-center">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={() => onEdit(task)}
                    className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-indigo-50"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
                <button
                    onClick={() => {
                        if (confirm("Are you sure?")) deleteMutation.mutate();
                    }}
                    disabled={deleteMutation.isPending}
                    className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
