"use server";

import dbConnection from "@/lib/database";
import { Todo } from "@/models/todo";
import { todoSchemsProp } from "@/type";
import { createTodoSchema } from "@/validation/todo";
import { revalidatePath } from "next/cache";

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
