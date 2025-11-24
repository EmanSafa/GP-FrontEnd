import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface GlobalSortProps {
  className?: string;
}

const GlobalSort = ({ className }: GlobalSortProps) => {
  return (
    <Select>
      <SelectTrigger className={cn("border-0 text-black", className)}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="low-to-high">Price low to high</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GlobalSort;
