import Link from "next/link";
import { Button } from "./ui/button";
import { getVippsLink } from "../utils/vipps";
import { type Product } from "../utils/zod";

type Props = { productsInCart: Product[]; total?: number };

export const HowToPay = ({ productsInCart, total }: Props) => {
  const vippsHref = getVippsLink(productsInCart, total);

  return (
    <div className="flex flex-col gap-3 px-4">
      <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Pay with Vipps to:
      </h1>
      <h2 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
        +47 <div className="inline-block">47 30 46 56</div>
      </h2>
      <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
        Or click here to go directly to Vipps
      </h3>
      <Button className="bg-[#ff5b24]" asChild>
        <Link
          href={vippsHref}
          data-ph-capture-attribute-cart-value={total}
          aria-label="Pay with Vipps in HowToPay"
        >
          Pay with Vipps
        </Link>
      </Button>
    </div>
  );
};
