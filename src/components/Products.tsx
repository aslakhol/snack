import Image from "next/image";
import { Product } from "../pages";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type Props = { products: Product[] };

export const Products = ({ products }: Props) => {
  return (
    <div className="flex w-full flex-col divide-y p-8">
      {products.map((p) => (
        <Product key={p.key} product={p} />
      ))}
    </div>
  );
};

type ProductProps = { product: Product };

const Product = ({ product }: ProductProps) => {
  const [amountInCart, setAmountInCart] = useState(0);

  const minusClass = amountInCart <= 0 ? "invisible" : "";

  return (
    <div className="flex flex-row py-4">
      <div className="flex h-24 w-24 justify-center rounded border p-4">
        <Image
          alt={product.name}
          src={product.imageHref}
          width={96}
          height={96}
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <h4 className="text-md scroll-m-20 font-semibold tracking-tight">
          {product.name}
        </h4>
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg font-semibold">{product.price} kr</p>
          <div className="flex w-32 flex-row items-center justify-between gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAmountInCart((prev) => prev - 1)}
              className={minusClass}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <p className={cn("text-lg", minusClass)}>{amountInCart}</p>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAmountInCart((prev) => prev + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
