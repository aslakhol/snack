import { useCartContext } from "../CartProvider";
import { Cart } from "./Cart";
import { HowToPay } from "./HowToPay";
import { Products } from "./Products";
import { SearchAndFilter } from "./SearchAndFilter";
import { type Product } from "../utils/zod";
import { useState } from "react";

type Props = { products: Product[] };

export const Snack = ({ products }: Props) => {
  const { total, amountOfItemsInCart } = useCartContext();
  const [search, setSearch] = useState("");

  const filterProducts = (search: string) => {
    if (search === "") {
      return products;
    }

    return products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  };

  const productsToDisplay = filterProducts(search);

  return (
    <>
      <SearchAndFilter search={search} setSearch={setSearch} />
      <HowToPay total={total} />
      <Products products={productsToDisplay} />
      {amountOfItemsInCart > 0 && <div className="py-6" />}
      <Cart />
    </>
  );
};
