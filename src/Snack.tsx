import { useCartContext } from "./CartProvider";
import { HowToPay } from "./components/HowToPay";
import { Products } from "./components/Products";
import { SearchAndFilter } from "./components/SearchAndFilter";
import { type Product } from "./utils/zod";

type Props = { products: Product[] };

export const Snack = ({ products }: Props) => {
  const { total } = useCartContext();

  console.log(total);

  return (
    <>
      <SearchAndFilter />
      <HowToPay totalAmount={99} />
      <Products products={products} />
    </>
  );
};
