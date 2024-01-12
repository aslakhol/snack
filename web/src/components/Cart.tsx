import { useCartContext } from "../CartProvider";
import { Button } from "./ui/button";
import { usePayWithVipps } from "../utils/vipps";

export const Cart = () => {
  const { total, amountOfItemsInCart, productsInCart } = useCartContext();
  const { pay } = usePayWithVipps();

  if (amountOfItemsInCart <= 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 flex w-full max-w-2xl flex-row items-center justify-between border-t bg-background px-4 py-4">
      <Button
        className="bg-[#ff5b24]"
        onClick={() => pay({ productsInCart, total, location: "cart" })}
      >
        Pay with Vipps
      </Button>

      <p className="w-20 text-right text-lg font-semibold">kr {total}</p>
    </div>
  );
};
