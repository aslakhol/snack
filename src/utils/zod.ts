import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
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
