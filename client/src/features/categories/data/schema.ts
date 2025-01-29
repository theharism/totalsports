import { z } from 'zod'

const categorySchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  link: z.string().url({ message: 'Link is required and must be a valid URL' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Category = z.infer<typeof categorySchema>
export const categoriesListSchema = z.array(categorySchema)
