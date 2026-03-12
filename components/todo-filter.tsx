"use client";

import { useTodoStore } from "@/store/todo-store";
import React from "react";

function TodoFilter() {
  const { filter, setFilter, completedCount, activeCount } = useTodoStore();

  const filters = [
    { key: "all", label: "All", count: activeCount() + completedCount() },
    { key: "active", label: "Active", count: activeCount() },
    { key: "completed", label: "Completed", count: completedCount() },
  ];

  return (
    <div className="max-w-xl mx-auto mt-6 flex justify-center gap-3">
      {filters.map((item) => (
        <button
          key={item.key}
          onClick={() => setFilter(item.key)}
          className={`px-4 py-2 rounded-md text-sm font-medium border transition
            ${
              filter === item.key
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }
          `}
        >
          {item.label}
          <span className="ml-2 text-xs opacity-80">({item.count})</span>
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
