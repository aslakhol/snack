import { HowToPay } from "./HowToPay";
import { SearchAndFilter } from "./SearchAndFilter";

type Props = { isLoading?: boolean; isError?: boolean };

export const SnackSkeleton = ({ isLoading, isError }: Props) => {
  return (
    <>
      <SearchAndFilter />
      <HowToPay />
      {isLoading && <>Loading...</>}
      {isError && <>Error...</>}
    </>
  );
};
