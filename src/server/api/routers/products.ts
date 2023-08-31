import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productsRouter = createTRPCRouter({
  getDocumentCount: publicProcedure.query(async ({ ctx }) => {
    const schema = z.number();

    const data = schema.parse(await ctx.sanity.fetch(`count(*)`));
    // data is guaranteed to be `number`, or zod will throw an error
    console.log(`Number of documents: ${data}`);

    return data;
  }),
});
