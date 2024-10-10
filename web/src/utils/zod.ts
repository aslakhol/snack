import { z } from "zod";

export const categorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  sortOrder: z.number(),
});

export type Category = z.infer<typeof categorySchema>;

export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  slug: z.object({ current: z.string().optional() }),
  price: z.number(),
  category: categorySchema.nullable(),
  image: z
    .object({
      asset: z.object({
        url: z.string().url(),
        metadata: z.object({
          lqip: z.string(),
          dimensions: z.object({
            width: z.number(),
            height: z.number(),
            aspectRatio: z.number(),
          }),
        }),
      }),
    })
    .nullable(),
  quantity: z.number().default(0),
});

export type Product = z.infer<typeof productSchema>;
