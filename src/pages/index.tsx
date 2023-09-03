import Head from "next/head";

import { api } from "@/utils/api";
import { Snack } from "../components/Snack";
import CartProvider from "../CartProvider";
import { SnackSkeleton } from "../components/SnackSkeleton";

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
