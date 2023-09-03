import { useCartContext } from "./CartProvider";
import { Cart } from "./components/Cart";
import { HowToPay } from "./components/HowToPay";
import { Products } from "./components/Products";
import { SearchAndFilter } from "./components/SearchAndFilter";
import { type Product } from "./utils/zod";

type Props = { products: Product[] };

export const Snack = ({ products }: Props) => {
  const { total } = useCartContext();

  return (
    <>
      <SearchAndFilter />
      <HowToPay totalAmount={99} />
      <Products products={products} />
      <Cart />
    </>
  );
};
