import Head from "next/head";

import { api } from "@/utils/api";
import { SearchAndFilter } from "../components/SearchAndFilter";
import { HowToPay } from "../components/HowToPay";
import { Products } from "../components/Products";

export type Product = {
  key: number;
  name: string;
  price: number;
  category: string;
  imageHref: string;
};

export default function Home() {
  const foo = api.products.getAll.useQuery();
  console.log(foo);

  const products: Product[] = [
    {
      key: 0,
      name: "Frydenlund 0,33",
      price: 40,
      category: "Beer",
      imageHref:
        "https://bilder.kolonial.no/local_products/0b4f0344-3a13-435a-b9ea-f181c4b52d13.jpg?auto=format&fit=max&w=752&s=26ce2125df70f5a6f24c06558b2c85a7",
    },
    {
      key: 1,
      name: "Frydenlund 0,5",
      price: 55,
      category: "Beer",
      imageHref:
        "https://bilder.kolonial.no/local_products/3495163d-0a16-4da1-baff-0664956feb36.jpg?auto=format&fit=max&w=752&s=32bdcc378f243f67443a8b732926ca2a",
    },
    {
      key: 2,
      name: "Hansa 0,33",
      price: 40,
      category: "Beer",
      imageHref:
        "https://bilder.kolonial.no/local_products/14dd930c-9b0f-4aa6-920a-620630339506.jpeg?auto=format&fit=max&w=376&s=896056a84df9c26db1ddc2809b495ac7",
    },
    {
      key: 3,
      name: "Hansa 0,5",
      price: 55,
      category: "Beer",
      imageHref:
        "https://bilder.kolonial.no/local_products/9a595b44-5b9e-4512-a8d0-0889516d6cf7.jpeg?auto=format&fit=max&w=376&s=aca2e8b6626a285ce08b772099b0a303",
    },
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
      <div className="w-screen">
        <main className="flex min-h-screen max-w-2xl flex-col items-center justify-start border-r ">
          <SearchAndFilter />
          <HowToPay totalAmount={99} />
          <Products products={products} />
        </main>
      </div>
    </>
  );
}
