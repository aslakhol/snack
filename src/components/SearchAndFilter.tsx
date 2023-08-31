import { useState } from "react";
import { Input } from "./ui/input";

export const SearchAndFilter = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full border-b p-4">
      <Input
        placeholder="Search for a product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
