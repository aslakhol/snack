import Head from "next/head";

import { api } from "@/utils/api";
import { Button } from "../components/ui/button";
import { SearchAndFilter } from "../components/SearchAndFilter";
import { HowToPay } from "../components/HowToPay";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  console.log(hello.data);

  const products = [
    { key: 0, name: "Frydenlund 0,33", price: 40, category: "Beer" },
    { key: 1, name: "Frydenlund 0,5", price: 55, category: "Beer" },
    { key: 2, name: "Hansa 0,33", price: 40, category: "Beer" },
    { key: 3, name: "Hansa 0,5", price: 55, category: "Beer" },
  ];

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
      <div className="w-screen bg-slate-400">
        <main className="flex min-h-screen max-w-2xl flex-col items-center justify-start border-blue-50 bg-white">
          <SearchAndFilter />
          <HowToPay totalAmount={99} />
          <Button className="">Foo</Button>
        </main>
      </div>
    </>
  );
}
