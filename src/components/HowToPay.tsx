import Link from "next/link";
import { Button } from "./ui/button";
import { getVippsLink } from "../utils/vipps";

type Props = { total?: number };

export const HowToPay = ({ total }: Props) => {
  const vippsHref = getVippsLink(total);

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
