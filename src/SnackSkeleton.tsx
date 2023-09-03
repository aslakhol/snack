import { HowToPay } from "./components/HowToPay";
import { SearchAndFilter } from "./components/SearchAndFilter";

type Props = { isLoading?: boolean; isError?: boolean };

export const SnackSkeleton = ({ isLoading, isError }: Props) => {
  return (
    <>
      <SearchAndFilter />
      <HowToPay totalAmount={99} />
      {isLoading && <>Loading...</>}
      {isError && <>Error...</>}
    </>
  );
};
