import { Refrigerator } from "lucide-react";
import { HowToPay } from "./HowToPay";
import { SearchAndFilter } from "./SearchAndFilter";

type Props = { isLoading?: boolean; isError?: boolean };

export const SnackSkeleton = ({ isLoading, isError }: Props) => {
  return (
    <>
      <SearchAndFilter search="" setSearch={() => ""} />
      <div className="py-12" />

      <HowToPay />
      <div className="flex flex-1 items-center">
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
