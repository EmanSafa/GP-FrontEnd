import { type ColumnDef } from '@tanstack/react-table';
import type { PromoCode } from '@/types/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit2, Trash2, Gift } from 'lucide-react';

interface ColumnsProps {
  onEdit: (promo: PromoCode) => void;
  onDelete: (promo: PromoCode) => void;
}

export const getColumns = ({ onEdit, onDelete }: ColumnsProps): ColumnDef<PromoCode>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: 'code',
    header: 'Promo Code',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 min-w-[150px]">
          <div className="h-9 w-9 rounded-md bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Gift className="h-5 w-5" />
          </div>
          <span className="font-bold tracking-wider text-gray-900 dark:text-gray-100">
            {row.getValue('code')}
          </span>
        </div>
      );
    },
    size: 180,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return (
        <div className="text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
          {row.getValue('description') || '-'}
        </div>
      );
    },
    size: 200,
  },
  {
    id: 'discount',
    header: 'Discount',
    cell: ({ row }) => {
      const type = row.original.discount_type;
      const value = Number(row.original.discount_value);
      return (
        <div className="font-semibold text-emerald-600 dark:text-emerald-400">
          {type === 'percentage' ? `${value}%` : `$${value.toFixed(2)}`}
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: 'min_order_amount',
    header: 'Min Spend',
    cell: ({ row }) => {
      const amount = Number(row.getValue('min_order_amount') || 0);
      return (
        <div className="text-gray-700 dark:text-gray-300 font-medium">${amount.toFixed(2)}</div>
      );
    },
    size: 120,
  },
  {
    id: 'usage',
    header: 'Usage (Used / Limit)',
    cell: ({ row }) => {
      const used = row.original.times_used;
      const limit = row.original.usage_limit_total;
      return (
        <div className="text-gray-600 dark:text-gray-400">
          {used} / {limit !== null ? limit : '∞'}
        </div>
      );
    },
    size: 150,
  },
  {
    accessorKey: 'expires_at',
    header: 'Expires At',
    cell: ({ row }) => {
      const expiresAt = row.original.expires_at;
      if (!expiresAt) return <span className="text-gray-400">Never</span>;
      const date = new Date(expiresAt);
      const isExpired = date.getTime() < Date.now();
      return (
        <span
          className={
            isExpired
              ? 'text-red-500 font-medium whitespace-nowrap'
              : 'text-gray-500 whitespace-nowrap'
          }
        >
          {date.toLocaleDateString()} {isExpired && '(Expired)'}
        </span>
      );
    },
    size: 150,
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    cell: ({ row }) => {
      const isActive = row.getValue('is_active');
      const expiresAt = row.original.expires_at;
      const isExpired = expiresAt ? new Date(expiresAt).getTime() < Date.now() : false;

      if (!isActive) {
        return (
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            Inactive
          </Badge>
        );
      }
      if (isExpired) {
        return <Badge variant="destructive">Expired</Badge>;
      }
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>;
    },
    size: 100,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const promo = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(promo)}>
              <Edit2 className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => onDelete(promo)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 50,
  },
];
