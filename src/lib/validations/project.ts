import * as z from "zod"

export const projectPatchSchema = z.object({
  frameworks: z.array(z.string()),
  categories: z.array(z.string()),
  image_url: z.string().url().optional(),
  tags: z.array(z.string()),
  url: z.string().url().optional(),
  repo_url: z.string().url(),
})