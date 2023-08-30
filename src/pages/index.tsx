import Head from "next/head";

import { api } from "@/utils/api";
import { Button } from "../components/ui/button";
import { SearchAndFilter } from "../components/SearchAndFilter";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  console.log(hello.data);

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
        <main className="flex min-h-screen max-w-2xl flex-col items-center justify-between border-blue-50 bg-white">
          <SearchAndFilter />
          <Button>Foo</Button>
        </main>
      </div>
    </>
  );
}
