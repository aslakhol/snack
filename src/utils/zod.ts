import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  price: z.number(),
  // image: z.object({
  //   asset: z.object({
  //     url: z.string(),
  //   }),
  // }),
  available: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;
