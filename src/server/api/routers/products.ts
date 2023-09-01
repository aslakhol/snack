import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { productSchema } from "../../../utils/zod";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const query = `*[_type == "product" && available == true]{_id, name, price, image {
      asset->{
        ...,
        metadata
      }
    }
}`;

    const result: unknown = await ctx.sanity.fetch(query);

    const data = z.array(productSchema).parse(result);

    return data;
  }),
});
