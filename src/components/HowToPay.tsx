import Link from "next/link";
import { Button } from "./ui/button";

type Props = { totalAmount?: number };

export const HowToPay = ({ totalAmount }: Props) => {
  const amountPart = totalAmount ? `&a=${totalAmount * 100}` : "";

  const vippsHref = `https://qr.vipps.no/28/2/01/031/4747304656?v=1&m=hei${amountPart}`;

  return (
    <div className="flex flex-col gap-4 py-8">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Pay with Vipps to:
      </h3>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        +47 47 30 46 56
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
