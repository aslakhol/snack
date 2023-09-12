import { Refrigerator } from "lucide-react";
import { HowToPay } from "./HowToPay";
import { SearchAndFilter } from "./SearchAndFilter";
import useTimeout from "../utils/useSetTimeout";
import { useState } from "react";
import { cn } from "../lib/utils";

type Props = { isLoading?: boolean; isError?: boolean };

export const SnackSkeleton = ({ isLoading, isError }: Props) => {
  const [show, setShow] = useState(false);

  useTimeout(() => {
    setShow(true);
  }, 1500);

  return (
    <>
      <SearchAndFilter
        search=""
        setSearch={() => ""}
        selectedCategoryId={undefined}
      />
      <div className="py-12" />

      <HowToPay productsInCart={[]} />
      <div
        className={cn(
          "flex flex-1 items-center transition-opacity duration-300 ease-in-out",
          show ? "opacity-100" : "opacity-0",
        )}
      >
        {isLoading && (
          <Refrigerator className="animate-spin text-[#ff5b24]" size={64} />
        )}
        {isError && (
          <div className="flex max-w-sm flex-col gap-4">
            <p className="text-xl font-semibold">Something has gone wrong.</p>

            <p className="text-lg">
              You should probably refresh, or go talk to Aslak.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
