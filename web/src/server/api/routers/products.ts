import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { productSchema, categorySchema } from "../../../utils/zod";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const query = `*[_type == "product" && available == true]{_id, name, price, slug, category->{_id, name, sortOrder}, image {
      asset->{
        ...,
        metadata
      }
    }
} | order(name asc)`;

    const result: unknown = await ctx.sanity.fetch(query);

    const data = z.array(productSchema).parse(result);

    return data;
  }),
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const query = `*[_type == "category"]{_id, name, sortOrder} | order(sortOrder asc)`;

    const result: unknown = await ctx.sanity.fetch(query);

    const data = z.array(categorySchema).parse(result);

    return data;
  }),
});
