import { z } from "zod";

// Define the Zod schema for a Project
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.coerce.date(), // Use z.coerce.date() to handle Date objects
});

// Define a schema for creating a new Project
export const ProjectCreateSchema = ProjectSchema.omit({ id: true });

// Define a schema for an array of Projects
export const ProjectArraySchema = z.array(ProjectSchema);

// Define the TypeScript type based on the Zod schema
export type Project = z.infer<typeof ProjectSchema>;

// Define the TypeScript type for creating a Project
export type CreateProject = z.infer<typeof ProjectCreateSchema>;
