import { type Product } from "./zod";

const PRODUCTS_KEY = "recentProducts";

export const storeRecentIds = (productsInCart: Product[]) => {
  const existing = JSON.parse(
    window.localStorage.getItem(PRODUCTS_KEY) ?? "[]",
  ) as string[];

  const fromCart = [
    ...productsInCart
      .sort((a, b) => b.quantity - a.quantity)
      .map((product) => product._id),
  ];

  const newRecent = [
    ...fromCart,
    ...existing.filter((id) => !fromCart.includes(id)),
  ].slice(0, 3);

  window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(newRecent));
};

export const getRecentIds = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const existing = JSON.parse(
    window.localStorage.getItem(PRODUCTS_KEY) ?? "[]",
  ) as string[];

  return existing;
};
