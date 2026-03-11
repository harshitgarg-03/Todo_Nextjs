import { createTodoSchema } from "@/validation/todo";
import { createTodoAction } from "@/actions/todoAction";
import { useTodoStore } from "@/store/todo-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const todoKeys = {
    all: ["todos"],
    lists: () => [...todoKeys, "list"]
}

export function useCreateTodo() {
    const queryClient = useQueryClient();

    const addTodo = useTodoStore((state) => state.addTodo);

    return useMutation({
        mutationFn: (data) => createTodoAction(data),
        onSuccess: (result) => {
            if(result.success){
                addTodo(result.data)

                queryClient.invalidateQueries({queryKey: todoKeys.list()})
            }
        }
    })
}