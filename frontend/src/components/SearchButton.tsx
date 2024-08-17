import { Search } from "lucide-react";

const SearchButton = () => {
  return (
    <div className="h-[70px] px-4 py-3">
      <div className="flex h-full items-center rounded-md border-2 border-gray-300 bg-neutral-100 px-4 py-2">
        <Search className="h-5 w-5 text-gray-500" />
        <input
          placeholder="Search"
          className="w-full bg-inherit p-2 text-lg leading-none placeholder:text-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SearchButton;
