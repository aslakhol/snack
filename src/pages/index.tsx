import Head from "next/head";

import { api } from "@/utils/api";
import { SearchAndFilter } from "../components/SearchAndFilter";
import { HowToPay } from "../components/HowToPay";
import { Products } from "../components/Products";

export default function Home() {
  const { data } = api.products.getAll.useQuery();

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
          <SearchAndFilter />
          <HowToPay totalAmount={99} />
          {data !== undefined && <Products products={data} />}
        </main>
      </div>
    </>
  );
}
