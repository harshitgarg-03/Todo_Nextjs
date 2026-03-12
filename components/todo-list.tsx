"use client"

import React from 'react'
import { useTodos } from '@/hooks/use-create-todo';
import { useTodoStore } from '@/store/todo-store';

function GetTodoList() {
    const {data: todos, isLoading, error} = useTodos();

    if(isLoading){
        return (
            <div>fetching docs </div>
        )
    }

    if(error) {
        return (
            <div>error </div>
        )
    }
  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">All Todos</h2>

      {todos.length === 0 && (
        <div className="text-gray-500 text-center py-10 border rounded-lg">
          No todos yet
        </div>
      )}

      {todos.map((todo) => (
        <div
          key={todo.id}
          className="border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {todo.title}
            </h3>

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

          {todo.description && (
            <p className="text-gray-600 text-sm mb-3">
              {todo.description}
            </p>
          )}

          <div className="flex justify-between items-center">
            <span
              className={`text-sm font-medium ${
                todo.completed
                  ? "text-green-600"
                  : "text-gray-500"
              }`}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>

            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetTodoList