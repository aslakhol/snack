import React, {
  createContext,
  type ReactNode,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react";

import { type Product } from "./utils/zod";

type CartContextType = {
  products: Product[];
  productsInCart: Product[];
  total: number;
  amountOfItemsInCart: number;
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({
  children,
  productsFromApi,
}: {
  children: ReactNode;
  productsFromApi: Product[];
}) => {
  const [products, setProducts] = useState(productsFromApi);

  const addProduct = useCallback((productId: string) => {
    setProducts((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem._id !== productId) {
          return cartItem;
        }

        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
      });
    });
  }, []);

  const removeProduct = useCallback((productId: string) => {
    setProducts((prevCart) => {
      return prevCart.map((cartItem) => {
        if (cartItem._id !== productId || cartItem.quantity === 0) {
          return cartItem;
        }

        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        };
      });
    });
  }, []);

  const productsInCart: Product[] = useMemo(
    () =>
      products.filter((cartItem) => {
        return cartItem.quantity > 0;
      }),
    [products],
  );

  const total = useMemo(
    () =>
      productsInCart.reduce((acc, cartItem) => {
        return acc + cartItem.quantity * cartItem.price;
      }, 0),
    [productsInCart],
  );

  const amountOfItemsInCart = useMemo(
    () =>
      productsInCart.reduce((acc, cartItem) => {
        return acc + cartItem.quantity;
      }, 0),
    [productsInCart],
  );

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        productsInCart,
        total,
        amountOfItemsInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCartContext = () => {
  const context = useContext(CartContext)!;

  if (context === undefined) {
    throw Error("useCartContext must be used within CartProvider");
  }

  return context;
};
