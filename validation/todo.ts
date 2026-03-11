import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(1, "title must be contain one letter ")
    .max(100, "title can't be exceeded then 100 words")
    .trim(),
  description: z
    .string()
    .min(1, "description must be contain one letter ")
    .max(1000, "description can't be exceeded then 1000 words")
    .trim()
    .optional(),
  completed: z.boolean().default(false),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});
