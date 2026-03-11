import { todoSchemsProp } from "@/type";
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema<todoSchemsProp>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "title can't exceed more than 100 words"],
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: [2000, "description can't exceed more than 2000 words"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true },
);

export const Todo = mongoose.models.Todo || mongoose.model("Todo", todoSchema);
