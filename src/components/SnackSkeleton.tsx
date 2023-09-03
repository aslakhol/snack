import { HowToPay } from "./HowToPay";
import { SearchAndFilter } from "./SearchAndFilter";

type Props = { isLoading?: boolean; isError?: boolean };

export const SnackSkeleton = ({ isLoading, isError }: Props) => {
  return (
    <>
      <SearchAndFilter search="" setSearch={() => ""} />
      <div className="py-12" />

      <HowToPay />
      {isLoading && <>Loading...</>}
      {isError && <>Error...</>}
    </>
  );
};
