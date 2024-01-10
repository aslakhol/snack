import { type Dispatch, type SetStateAction } from "react";
import { api } from "../utils/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import { usePostHog } from "posthog-js/react";
import { type Category } from "../utils/zod";

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
  const { data } = api.products.getCategories.useQuery();
  const { data: productsData } = api.products.getAll.useQuery();
  const posthog = usePostHog();

  const categoriesWithProducts =
    data?.filter(
      (category) =>
        productsData?.some((product) => product.category._id === category._id),
    ) ?? [];

  const toggleCategory = (category: Category) => {
    if (!setSelectedCategoryId) {
      return;
    }

    setSelectedCategoryId((prev) => {
      if (prev === category._id) {
        posthog.capture("deselect category", {
          categoryId: category._id,
          categoryName: category.name,
        });

        return undefined;
      }

      posthog.capture("select category", {
        categoryId: category._id,
        categoryName: category.name,
        prevCategoryId: prev,
      });
      return category._id;
    });
  };

  return (
    <div className="fixed top-0 w-full max-w-2xl border-b bg-background px-4 pb-2 pt-4">
      <Input
        id="search"
        className="text-md"
        aria-label="Search for a product"
        placeholder="Search for a product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex flex-row gap-2 pt-2">
        {categoriesWithProducts.map((category) => (
          <Button
            key={category._id}
            variant={
              selectedCategoryId === category._id ? "secondary" : "outline"
            }
            className={cn(
              selectedCategoryId === category._id && "bg-primary/50 outline",
            )}
            size={"sm"}
            onClick={() => toggleCategory(category)}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};
