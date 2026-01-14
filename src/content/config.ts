import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), // Usunęliśmy .max(70), żeby nie blokował Cię przy pisaniu
    description: z.string(), // Usunęliśmy .max(160)
    pubDate: z.date(),
    author: z.string().default('Raporty24'),
    image: z.string().optional(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };