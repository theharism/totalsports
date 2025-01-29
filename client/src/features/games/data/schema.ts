import { z } from 'zod'

const gameSchema = z.object({
  _id: z.string().min(1, { message: 'Id is required' }),
  team_one: z.string().min(1, { message: 'Team one is required' }),
  team_two: z.string().min(1, { message: 'Team two is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  live_link: z.string().url({ message: 'Live link is required and must be a valid URL' }),
  important: z.boolean().default(false),
  link_highlight: z.string().default(''),
  date_range: z.boolean().default(false),
  starting_date: z.date().min(new Date(), { message: 'Starting date is required' }),
  starting_time: z.string().min(1, { message: 'Starting time is required' }),
  ending_date: z.date(),
  ending_time: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type Game = z.infer<typeof gameSchema>

export const gameListSchema = z.array(gameSchema)
