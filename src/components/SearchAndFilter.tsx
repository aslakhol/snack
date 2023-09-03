import { Input } from "./ui/input";

type Props = {
  search: string;
  setSearch: (search: string) => void;
};

export const SearchAndFilter = ({ search, setSearch }: Props) => {
  return (
    <div className="fixed top-0 w-full max-w-2xl border-b bg-background p-4">
      <Input
        placeholder="Search for a product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
