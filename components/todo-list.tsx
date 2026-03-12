"use client";

import React, { useState } from "react";
import {
  useDeleteTodo,
  useTodos,
  useToggleTodo,
} from "@/hooks/use-create-todo";
import { toast } from "sonner";
import { Delete } from "lucide-react";

function GetTodoList() {
  const { data: todos, isLoading, error } = useTodos();
  const toggleMutation = useToggleTodo();
  const deletMutation = useDeleteTodo();

  const handleDelete = async (id: string) => {
    try {
      const result = await deletMutation.mutateAsync(id);
      if(result.success) {
        toast.success(result.error || "Error deleting todo");
      } 
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const result = await toggleMutation.mutateAsync(id);

      if (!result.success) {
        toast.error(result.error || "Error updating todo");
      }
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-10">Fetching todos...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">Error loading todos</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">All Todos</h2>

      {todos?.length === 0 && (
        <div className="text-gray-500 text-center py-10 border rounded-lg">
          No todos yet
        </div>
      )}

      {todos?.map((todo) => (
        <div
          key={todo._id}
          className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-start mb-2">
            {/* LEFT SECTION */}
            <div className="flex items-start gap-3">
              {/* Checkbox */}
              <input
                type="checkbox"
                onChange={() => handleToggle(todo._id)}
                checked={todo.completed}
                disabled={todo.completed || toggleMutation.isPending}
                className="mt-1 h-4 w-4 accent-indigo-600"
              />

              {/* Title + Description */}
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {todo.title}
                </h3>

                {todo.description && (
                  <p className="text-gray-600 text-sm mt-1">
                    {todo.description}
                  </p>
                )}
              </div>
            </div>

            {/* Priority badge */}
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${
                todo.priority === "high"
                  ? "bg-red-100 text-red-600"
                  : todo.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
              }`}
            >
              {todo.priority}
            </span>
          </div>

          {/* Bottom section */}
          <div className="flex justify-between items-center mt-3">
            <span
              className={`text-sm font-medium ${
                todo.completed ? "text-green-600" : "text-gray-500"
              }`}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>

            <button className="text-sm text-red-600 hover:text-red-800 font-medium"
            onClick={() => handleDelete(todo._id)}
            disabled={deletMutation.isPending}
            >
              <Delete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetTodoList;
