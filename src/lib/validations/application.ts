import * as z from "zod"

export const applicationPatchSchema = z.object({
  title: z.string(),
  content: z.string(),
})