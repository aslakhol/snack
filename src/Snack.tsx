import { api } from "@/utils/api";
import { HowToPay } from "./components/HowToPay";
import { Products } from "./components/Products";
import { SearchAndFilter } from "./components/SearchAndFilter";

export const Snack = () => {
  const { data } = api.products.getAll.useQuery();

  return (
    <>
      <SearchAndFilter />
      <HowToPay totalAmount={99} />
      {data !== undefined && <Products products={data} />}
    </>
  );
};
