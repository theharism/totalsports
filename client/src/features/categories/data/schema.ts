import { z } from 'zod'

const categorySchema = z.object({
  _id: z.string().min(1, { message: 'Id is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  logo: z.string().min(1,{ message: 'Logo is required and must be a valid path' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Category = z.infer<typeof categorySchema>
export const categoriesListSchema = z.array(categorySchema)
