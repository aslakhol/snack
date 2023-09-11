import Image from "next/image";

import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";
import { Product } from "../utils/zod";
import { useCartContext } from "../CartProvider";
import { api } from "../utils/api";

type Props = { products: Product[] };

export const Products = ({ products }: Props) => {
  const productsByCategory = groupProductByCategory(products);

  const { data: categories, isSuccess } = api.products.getCategories.useQuery();

  if (!isSuccess) {
    return;
  }

  return (
    <div className="flex w-full flex-col px-4 py-6">
      {categories.map((c) => (
        <div key={c._id} className="pb-8">
          <p className="text-sm text-muted-foreground">{c.name}</p>
          <div className="divide-y">
            {productsByCategory[c.name]?.map((p) => (
              <Product key={p._id} product={p} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

type ProductProps = { product: Product };

const Product = ({ product }: ProductProps) => {
  const { addProduct, removeProduct } = useCartContext();

  const add = () => {
    addProduct(product._id);
  };

  const remove = () => {
    removeProduct(product._id);
  };

  const minusClass = product.quantity <= 0 ? "invisible" : "";

  return (
    <div className="flex flex-row py-2">
      <div className="flex h-16 w-16 justify-center rounded border p-1">
        {product.image && (
          <Image
            className="object-contain"
            alt={product.name}
            src={`${product.image.asset.url}?h=384&w=384`}
            width={product.image.asset.metadata.dimensions.width}
            height={product.image.asset.metadata.dimensions.height}
            blurDataURL={product.image.asset.metadata.lqip}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between px-4">
        <h4 className="scroll-m-20 text-sm font-semibold tracking-tight">
          {product.name}
        </h4>
        <div className="flex flex-row items-center justify-between">
          <p className="text-md font-semibold">{product.price} kr</p>
          <div className="flex w-24 flex-row items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={remove}
              className={cn("h-8 w-8", minusClass)}
              aria-label={`Remove ${product.name} from cart`}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <p className={cn("text-sm font-semibold", minusClass)}>
              {product.quantity}
            </p>
            <Button
              variant="outline"
              size="icon"
              onClick={add}
              className="h-8 w-8"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const groupProductByCategory = (products: Product[]) => {
  const categories = products.reduce(
    (acc, product) => {
      const category = product.category.name;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category]?.push(product);

      return acc;
    },
    {} as Record<string, Product[]>,
  );

  return categories;
};
