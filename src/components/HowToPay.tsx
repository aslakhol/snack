import Link from "next/link";
import { Button } from "./ui/button";

type Props = { total?: number };

export const HowToPay = ({ total }: Props) => {
  const amountPart = total && total > 0 ? `&a=${total * 100}` : "";

  const vippsHref = `https://qr.vipps.no/28/2/01/031/4747304656?v=1&m=Snack${amountPart}`;

  return (
    <div className="flex flex-col gap-4 px-4 py-8">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Pay with Vipps to:
      </h3>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        +47 <div className="inline-block">47 30 46 56</div>
      </h1>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Or click here to go directly to Vipps
      </h3>
      <Button className="bg-[#ff5b24]" asChild>
        <Link href={vippsHref}>Pay with Vipps</Link>
      </Button>
    </div>
  );
};
