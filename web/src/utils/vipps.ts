import { type Product } from "./zod";

export const getVippsLink = (products: Product[], total?: number) => {
  const amountPart = total && total > 0 ? `&a=${total * 100}` : "";

  const message = getMessage(products);

  const vippsHref = `https://qr.vipps.no/28/2/01/031/4747304656?v=1&m=${message}${amountPart}`;

  return vippsHref;
};

const getMessage = (products: Product[]) => {
  if (products.length === 0) {
    return "Snack";
  }

  if (products.length === 1 && products[0]) {
    return products[0].slug.current;
  }

  return `Snack: ${products.length}`;
};
