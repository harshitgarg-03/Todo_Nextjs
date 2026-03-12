"use server";

import dbConnection from "@/lib/database";
import { Todo } from "@/models/todo";
import { todoSchemsProp } from "@/type";
import { createTodoSchema } from "@/validation/todo";
import { revalidatePath } from "next/cache";
import { success } from "zod";

export const createTodoAction = async (data: todoSchemsProp) => {
  const validatedata = createTodoSchema.parse(data);
  if (!validatedata) {
    return Response.json({
      success: false,
      message: "error to valiadte todos.!",
      status: 404,
    });
  }
  await dbConnection();
  try {
    const Receivedata = await Todo.create(validatedata);
    console.log("Receivedata is :", Receivedata);

    revalidatePath("/");

    return Response.json({
      success: true,
      message: "success to make todo",
      status: 200,
    });
  } catch (error: any) {
    console.log("error is ", error);
    return Response.json({
      success: false,
      message: "error to make todo",
      status: 404,
    });
  }
};

export const getTodoAction = async () => {
  try {
    await dbConnection();

    const todos = await Todo.find({}).sort({ createdAt: -1 }).lean();
    revalidatePath("/");
    return {
      success: true,
      message: "todo fetched success ",
      data: JSON.parse(JSON.stringify(todos)),
    };
  } catch (error) {
    return Response.json({
      success: false,
      message: "error to fetch todo",
      status: 404,
    });
  }
};

export const toggleTodos = async (id) => {
  try {
    await dbConnection();

    const todo = await Todo.findById(id);

    if (!todo) {
      return {
        success: false,
        error: "Todo not found!",
      };
    }

    todo.completed = !todo.completed;

    await todo.save();

    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.log("error to toggle todo");

    return {
      success: false,
      error: error,
    };
  }
};

export const deleteAction = async (id) => {
  await dbConnection();
  try {
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return {
        success: false,
        error: "Todo not found!",
      };
    }

    revalidatePath("/");

    return {
      success: true,
      deletedData: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.log("error to delete todo");

    return {
      success: false,
      error: error,
    };
  }
};
