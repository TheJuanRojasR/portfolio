import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    role: z.string(),
    team: z.string(),
    period: z.string(),
    status: z.string(),
    stack: z.array(z.string()),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    links: z.object({
      repo: z.string().url(),
      demo: z.string().url().nullable().optional(),
    }),
    order: z.number(),
    featured: z.boolean().default(true),
  }),
});

export const collections = { projects };
