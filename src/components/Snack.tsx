import { useCartContext } from "../CartProvider";
import { Cart } from "./Cart";
import { HowToPay } from "./HowToPay";
import { Products } from "./Products";
import { SearchAndFilter } from "./SearchAndFilter";
import { type Product } from "../utils/zod";

type Props = { products: Product[] };

export const Snack = ({ products }: Props) => {
  const { total, amountOfItemsInCart } = useCartContext();

  return (
    <>
      <SearchAndFilter />
      <HowToPay total={total} />
      <Products products={products} />
      {amountOfItemsInCart > 0 && <div className="py-6" />}
      <Cart />
    </>
  );
};
