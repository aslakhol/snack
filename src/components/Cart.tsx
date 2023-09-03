import { useCartContext } from "../CartProvider";
import { type Product } from "../utils/zod";

export const Cart = () => {
  const { total } = useCartContext();
  return <>{total}</>;
};
