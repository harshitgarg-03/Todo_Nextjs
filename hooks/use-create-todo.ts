import { createTodoSchema } from "@/validation/todo";
import { createTodoAction, deleteAction, getTodoAction, toggleTodos } from "@/actions/todoAction";
import { useTodoStore } from "@/store/todo-store";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { todoSchemsProp } from "@/type";


export const todoKeys = {
    all: ["todos"],
    lists: () => [...todoKeys.all, "list"]
}

export function useCreateTodo() {
    const queryClient = useQueryClient();
    const addTodo = useTodoStore((state: any) => state.addTodo);

    return useMutation({
        mutationFn: (data: todoSchemsProp) => createTodoAction(data),
        onSuccess: (result) => {
            if(result.success){
                addTodo(result.data)

                queryClient.invalidateQueries({
                    queryKey: todoKeys.lists()
                })
            }
        }
    })
}

export function useTodos(){
    const setTodos = useTodoStore((state) => state.setTodos);

    return useQuery({
        queryKey: todoKeys.lists(),
        queryFn: async () => {
            const result = await getTodoAction();

            if(result.success){
                setTodos(result.data);
                return result.data;
            }

            throw new Error(result.Error);
        }
    })
}

export function useToggleTodo() {
    const queryClient = useQueryClient();
    const updateTodoInStore = useTodoStore(state => state.updateTodo);

    return useMutation ({
        mutationFn: (id) => toggleTodos(id),
        onSuccess: (result, id) => {
            if(result.success){
                updateTodoInStore(id, {completed: result.data.completed})
                queryClient.invalidateQueries({queryKey: todoKeys.lists()});
            }
        }
    })
}

export function useDeleteTodo() {
    const queryClient = useQueryClient()
    const removeTodo = useTodoStore(state => state.removeTodo)

    return useMutation({
        mutationFn: (id) => deleteAction(id),
        onSuccess: (result, id) => {
            if(result.success){
                removeTodo()
                queryClient.invalidateQueries({ queryKey: todoKeys.lists()})
            }
        }
    })
}