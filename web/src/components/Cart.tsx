import { useCartContext } from "../CartProvider";
import { Button } from "./ui/button";
import { getVippsLink } from "../utils/vipps";
import { useRouter } from "next/router";
import { usePostHog } from "posthog-js/react";

export const Cart = () => {
  const { total, amountOfItemsInCart, productsInCart } = useCartContext();
  const posthog = usePostHog();
  const router = useRouter();
  const vippsHref = getVippsLink(productsInCart, total);

  if (amountOfItemsInCart <= 0) {
    return null;
  }

  const payWithVipps = () => {
    posthog.capture(
      "pay with vipps",
      {
        location: "cart",
        cartValue: total,
        emptyCart: amountOfItemsInCart <= 0,
      },
      { send_instantly: true },
    );

    setTimeout(() => {
      void router.push(vippsHref);
    }, 200);
  };

  return (
    <div className="fixed bottom-0 flex w-full max-w-2xl flex-row items-center justify-between border-t bg-background px-4 py-4">
      <Button className="bg-[#ff5b24]" onClick={payWithVipps}>
        Pay with Vipps
      </Button>

      <p className="w-20 text-right text-lg font-semibold">kr {total}</p>
    </div>
  );
};
