import { Button } from "./ui/button";

const FilterButtons = () => {
  return (
    <div className="flex flex-wrap gap-2 border-y border-neutral-100 p-4">
      <Button
        size="sm"
        variant="outline"
        className="h-max rounded-2xl border-2 bg-primary px-2 py-[2px] text-sm text-white"
      >
        All
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="h-max rounded-2xl border-2 px-2 py-[2px] text-sm text-gray-700"
      >
        Unread
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="h-max rounded-2xl border-2 px-2 py-[2px] text-sm text-gray-700"
      >
        Archived
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="h-max rounded-2xl border-2 px-2 py-[2px] text-sm text-gray-700"
      >
        Blocked
      </Button>
    </div>
  );
};

export default FilterButtons;
