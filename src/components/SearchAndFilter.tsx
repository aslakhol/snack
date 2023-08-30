import { useState } from "react";
import { Input } from "./ui/input";

type Props = {};

export const SearchAndFilter = ({}: Props) => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full border border-b-slate-500 p-4">
      <Input
        placeholder="Search for a product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
