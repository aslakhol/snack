import Head from "next/head";

import { api } from "@/utils/api";
import { Snack } from "../components/Snack";
import CartProvider from "../CartProvider";
import { SnackSkeleton } from "../components/SnackSkeleton";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "../server/api/root";
import { createInnerTRPCContext } from "../server/api/trpc";

export default function Home() {
  const { data, isLoading, isSuccess } = api.products.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Snack</title>
        <meta
          name="description"
          content="An app to keep track of snacks at the office"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className="w-screen">
        <main className="flex min-h-screen max-w-2xl flex-col items-center justify-start border-r ">
          {isLoading ? (
            <SnackSkeleton isLoading={true} />
          ) : (
            <>
              {!isSuccess ? (
                <SnackSkeleton isError={true} />
              ) : (
                <CartProvider productsFromApi={data}>
                  <Snack />
                </CartProvider>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({}),
    transformer: superjson,
  });

  await helpers.products.getAll.prefetch();
  await helpers.products.getCategories.prefetch();

  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
    revalidate: 60 * 15,
  };
}
