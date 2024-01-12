import { Button } from "./ui/button";
import { usePayWithVipps } from "../utils/vipps";
import { type Product } from "../utils/zod";

type Props = { productsInCart: Product[]; total?: number };

export const HowToPay = ({ productsInCart, total }: Props) => {
  const { pay } = usePayWithVipps();

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
      <Button
        className="bg-[#ff5b24]"
        onClick={() => pay({ productsInCart, total, location: "how-to-pay" })}
      >
        Pay with Vipps
      </Button>
    </div>
  );
};
