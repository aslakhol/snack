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
  const { total, amountOfItemsInCart, products } = useCartContext();
  const [search, setSearch] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

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
    if (selectedCategoryIds.length === 0) {
      return product;
    }

    return selectedCategoryIds.includes(product.category._id);
  };

  const productsToDisplay = filterProducts();

  return (
    <>
      <SearchAndFilter
        search={search}
        setSearch={setSearch}
        selectedCategoryIds={selectedCategoryIds}
        setSelectedCategoryIds={setSelectedCategoryIds}
      />
      <div className="py-16" />
      <HowToPay total={total} />
      <Products products={productsToDisplay} />
      <RequestLink />
      <div className={cn(amountOfItemsInCart ? "py-12" : "py-6")} />
      <Cart />
    </>
  );
};
