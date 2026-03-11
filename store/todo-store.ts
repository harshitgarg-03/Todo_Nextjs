import { todoSchemsProp } from "@/type";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTodoStore = create(
  devtools((set, get) => ({
    todos: [],
    filter: "all",
    isLoading: false,

    setTodos: (todos: todoSchemsProp) => set({ todos }),

    addTodo: (todo: todoSchemsProp) =>
      set((state) => ({
        todos: [todo, ...state.todo],
      })),

    setFilter: (filter: string) => set({ filter }),
    setLoading: (isLoading: string) => set({ isLoading }),
  }), {name: "todo-store"}),
);
