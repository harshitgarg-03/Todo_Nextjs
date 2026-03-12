import { createTodoSchema } from "@/validation/todo";
import { createTodoAction, getTodoAction } from "@/actions/todoAction";
import { useTodoStore } from "@/store/todo-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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