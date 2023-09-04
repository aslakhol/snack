import { useCartContext } from "../CartProvider";
import { Cart } from "./Cart";
import { HowToPay } from "./HowToPay";
import { Products } from "./Products";
import { RequestLink } from "./RequestLink";
import { SearchAndFilter } from "./SearchAndFilter";
import { useState } from "react";

export const Snack = () => {
  const { total, amountOfItemsInCart, products } = useCartContext();
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
      <div className="py-12" />
      <HowToPay total={total} />
      <Products products={productsToDisplay} />
      <RequestLink />
      {amountOfItemsInCart > 0 && <div className="py-6" />}
      <Cart />
    </>
  );
};
