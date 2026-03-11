"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createTodoSchema } from "@/validation/todo";
import { useCreateTodo } from "@/hooks/use-create-todo";
import { todoSchemsProp } from "@/type";
import { toast } from "sonner";
import z from "zod";

export type TodoFormType = z.infer<typeof createTodoSchema>;

export default function TodoForm() {
  const [isOpen, setIsOpen] = useState(false);
  const createTodoMutation = useCreateTodo();

  const form = useForm<TodoFormType>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      completed: false,
    },
  });

  const onSubmit = async (data: todoSchemsProp) => {
    try {
      const result = await createTodoMutation.mutateAsync(data);

      if (result.success) {
        toast.success("Todo created successfully");
        form.reset();
        setIsOpen(false);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      toast.error("Failed to create todo");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-lg space-y-6 border"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Add New Todo
        </h2>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            {...form.register("title")}
            placeholder="Enter todo title"
            className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...form.register("description")}
            rows={4}
            placeholder="Write todo description..."
            className="border border-gray-300 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Priority</label>
          <select
            {...form.register("priority")}
            className="border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        {/* Completed */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-md border">
          <input
            type="checkbox"
            {...form.register("completed")}
            className="h-4 w-4 accent-indigo-600"
          />
          <label className="text-sm text-gray-700 font-medium">
            Mark as completed
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={createTodoMutation.isPending}
          className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition shadow-sm disabled:opacity-60"
        >
          {createTodoMutation.isPending ? "Creating..." : "Create Todo"}
        </button>
      </form>
    </div>
  );
}