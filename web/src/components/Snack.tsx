import { useCartContext } from "../CartProvider";
import { cn } from "../lib/utils";
import { type Product } from "../utils/zod";
import { Cart } from "./Cart";
import { HowToPay } from "./HowToPay";
import { Products } from "./Products";
import { RequestLink } from "./RequestLink";
import { SearchAndFilter } from "./SearchAndFilter";
import { useState } from "react";

export const Snack = () => {
  const { total, amountOfItemsInCart, products, productsInCart } =
    useCartContext();
  const [search, setSearch] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>();

  const filterProducts = () => {
    return products.filter(filterCategory).filter(filterSearch);
  };

  const filterSearch = (product: Product) => {
    if (search === "") {
      return product;
    }

    return product.name.toLowerCase().includes(search.toLowerCase());
  };

  const filterCategory = (product: Product) => {
    if (!selectedCategoryId) {
      return product;
    }

    return selectedCategoryId === product.category._id;
  };

  const productsToDisplay = filterProducts();

  return (
    <>
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      />
      <div className="py-16" />
      <HowToPay total={total} productsInCart={productsInCart} />
      <Products products={productsToDisplay} />
      <RequestLink />
      <div className={cn(amountOfItemsInCart ? "py-12" : "py-6")} />
      <Cart />
    </>
  );
};
