"use client"

import { useState } from "react"
import { type ColumnDef } from "@tanstack/react-table"
import DataTable from "../DataTable"
import type { Product, productsFormData } from "@/types/types"
import { useGetProducts } from "@/hooks/useProducts"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit2, Trash2, Star } from "lucide-react"
import { useCreateProduct, useDeleteProduct, useUpdateProduct, useUploadProductImage } from "@/hooks/Admin/useProductsAdmin"
import ProductDialog from "./ProductDialog"
import DeleteProductDialog from "./DeleteProductDialog"
import { productsAdminApi } from "@/lib/apiClient"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"

const ProductsDashboard = () => {
    const [page, setPage] = useState(1)
    const [perPage] = useState(10)
    const [rowSelection, setRowSelection] = useState({})

    // State for dialogs
    const [createDialogOpen, setCreateDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isBulkDelete, setIsBulkDelete] = useState(false)

    const { data: productsData, isLoading } = useGetProducts({
        page,
        per_page: perPage
    })

    // Alias to keep existing code working if it used 'data'
    const data = productsData;

    const queryClient = useQueryClient();

    const { mutateAsync: createProduct, isPending: isCreatePending } = useCreateProduct()
    const { mutateAsync: updateProduct, isPending: isUpdatePending } = useUpdateProduct(selectedProduct ? Number(selectedProduct.id) : 0)
    const { mutateAsync: deleteProduct, isPending: isDeletePending } = useDeleteProduct(selectedProduct ? Number(selectedProduct.id) : 0)
    const { mutateAsync: uploadImages, isPending: isUploadPending } = useUploadProductImage(selectedProduct ? Number(selectedProduct.id) : 0)

    // Derived selected IDs
    const selectedProductIds = data?.products
        ? Object.keys(rowSelection).map(index => data.products[Number(index)]?.id).filter(id => id !== undefined)
        : [];

    const handleDeleteSelected = () => {
        if (!selectedProductIds.length) return;
        setIsBulkDelete(true);
        setDeleteDialogOpen(true);
    }

    const handleCreateSubmit = async (data: productsFormData) => {
        try {
            await createProduct(data)
            setCreateDialogOpen(false)
        } catch (error) {
            console.error("Failed to create product:", error)
        }
    }

    const handleUpdateSubmit = async (data: productsFormData) => {
        try {
            const newImages = data.additional_images?.filter((img): img is File => img instanceof File) || [];
            const updateData = { ...data };
            delete updateData.additional_images;

            await updateProduct(updateData);

            if (newImages.length > 0) {
                await uploadImages(newImages);
            }

            setEditDialogOpen(false)
            setSelectedProduct(null)
        } catch (error) {
            console.error("Failed to update product:", error)
        }
    }

    const handleDeleteConfirm = async () => {
        try {
            if (isBulkDelete) {
                const deletePromises = selectedProductIds.map(id =>
                    productsAdminApi.delete(Number(id))
                );
                await Promise.all(deletePromises);

                toast.success(`Successfully deleted ${selectedProductIds.length} products`);
                setRowSelection({}); // Clear selection
                queryClient.invalidateQueries({ queryKey: ["products"] })
            } else {
                await deleteProduct()
            }
            setDeleteDialogOpen(false)
            setSelectedProduct(null)
            setIsBulkDelete(false)
        } catch (error) {
            console.error("Failed to delete product:", error)
            toast.error("Failed to delete product(s)")
        }
    }

    const openEditDialog = (product: Product) => {
        setSelectedProduct(product)
        setEditDialogOpen(true)
    }

    const openDeleteDialog = (product: Product) => {
        setIsBulkDelete(false)
        setSelectedProduct(product)
        setDeleteDialogOpen(true)
    }

    const columns: ColumnDef<Product>[] = [
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
            header: "Product Name",
            cell: ({ row }) => {
                const imageUrl = row.original.main_image_url;
                return (
                    <div className="flex items-center gap-8 min-w-[400px]">
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
                        <span className="font-medium text-gray-900 truncate max-w-[350px]" title={row.getValue("name")}>{row.getValue("name")}</span>
                    </div>
                )
            },
            size: 500,
        },
        {
            accessorKey: "price",
            header: () => <div className="text-center">Price</div>,
            cell: ({ row }) => {
                const price = parseFloat(row.getValue("price"));
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(price);
                return <div className="font-medium min-w-[80px] text-center">{formatted}</div>;
            },
            size: 100,
        },
        {
            accessorKey: "category_name",
            header: () => <div className="text-center">Category</div>,
            cell: ({ row }) => <div className="text-gray-600 min-w-[120px] text-center">{row.getValue("category_name") || "N/A"}</div>,
            size: 150,
        },
        {
            accessorKey: "stock",
            header: () => <div className="text-center">Stock</div>,
            cell: ({ row }) => <div className="text-gray-600 min-w-[60px] text-center">{row.getValue("stock")}</div>,
            size: 80,
        },
        {
            accessorKey: "id", // Using ID as SKU for now
            header: () => <div className="text-center">SKU</div>,
            cell: ({ row }) => <div className="text-gray-500 text-sm min-w-[80px] text-center">#{row.getValue("id")}</div>,
            size: 100,
        },
        {
            accessorKey: "rating",
            header: () => <div className="text-center">Rating</div>,
            cell: ({ row }) => {
                const rating = row.getValue("rating") as string | number;
                return (
                    <div className="flex items-center justify-center gap-1 text-orange-500 min-w-[80px]">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-gray-700 font-medium">{rating || "0.0"}</span>
                    </div>
                );
            },
            size: 100,
        },
        {
            accessorKey: "status",
            header: () => <div className="text-center">Status</div>,
            cell: ({ row }) => {
                const isAvailable = row.original.is_available === "1";
                const stock = row.original.stock || 0;
                let status = "Active";
                let variant: "default" | "secondary" | "destructive" | "outline" = "default";
                let className = "bg-green-100 text-green-700 hover:bg-green-100 border-none whitespace-nowrap";

                if (stock === 0) {
                    status = "Out Of Stock";
                    variant = "outline";
                    className = "text-orange-600 border-orange-200 bg-orange-50 hover:bg-orange-50 whitespace-nowrap";
                } else if (!isAvailable) {
                    status = "Inactive";
                    variant = "secondary";
                    className = "bg-gray-100 text-gray-600 hover:bg-gray-100 whitespace-nowrap";
                }

                return (
                    <div className="flex justify-center">
                        <Badge variant={variant} className={className}>
                            {status}
                        </Badge>
                    </div>
                );
            },
            size: 120,
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const product = row.original;
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
                            <DropdownMenuItem onClick={() => openEditDialog(product)}>
                                <Edit2 className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(product)}>
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
        return <div className="p-8 text-center">Loading products...</div>
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Products Dashboard</h1>
                <div className="flex items-center gap-2">
                    {selectedProductIds.length > 0 && (
                        <Button onClick={handleDeleteSelected}>
                            Delete Selected ({selectedProductIds.length})
                        </Button>
                    )}
                    <Button variant={'auth'} onClick={() => setCreateDialogOpen(true)}>Add Product</Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={data?.products || []}
                pagination={data?.pagination}
                onPageChange={setPage}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
            />

            {/* Create Product Dialog */}
            <ProductDialog
                open={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
                onSubmit={handleCreateSubmit}
                isPending={isCreatePending}
            />

            {/* Edit Product Dialog */}
            {selectedProduct && (
                <ProductDialog
                    open={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    product={selectedProduct}
                    onSubmit={handleUpdateSubmit}
                    isPending={isUpdatePending || isUploadPending}
                />
            )}

            {/* Delete Product Dialog */}
            <DeleteProductDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                isPending={isDeletePending}
                count={isBulkDelete ? selectedProductIds.length : 1}
            />
        </div>
    )
}

export default ProductsDashboard