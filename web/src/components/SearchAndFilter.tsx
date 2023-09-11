import { type Dispatch, type SetStateAction } from "react";
import { api } from "../utils/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  selectedCategoryId: string | undefined;
  setSelectedCategoryId?: Dispatch<SetStateAction<string | undefined>>;
};

export const SearchAndFilter = ({
  search,
  setSearch,
  selectedCategoryId,
  setSelectedCategoryId,
}: Props) => {
  const { data, isSuccess } = api.products.getCategories.useQuery();

  const toggleCategory = (id: string) => {
    if (!setSelectedCategoryId) {
      return;
    }

    setSelectedCategoryId((prev) => {
      if (prev === id) {
        return undefined;
      }
      return id;
    });
  };

  return (
    <div className="fixed top-0 w-full max-w-2xl border-b bg-background px-4 pb-2 pt-4">
      <Input
        placeholder="Search for a product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-row gap-2 pt-2">
        {isSuccess &&
          data.map((category) => (
            <Button
              key={category._id}
              variant={
                selectedCategoryId === category._id ? "secondary" : "outline"
              }
              size={"sm"}
              onClick={() => toggleCategory(category._id)}
            >
              {category.name}
            </Button>
          ))}
      </div>
    </div>
  );
};
