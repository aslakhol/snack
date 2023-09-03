import { Input } from "./ui/input";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

export const SearchAndFilter = ({ search, setSearch }: Props) => {
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
