import { type Dispatch, type SetStateAction } from "react";
import { api } from "../utils/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Props = {
  search: string;
  setSearch: (search: string) => void;
  selectedCategoryIds: string[];
  setSelectedCategoryIds?: Dispatch<SetStateAction<string[]>>;
};

export const SearchAndFilter = ({
  search,
  setSearch,
  selectedCategoryIds,
  setSelectedCategoryIds,
}: Props) => {
  const { data, isSuccess } = api.products.getCategories.useQuery();

  const toggleCategory = (id: string) => {
    if (!setSelectedCategoryIds) {
      return;
    }

    setSelectedCategoryIds((prev) => {
      const isSelected = prev.includes(id);

      if (!isSelected) {
        return [...prev, id];
      }
      return prev.filter((categoryId) => categoryId !== id);
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
                selectedCategoryIds.includes(category._id)
                  ? "secondary"
                  : "outline"
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
