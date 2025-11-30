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
  sort?: string;
  order?: string;
  onSortChange?: (sort: 'price' | 'rating' | 'created_at' | 'name', order: 'asc' | 'desc') => void;
}

const GlobalSort = ({ className, sort, order, onSortChange }: GlobalSortProps) => {
  const currentValue = sort === 'price' ? (order === 'asc' ? 'low-to-high' : 'high-to-low') : sort;

  return (
    <Select 
      value={currentValue} 
      onValueChange={(value) => {
        if (onSortChange) {
          if (value === 'low-to-high') onSortChange('price', 'asc');
          else if (value === 'high-to-low') onSortChange('price', 'desc');
          else if (value === 'created_at') onSortChange('created_at', 'desc');
          else if (value === 'rating') onSortChange('rating', 'desc');
        }
      }}
    >
      <SelectTrigger className={cn("border-0 text-black", className)}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="created_at">Newest</SelectItem>
          <SelectItem value="low-to-high">Price: Low to High</SelectItem>
          <SelectItem value="high-to-low">Price: High to Low</SelectItem>
          <SelectItem value="rating">Top Rated</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GlobalSort;
