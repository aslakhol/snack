import { useCartContext } from "../CartProvider";
import { Button } from "./ui/button";
import Link from "next/link";
import { getVippsLink } from "../utils/vipps";

export const Cart = () => {
  const { total, amountOfItemsInCart } = useCartContext();

  const vippsHref = getVippsLink(total);

  if (amountOfItemsInCart <= 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 flex w-full max-w-2xl flex-row items-center justify-between border-t bg-background px-4 py-4">
      {/* <Button variant="outline" size="icon">
        <ShoppingCart />
      </Button> */}

      <Button className="bg-[#ff5b24]" asChild>
        <Link href={vippsHref}>Pay with Vipps</Link>
      </Button>

      <p className="w-20 text-right text-lg font-semibold">kr {total}</p>
    </div>
  );
};
