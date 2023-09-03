import Head from "next/head";

import { api } from "@/utils/api";
import { Snack } from "../Snack";
import { SnackSkeleton } from "../SnackSkeleton";
import CartProvider from "../CartProvider";

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
            <>{!isSuccess ? <SnackSkeleton isError={true} /> : <Snack />}</>
          )}
        </main>
      </div>
    </>
  );
}
