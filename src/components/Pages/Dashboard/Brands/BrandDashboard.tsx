"use client"

import { useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import DataTable from "../DataTable"
import type { Brand, BrandFormData, PaginationData } from "@/types/types"
import { useGetAllBrands } from "@/hooks/useBrands"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit2, Trash2 } from "lucide-react"
import { useCreateBrand, useDeleteBrand, useUpdateBrand } from "@/hooks/Admin/useBrandsAdmin"
import BrandDialog from "./BrandDialog"
import DeleteBrandDialog from "./DeleteBrandDialog"
import { brandsAdminApi } from "@/lib/apiClient"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

const BrandDashboard = () => {
    const { data: brands, isLoading } = useGetAllBrands()
    const [page, setPage] = useState(1)
    const [perPage] = useState(10)
    const [rowSelection, setRowSelection] = useState({})

    // Dialog states
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
    const [isBulkDelete, setIsBulkDelete] = useState(false)

    const queryClient = useQueryClient();

    const { mutateAsync: createBrand, isPending: isCreatePending } = useCreateBrand()
    const { mutateAsync: updateBrand, isPending: isUpdatePending } = useUpdateBrand(selectedBrand ? selectedBrand.id : 0)
    const { mutateAsync: deleteBrand, isPending: isDeletePending } = useDeleteBrand(selectedBrand ? selectedBrand.id : 0)

    // Client-side pagination logic
    const totalBrands = brands?.length || 0;
    const totalPages = Math.ceil(totalBrands / perPage);

    // Ensure current page is valid
    const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

    const paginatedBrands = brands?.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    ) || [];

    const pagination: PaginationData = {
        total: totalBrands,
        perPage: perPage,
        page: currentPage,
        totalPages: totalPages
    };

    const selectedBrandIds = paginatedBrands
        ? Object.keys(rowSelection).map(index => paginatedBrands[Number(index)]?.id).filter(id => id !== undefined)
        : [];

    const handleDeleteSelected = () => {
        if (!selectedBrandIds.length) return;
        setIsBulkDelete(true);
        setDeleteDialogOpen(true);
    }

    const handleCreateSubmit = async (data: BrandFormData) => {
        try {
            await createBrand(data)
            setCreateDialogOpen(false)
        } catch (error) {
            console.error("Failed to create brand:", error)
        }
    }

    const handleUpdateSubmit = async (data: BrandFormData) => {
        try {
            await updateBrand(data)
            setEditDialogOpen(false)
            setSelectedBrand(null)
        } catch (error) {
            console.error("Failed to update brand:", error)
        }
    }

    const handleDeleteConfirm = async () => {
        try {
            if (isBulkDelete) {
                // Bulk delete logic - strictly calling delete for each ID
                const deletePromises = selectedBrandIds.map(id =>
                    brandsAdminApi.delete(id)
                );
                await Promise.all(deletePromises);

                toast.success(`Successfully deleted ${selectedBrandIds.length} brands`);
                setRowSelection({}); // Clear selection
                queryClient.invalidateQueries({ queryKey: ["brands"] })
            } else {
                await deleteBrand()
            }
            setDeleteDialogOpen(false)
            setSelectedBrand(null)
            setIsBulkDelete(false)
        } catch (error) {
            console.error("Failed to delete brand:", error)
            toast.error("Failed to delete brand(s)")
        }
    }

    const openEditDialog = (brand: Brand) => {
        setSelectedBrand(brand)
        setEditDialogOpen(true)
    }

    const openDeleteDialog = (brand: Brand) => {
        setIsBulkDelete(false)
        setSelectedBrand(brand)
        setDeleteDialogOpen(true)
    }

    const columns: ColumnDef<Brand>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
            accessorKey: "name",
            header: "Brand Name",
            cell: ({ row }) => {
                const imageUrl = row.original.logo_url;
                return (
                    <div className="flex items-center gap-4 min-w-[250px]">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={row.getValue("name")}
                                className="h-10 w-10 rounded-md object-cover border border-gray-100"
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                                No Img
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="font-medium text-gray-900">{row.getValue("name")}</span>
                        </div>
                    </div>
                )
            },
            size: 300,
        },
        {
            accessorKey: "product_count",
            header: () => <div className="text-center">Products</div>,
            cell: ({ row }) => <div className="text-center font-medium text-gray-700">{row.getValue("product_count")}</div>,
            size: 100,
        },
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ row }) => {
                const date = new Date(row.getValue("created_at"));
                return <div className="text-gray-500 whitespace-nowrap">{date.toLocaleDateString()}</div>
            },
            size: 150,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const brand = row.original;
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
                            <DropdownMenuItem onClick={() => openEditDialog(brand)}>
                                <Edit2 className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(brand)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
            size: 50,
        },
    ]

    if (isLoading) {
        return <div className="p-8 text-center">Loading brands...</div>
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Brands Dashboard</h1>
                <div className="flex items-center gap-2">
                    {selectedBrandIds.length > 0 && (
                        <Button onClick={handleDeleteSelected}>
                            Delete Selected ({selectedBrandIds.length})
                        </Button>
                    )}
                    <Button variant={'auth'} onClick={() => setCreateDialogOpen(true)}>Add Brand</Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={paginatedBrands}
                pagination={pagination}
                onPageChange={setPage}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
            />

            {/* Create Brand Dialog */}
            <BrandDialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
                onSubmit={handleCreateSubmit}
                isPending={isCreatePending}
            />

            {/* Edit Brand Dialog */}
            {selectedBrand && (
                <BrandDialog
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    brand={selectedBrand}
                    onSubmit={handleUpdateSubmit}
                    isPending={isUpdatePending}
                />
            )}

            {/* Delete Brand Dialog */}
            <DeleteBrandDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                isPending={isDeletePending}
                count={isBulkDelete ? selectedBrandIds.length : 1}
            />
        </div>
    )
}

export default BrandDashboard