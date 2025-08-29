import { defineCollection, z } from 'astro:content';

// Define the SEO schema for type safety
const seoCollection = defineCollection({
  type: 'data',
  schema: z.object({
    meta: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      url: z.string().optional(),
      image: z.string().optional(),
      robots: z.string().optional(),
      author: z.string().optional(),
      publisher: z.string().optional(),
      keywords: z.string().optional(),
      ogType: z.string().optional(),
      siteName: z.string().optional(),
      twitterCard: z.string().optional(),
      twitterCreator: z.string().optional(),
      themeColor: z.string().optional(),
    }).optional(),
    schema: z.array(z.record(z.any())).optional(),
  }),
});

// Define pages collection for content
const pagesCollection = defineCollection({
  type: 'data',
  schema: z.object({
    hero: z.object({
      heading: z.string(),
      subheading: z.string().optional(),
      description: z.string().optional(),
    }),
  }),
});

// Export collections
export const collections = {
  seo: seoCollection,
  pages: pagesCollection,
};
