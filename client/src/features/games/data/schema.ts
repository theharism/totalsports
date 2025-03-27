import { z } from 'zod'

const populatedFieldSchema = z.object({
  _id: z.string().min(1, { message: 'Id is required' }),
  name: z.string().min(1, { message: 'Name is required' })
});

export type PopulatedField = z.infer<typeof populatedFieldSchema>

const gameSchema = z.object({
  _id: z.string().min(1, { message: 'Id is required' }),
  team_one: populatedFieldSchema,
  team_two: populatedFieldSchema,
  category: populatedFieldSchema,
  name: z.string().min(1, { message: 'Name is required' }),
  slug: z.string().min(1, { message: 'Slug is required' }),
  important: z.boolean().default(false),
  date_range: z.boolean().default(false),
  starting_date: z.coerce.date(),
  starting_time: z.string().min(1, { message: 'Starting time is required' }),
  ending_date: z.coerce.date().optional(),	
  ending_time: z.string().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  status: z.enum(['Upcoming', 'Live', 'Finished']).default('Upcoming'),
});

export type Game = z.infer<typeof gameSchema>;

export const gameListSchema = z.array(gameSchema);
