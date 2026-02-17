"use client";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Task } from "@/types";
import { useState } from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";

export default function Home() {
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSuccess = () => {
    setIsFormOpen(false);
    setEditingTask(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
          <button
            onClick={() => {
              setEditingTask(undefined);
              setIsFormOpen(!isFormOpen);
            }}
            className={clsx(
              "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
              isFormOpen
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            )}
          >
            {isFormOpen ? "Cancel" : "New Task"}
            {!isFormOpen && <Plus className="ml-2 -mr-1 h-5 w-5" />}
          </button>
        </div>

        <div className="space-y-8">
          {isFormOpen && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {editingTask ? "Edit Task" : "Create New Task"}
              </h2>
              <TaskForm
                initialData={editingTask}
                mode={editingTask ? "edit" : "create"}
                onSuccess={handleSuccess}
              />
            </div>
          )}

          <div>
            {!isFormOpen && <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h2>}
            <TaskList onEditTask={handleEdit} />
          </div>
        </div>
      </div>
    </div>
  );
}
