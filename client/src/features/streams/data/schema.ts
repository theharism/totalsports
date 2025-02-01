import { z } from 'zod'

const populatedFieldSchema = z.object({
  _id: z.string().min(1, { message: 'Id is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  starting_date: z.coerce.date().min(new Date(), { message: 'Starting date is required' }),
  starting_time: z.string().min(1, { message: 'Starting time is required' }),
});

export type PopulatedField = z.infer<typeof populatedFieldSchema>

const streamSchema = z.object({
  _id: z.string().min(1, { message: 'Id is required' }),
  game: populatedFieldSchema,
  link: z.string().url({ message: 'Link is required and must be a valid URL' }),
  channel: z.string().min(1, { message: 'Channel is required' }),
  ads: z.number().positive().int().min(0, { message: 'Ads cannot be negative' }),
  language: z.string().min(1, { message: 'Language is required' }),
  quality: z.enum(['HD', 'SD']).default('HD'),
  mobile: z.enum(['Yes', 'No']).default('No'),
  nsfw: z.enum(['Yes', 'No']).default('No'),
  ad_block: z.enum(['Yes', 'No']).default('No'),
});

export type Stream = z.infer<typeof streamSchema>;

export const streamListSchema = z.array(streamSchema);
