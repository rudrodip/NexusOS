import * as z from "zod"

export const rankSchema = z.object({
  domain: z.string(),
  language: z.string(),
});
