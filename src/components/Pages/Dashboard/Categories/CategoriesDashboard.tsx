"use client"

import { useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import DataTable from "../DataTable"
import type { Category, CategoryFormData, PaginationData } from "@/types/types"
import { useGetAllCategories } from "@/hooks/useCategories"
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
import { useCreateCategory, useDeleteCategory, useUpdateCategory } from "@/hooks/Admin/useCaregoriesAdmin"
import CategoryDialog from "./CategoryDialog"
import DeleteCategoryDialog from "./DeleteCategoryDialog"
import { categoriesAdminApi } from "@/lib/apiClient"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

const CategoriesDashboard = () => {
    const { data: categories, isLoading } = useGetAllCategories()
    const [page, setPage] = useState(1)
    const [perPage] = useState(10)
    const [rowSelection, setRowSelection] = useState({})

    // Dialog states
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [isBulkDelete, setIsBulkDelete] = useState(false)

    const queryClient = useQueryClient();

    const { mutateAsync: createCategory, isPending: isCreatePending } = useCreateCategory()
    const { mutateAsync: updateCategory, isPending: isUpdatePending } = useUpdateCategory(selectedCategory ? selectedCategory.id : 0)
    const { mutateAsync: deleteCategory, isPending: isDeletePending } = useDeleteCategory(selectedCategory ? selectedCategory.id : 0)

    // Client-side pagination logic
    const totalCategories = categories?.length || 0;
    const totalPages = Math.ceil(totalCategories / perPage);

    // Ensure current page is valid
    const currentPage = Math.min(Math.max(1, page), Math.max(1, totalPages));

    const paginatedCategories = categories?.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    ) || [];

    const pagination: PaginationData = {
        total: totalCategories,
        perPage: perPage,
        page: currentPage,
        totalPages: totalPages
    };

    // Derived selected IDs (using indices from row selection to find IDs in current page ?? 
    // Data table row selection is usually based on index in the DATA array passed to it.
    // If we pass paginated data, the indices are 0 to perPage-1. We need to map them to actual IDs.
    // The DataTable component uses generic indices.
    // Wait, if we pass paginated data to DataTable, the row selection indices will be relative to that page.
    // For bulk actions across pages, we ideally need IDs as keys. 
    // But currently DataTable seems to use numeric index.
    // Let's rely on the IDs from the currently visible paginated data for the selection.
    // Actually, usually DataTable uses row objects.
    const selectedCategoryIds = paginatedCategories
        ? Object.keys(rowSelection).map(index => paginatedCategories[Number(index)]?.id).filter(id => id !== undefined)
        : [];

    const handleDeleteSelected = () => {
        if (!selectedCategoryIds.length) return;
        setIsBulkDelete(true);
        setDeleteDialogOpen(true);
    }

    const handleCreateSubmit = async (data: CategoryFormData) => {
        try {
            await createCategory(data)
            setCreateDialogOpen(false)
        } catch (error) {
            console.error("Failed to create category:", error)
        }
    }

    const handleUpdateSubmit = async (data: CategoryFormData) => {
        try {
            await updateCategory(data)
            setEditDialogOpen(false)
            setSelectedCategory(null)
        } catch (error) {
            console.error("Failed to update category:", error)
        }
    }

    const handleDeleteConfirm = async () => {
        try {
            if (isBulkDelete) {
                // Bulk delete logic - strictly calling delete for each ID
                const deletePromises = selectedCategoryIds.map(id =>
                    categoriesAdminApi.delete(id)
                );
                await Promise.all(deletePromises);

                toast.success(`Successfully deleted ${selectedCategoryIds.length} categories`);
                setRowSelection({}); // Clear selection
                queryClient.invalidateQueries({ queryKey: ["categories"] })
            } else {
                await deleteCategory()
            }
            setDeleteDialogOpen(false)
            setSelectedCategory(null)
            setIsBulkDelete(false)
        } catch (error) {
            console.error("Failed to delete category:", error)
            toast.error("Failed to delete category(s)")
        }
    }

    const openEditDialog = (category: Category) => {
        setSelectedCategory(category)
        setEditDialogOpen(true)
    }

    const openDeleteDialog = (category: Category) => {
        setIsBulkDelete(false)
        setSelectedCategory(category)
        setDeleteDialogOpen(true)
    }

    const columns: ColumnDef<Category>[] = [
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
            header: "Category Name",
            cell: ({ row }) => {
                const imageUrl = row.original.cat_image_url;
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
                            <span className="text-xs text-gray-500 truncate max-w-[200px]">{row.original.description}</span>
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
                const category = row.original;
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
                            <DropdownMenuItem onClick={() => openEditDialog(category)}>
                                <Edit2 className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(category)}>
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
        return <div className="p-8 text-center">Loading categories...</div>
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Categories Dashboard</h1>
                <div className="flex items-center gap-2">
                    {selectedCategoryIds.length > 0 && (
                        <Button onClick={handleDeleteSelected}>
                            Delete Selected ({selectedCategoryIds.length})
                        </Button>
                    )}
                    <Button variant={'auth'} onClick={() => setCreateDialogOpen(true)}>Add Category</Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={paginatedCategories}
                pagination={pagination}
                onPageChange={setPage}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
            />

            {/* Create Category Dialog */}
            <CategoryDialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
                onSubmit={handleCreateSubmit}
                isPending={isCreatePending}
            />

            {/* Edit Category Dialog */}
            {selectedCategory && (
                <CategoryDialog
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    category={selectedCategory}
                    onSubmit={handleUpdateSubmit}
                    isPending={isUpdatePending}
                />
            )}

            {/* Delete Category Dialog */}
            <DeleteCategoryDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                isPending={isDeletePending}
                count={isBulkDelete ? selectedCategoryIds.length : 1}
            />
        </div>
    )
}

export default CategoriesDashboard