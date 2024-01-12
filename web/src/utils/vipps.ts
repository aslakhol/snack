import { useRouter } from "next/router";
import { type Product } from "./zod";
import { usePostHog } from "posthog-js/react";

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
    return `Snack-${products[0].slug.current}`;
  }

  return `Snack-${products.length}`;
};

export const usePayWithVipps = () => {
  const router = useRouter();
  const posthog = usePostHog();

  const pay = ({
    productsInCart,
    total,
    location,
  }: {
    productsInCart: Product[];
    total?: number;
    location: string;
  }) => {
    const vippsHref = getVippsLink(productsInCart, total);

    posthog.capture(
      "pay with vipps",
      {
        location,
        cartValue: total,
        emptyCart: productsInCart.length <= 0,
      },
      { send_instantly: true },
    );

    setTimeout(() => {
      void router.push(vippsHref);
    }, 200);
  };

  return { pay };
};
