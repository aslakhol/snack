import { type Product } from "./zod";

const PRODUCTS_KEY = "recentProducts";

export const storeRecent = (productsInCart: Product[]) => {
  const existing = JSON.parse(
    window.localStorage.getItem(PRODUCTS_KEY) ?? "[]",
  ) as string[];

  const fromCart = [
    ...productsInCart
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 3)
      .map((product) => product._id),
  ];

  const newRecent = [
    ...fromCart,
    ...existing.filter((id) => !fromCart.includes(id)),
  ];

  window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(newRecent));
};
