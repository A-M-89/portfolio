// schemas.ts
import { z } from 'zod';

// Define a schema for a single project
export const projectSchema = z.object({
  id: z.number(), // assuming id is a number
  title: z.string().min(1, "Title is required"), // title is required and must be a non-empty string
  description: z.string().min(1, "Description is required"), // description is required and must be a non-empty string
  createdAt: z.string().optional(), // createdAt is optional; can be a string
  category: z.string().min(1, "Category is required"), // category is required and must be a non-empty string
});

// You can export the type as well for TypeScript
export type Project = z.infer<typeof projectSchema>;
